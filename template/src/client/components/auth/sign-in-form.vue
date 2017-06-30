<template>
  <v-card class="grey lighten-4 elevation-3">
    <v-container fluid>
      <form @keyup.enter="submit">
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
      password: '',
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('user/signIn', {
        username: this.username,
        password: this.password,
      }).then(() => {
        if (this.$store.state.notification.success) this.$router.replace(this.redirect)
        else {
          this.username = ''
          this.password = ''
        }
      })
    }
  }
}
</script>
