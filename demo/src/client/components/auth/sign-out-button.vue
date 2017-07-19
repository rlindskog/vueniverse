<template>
  <v-dialog v-model="signOutDialog">
    <v-btn
      error
      dark
      slot="activator">
      <slot>Sign Out</slot>
    </v-btn>
    <v-card>
      <v-card-title><slot name="title">Are you sure you want to sign out?</slot></v-card-title>
      <v-card-text><slot name="text">We'll miss you.</slot></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="error--text darken-1" flat="flat" @click.native="signOutDialog = false">No</v-btn>
        <v-btn class="success--text darken-1" flat="flat" @click.native="signOut">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [ 'redirect' ],
  data() {
    return {
      signOutDialog: false
    }
  },
  methods: {
    signOut () {
      this.signOutDialog = false
      this.$store.dispatch('user/signOut').then(() => {
        if (this.$store.state.notification.success) this.$router.replace(this.redirect)
      })
    }
  }
}
</script>
