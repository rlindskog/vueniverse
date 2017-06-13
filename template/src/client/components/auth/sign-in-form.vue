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
      <p class="error--text">{{ errorMessage }}</p>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: [ 'redirect' ],
  data () {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('user/signIn', {
        username: this.username,
        password: this.password,
      }).then(() => {
        if (this.$store.state.user.signInSuccess) {
          this.$router.replace(this.redirect)
        } else {
          this.errorMessage = 'Incorrect username or password'        
        }
      })
    }
  }
}
</script>
