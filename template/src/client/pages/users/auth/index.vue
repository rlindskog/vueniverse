<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3 xl6 offset-xl6 >
        <h3>Authentication</h3>
        <sign-in-form/>
        <sign-up-form/>
        <sign-out-form/>          
      </v-flex>
    </v-layout>
  </v-container>
  </v-container>
</template>

<script>
import signInForm from '~/components/auth/sign-in-form.vue'
import signUpForm from '~/components/auth/sign-up-form.vue'
import signOutForm from '~/components/auth/sign-out-form.vue'
export default {
  components: { signInForm, signUpForm, signOutForm }
}
</script>
