{{{{raw}}}}
<template>
  <v-container>
    <v-layout row wrap class="width400 grey lighten-3">
      <v-flex xs12>
        <v-card>
          <v-container fluid grid-list-lg>
            <v-layout row>
              <v-flex xs5>
                <v-card-media
                  v-bind:src="getAvatar(fetchedUser.username, 'large')"
                  height="125px"
                  contain
                ></v-card-media>
              </v-flex>
              <v-flex xs7>
                <div>
                  <div class="headline">{{ fetchedUser.username }}</div>
                  <div>{{ fetchedUser.firstName }} {{ fetchedUser.lastName }}</div>
                  <div>{{ fetchedUser.email }}</div>
                </div>
              </v-flex>
            </v-layout>
            <v-layout>
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
                    <v-btn color="green darken-1" flat="flat" @click="dialog = false">No</v-btn>
                    <v-btn color="red darken-1" flat="flat" @click="deleteUser">Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
{{{{/raw}}}}

<script>
import Cookies from 'js-cookie'
import getAvatar from '~/plugins/getAvatar'

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
    return store.dispatch('fetchedUser/fetchUser', { username })
  },
  methods: {
    getAvatar (seed) {
      return getAvatar(seed)
    },
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
