<template>
  <v-container>
    <h1>{{ this.fetchedUser.username }}</h1>
    <h5>{{ this.fetchedUser.firstName }} {{ this.fetchedUser.lastName }} </h5>
    <h5>{{ this.fetchedUser.email }}</h5>
    <v-dialog
      v-model="dialog"
      v-if="$store.state.fetchedUser.username === $store.state.user.username"
      max-width="290">
      <v-btn
        color="red darken-1"
        dark
        slot="activator"
        v-if="$store.state.fetchedUser.username === $store.state.user.username"
        >Delete Profile</v-btn>
      <v-card>
        <v-card-title>Are you sure you want to delete your profile?</v-card-title>
        <v-card-text>You can't go back.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">No</v-btn>
          <v-btn color="red darken-1" flat="flat" @click.native="deleteUser">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  middleware: 'authenticated',
  data () {
    return {
      fetchedUser: this.$store.state.fetchedUser,
      dialog: false
    }
  },
  fetch ({ store, params, req }) {
    const username = params.username
    const token = process.SERVER_BUILD ? req.cookies.token : Cookies.get('token')
    return store.dispatch('fetchedUser/fetchUser', { username, token })
  },
  methods: {
    deleteUser () {
      this.dialog = false
      this.$store.dispatch('user/deleteUser')
        .then(() => {
          this.$router.replace({ path: '/' })
        })
    }
  }
}
</script>
