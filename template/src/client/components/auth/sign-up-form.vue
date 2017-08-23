<template>
  <v-card class="grey lighten-4 elevation-3">
    <v-container fluid>
      <form @keyup.enter="submit">
        <v-text-field
          @keyup.native="checkUsername"
          v-model="username"
          label="Username"
          name="username"
          required
          hint="At least 5 characters."
          :rules="[usernameExists]"
          min="5"
          :counter="this.username.length > 0 ? true : false"
        ></v-text-field>
        <v-text-field
          @keyup.native="checkEmail"
          :rules="[isEmail, emailExists]"
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
          :counter="this.password1.length > 0 ? true : false"
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
import axios from '~/plugins/axios'
import isEmail from 'validator/lib/isEmail'
let usernameTimeout = null
let emailTimeout = null

export default {
  props: ['redirect'],
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
    },
    isEmail() {
      return !isEmail(this.email) && this.email.length ? 'Must be a valid email' : ''
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
          this.emailExistsData = data.data.exists
        }).catch(error => {
          console.error(error)
        })
      }, 500)
    },
    submit () {
      this.$store.dispatch('user/signUp', {
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password1: this.password1,
        password2: this.password2
      }).then(() => {
        if (this.$store.state.notification.success) this.$router.replace(this.redirect)
      })
    }
  }
}
</script>
