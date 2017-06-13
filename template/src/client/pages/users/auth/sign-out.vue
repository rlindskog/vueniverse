<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3 lg6 offset-lg6 >
        <h4>Are you sure you would like to sign out?</h4>
        <sign-out-form :redirect="redirect"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import signOutForm from '~components/auth/sign-out-form.vue'
export default {
  data() {
    return {
      redirect: { name: 'index' }
    }
  },
  components: { signOutForm }
}
</script>

<style>

</style>
