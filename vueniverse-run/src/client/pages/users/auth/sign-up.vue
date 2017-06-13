<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3 lg6 offset-lg6 >
        <h3>Sign Up</h3>
        <sign-up-form/>
        <br>
        <p>Already have an account? <nuxt-link :to="{ name: 'users-auth-sign-in' }">Sign in!</nuxt-link></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import signUpForm from '~components/auth/sign-up-form.vue'
export default {
  components: { signUpForm }
}
</script>

<style>

</style>
