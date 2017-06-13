<template>
  <div>
  <v-container v-if="$store.state.user.isAuthenticated">
    <h1>Home</h1>
    <nuxt-link :to="{ name: 'users-username', params: { username: this.$store.state.user.username } }">
      {{ $store.state.user.username }}, view your profile.
    </nuxt-link>
  </v-container>
  <v-container v-else>
    <h1>Welcome to Vueniverse!</h1>
    <nuxt-link :to="{ name: 'users-auth-sign-in' }">Sign-in!</nuxt-link>
  </v-container>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
