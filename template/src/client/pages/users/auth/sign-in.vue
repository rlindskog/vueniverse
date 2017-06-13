<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3 lg6 offset-lg6 >
        <h3>Sign In</h3>
        <sign-in-form :redirect="redirect"/>
        <br>
        <p>Don't have an account? <nuxt-link :to="{ name: 'users-auth-sign-up' }">Sign up!</nuxt-link></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import signInForm from '~components/auth/sign-in-form.vue'
export default {
  components: { signInForm },
  data() {
    return {
      redirect: { name: 'index' }
      // redirect: { name: 'users-username', params: { username: this.$store.state.user.username } }
    }
  }
}
</script>
