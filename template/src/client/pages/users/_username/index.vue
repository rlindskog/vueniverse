{{{{raw}}}}
<template>
  <v-container>
    <h1>{{ this.fetchedUser.username }}</h1>
    <h5>{{ this.fetchedUser.firstName }} {{ this.fetchedUser.lastName }} </h5>
    <h5>{{ this.fetchedUser.email }}</h5>
  </v-container>
</template>
{{{{/raw}}}}

<script>
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      fetchedUser: this.$store.state.fetchedUser
    }
  },
  fetch ({ store, params, req }) {
    let username = params.username
    let token = process.SERVER_BUILD ? req.cookies.token : Cookies.get('token')
    return store.dispatch('fetchedUser/fetchUser', { username })
  }
}
</script>
