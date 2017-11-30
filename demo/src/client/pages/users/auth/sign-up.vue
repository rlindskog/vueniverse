<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <h3>Sign Up</h3>
        <sign-up-form :redirect="{ name: 'users-auth-sign-in' }"/>
        <br>
        <p>Already have an account? <nuxt-link :to="{ name: 'users-auth-sign-in' }">Sign in!</nuxt-link></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import signUpForm from '~/components/auth/sign-up-form.vue'
export default {
  components: { signUpForm }
}
</script>
