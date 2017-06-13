<template>
  <v-card class="grey lighten-4 elevation-3">
    <v-container fluid>
      <form v-on:keyup.enter="submit">
        <v-text-field
          @keyup.native="checkUsername"
          v-model="username"
          label="Username"
          name="username"
          required
          hint="At least 5 characters."
          :rules="[usernameExists]"
          min="5"
          counter
        ></v-text-field>
        <v-text-field
          @keyup.native="checkEmail"
          :rules="[emailExists]"
          v-model="email"
          label="Email"
          name="email"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          v-model="firstName"
          label="First Name"
          name="firstName"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          label="Last Name"
          name="lastName"
        ></v-text-field>
        <v-text-field
          v-model="password1"
          name="password1"
          label="Password"
          hint="At least 8 characters. Mix it up!"
          counter
          min="8"
          append-icon="visibility_off"
          :type="pw1 ? 'password' : 'text'"
          required
        ></v-text-field>
        <v-text-field
          v-model="password2"
          name="password2"
          label="Retype Password"
          hint="Type the exact same thing as last time."
          :append-icon="pw2 ? 'visibility_off' : 'visibility'"
          :append-icon-cb="() => (pw2 = !pw2)"
          :type="pw2 ? 'password' : 'text'"
          :rules="[passwordsMatch]"
          required
        ></v-text-field>
        <v-btn @click.native="submit">Submit</v-btn>
      </form>
    </v-container>
  </v-card>
</template>

<script>
import axios from '~plugins/axios'
let usernameTimeout = null
let emailTimeout = null

export default {
  data () {
    return {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password1: '',
      password2: '',
      pw1: true,
      pw2: true,
      usernameExistsData: false,
      emailExistsData: false,
    }
  },
  computed: {
    passwordsMatch() {
      return this.password1 === this.password2 ? '' : 'Passwords don\'t match'
    },
    usernameExists() {
      return this.usernameExistsData ? 'Username already exists.' : ''
    },
    emailExists() {
      return this.emailExistsData ? 'User with that email already exists.' : ''
    }
  },
  methods: {
    checkUsername (e) {
      clearTimeout(usernameTimeout)
      usernameTimeout = setTimeout(() => {
        let username = e.target.value
        axios.get(`/users/check`, {
          params: {
            check: 'username',
            data: username
          }
        }).then(data => {
          console.log(data)
          this.usernameExistsData = data.data.exists
        }).catch(error => {
          console.error(error)
        })
      }, 500)
    },
    checkEmail (e) {
      clearTimeout(emailTimeout)
      emailTimeout = setTimeout(() => {
        let email = e.target.value
        axios.get(`/users/check`, {
          params: {
            check: 'email',
            data: email
          }
        }).then(data => {
          console.log(data)
          this.emailExistsData = data.data.exists
        }).catch(error => {
          console.error(error)
        })
      }, 500)
    },
    submit () {
      console.log('submitting')
      this.$store.dispatch('user/signUp', {
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password1: this.password1,
        password2: this.password2
      })
      this.email = ''
      this.username = ''
      this.firstName = ''
      this.lastName = ''
      this.password1 = ''
      this.password2 = ''
    }
  }
}
</script>

<style>

</style>
