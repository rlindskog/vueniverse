<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs12 sm10 md8 lg6 xl6>
        <h4>Are you sure you would like to sign out?</h4>
        <sign-out-form :redirect="redirect"></sign-out-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import signOutForm from '~/components/auth/sign-out-form.vue'
export default {
  data() {
    return {
      redirect: { name: 'index' }
    }
  },
  components: { signOutForm }
}
</script>
