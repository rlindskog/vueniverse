<template>
  <v-card class="grey lighten-4 elevation-3">
    <v-container fluid>
      <form @submit.native.prevent="submit">
        <v-text-field
          v-model="username"
          name="username"
          label="username"
        ></v-text-field>
        <v-text-field
          v-model="password"
          name="password"
          label="password"
          type="password"
        ></v-text-field>
        <v-btn @click.native="submit">Submit</v-btn>
      </form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: [ 'redirect' ],
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // async submit () {
    //   await this.$store.dispatch('user/signIn', {
    //     username: this.username,
    //     password: this.password,
    //   })
    //   if (this.$store.state.user.isAuthenticated) {
    //     console.log(this.$store.state.user.username)
    //     this.$router.replace(this.redirect)
    //     this.username = ''
    //     this.password = ''
    //   } else {
    //     console.log('Oops, something went wrong.')
    //   }
    // }
    submit () {
      this.$store.dispatch('user/signIn', {
        username: this.username,
        password: this.password,
      }).then(() => this.$router.replace(this.redirect))
      // if (this.$store.state.user.isAuthenticated) {
      //   console.log(this.$store.state.user.username)
      //   this.$router.replace(this.redirect)
      //   this.username = ''
      //   this.password = ''
      // } else {
      //   console.log('Oops, something went wrong.')
      // }
    }
  }
}
</script>

<style>

</style>
