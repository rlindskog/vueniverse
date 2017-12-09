<template>
  <div>
    <h3>{{ user.username }}</h3>
    <v-btn @click.native="revokeToken">Revoke</v-btn>
    <v-btn @click.native="deleteUser">Delete</v-btn>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import qs from 'qs'

export default {
  layout: 'admin',
  middleware: 'admin',
  data() {
    return {
      user: {}
    }
  },
  async asyncData({ params, redirect }) {
    try {
      let { data } = await axios.get(`admin/users/${params.username}`)
      if (!data) {
        redirect('/admin/users')
      } else {
        return {
          user: data
        }
      }
    } catch (error) {
      redirect('/admin/users')
    }
  },
  methods: {
    async revokeToken () {
      try {
        let query = qs.stringify({ username: this.$route.params.username })
        let { data } = await axios.post(`/admin/users/revoke?${query}`)
        this.$store.commit('notification/SUCCESS', data, { root: true })
      } catch (error) {
        this.$store.commit('notification/FAILURE', error.response.data, { root: true })
      }
    },
    async deleteUser () {
      try {
        let username = this.$route.params.username
        let { data } = await axios.delete(`/admin/users/${username}`)
        this.$store.commit('notification/SUCCESS', data, { root: true })
        if (this.$store.state.notifcation.success) this.$router.replace({ path: '/admin/users' })
      } catch (error) {
        this.$store.commit('notification/FAILURE', error.response.data, { root: true })
      }
    }
  }
}
</script>

<style>
  
</style>
