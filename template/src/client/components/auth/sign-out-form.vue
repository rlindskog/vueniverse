<template>
  <v-btn @click.native="signOut">Sign Out</v-btn>
</template>

<script>
export default {
  props: [ 'redirect' ],
  methods: {
    signOut () {
      this.$store.dispatch('user/signOut').then(() => {
        if (this.$store.state.notification.success) this.$router.replace(this.redirect)
      })
    }
  }
}
</script>
