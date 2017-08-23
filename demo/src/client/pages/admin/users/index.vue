<template>
  <v-card>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
        <!-- not implemented yet... -->
        <!-- <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field> -->
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      :total-items="totalUsers"
      :pagination.sync="pagination"
      :loading="loading"
      class="elevation-3"
    >
      <template slot="headerCell" scope="props">
        <span v-tooltip:bottom="{ 'html': props.header.text }">
          {{ props.header.text }}
        </span>
      </template>
      <template slot="items" scope="props">
        <td><nuxt-link class="tabel-link" :to="`/admin/users/${props.item.username}`">{{ props.item.username }}</nuxt-link></td>
        <td  class="text-xs-right">{{ props.item.firstName }}</td>
        <td  class="text-xs-right">{{ props.item.lastName }}</td>
        <td  class="text-xs-right">{{ props.item.email }}</td>
        <td  class="text-xs-right">{{ props.item.createdAt }}</td>
        <td  class="text-xs-right">{{ props.item.updatedAt }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from '~plugins/axios'
import qs from 'qs'

export default {
  layout: 'admin',
  data () {
    return {
      search: '',
      totalUsers: 0,
      users: [],
      loading: true,
      pagination: {},
      headers: [
        { text: 'Username', value: 'username' },
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Email Address', value: 'email' },
        { text: 'Created At', value: 'createdAt' },
        { text: 'Updated At', value: 'updatedAt' }
      ]
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getUsers().then(({ users, total }) => {
          // console.log('USERS', users)
          this.users = users
          this.totalUsers = total
        })
      },
      deep: true
    }
  },
  mounted () {
    this.getUsers().then(({ users, total }) => {
      this.users = users
      this.totalUsers = total
    })
  },
  methods: {
    // filter(val, search) {
    //   ['defined', 'boolean'].indexOf(typeof val) === -1 && val.toString().toLowerCase().indexOf(search) !== -1
    // },
    async getUsers () {
      this.loading = true
      // use these as query parameters in the AJAX request!
      const { sortBy, descending, page, rowsPerPage } = this.pagination
      let query = qs.stringify({ sortBy, descending, page, rowsPerPage })
      // let query = `?sortBy=${sortBy}&descending=${descending}&page=${page}&rowsPerPage=${rowsPerPage}`
      let { data } = await axios.get(`/admin/users?${query}`)
      let users = data.users
      let total = data.total
      // SOMETHING GOING WRONG HERE, PAGINATION FUCKING WITH THE USERS DOG.
      if (this.pagination.sortBy) {
        users = users.sort((a, b) => {
          const sortA = a[sortBy]
          const sortB = b[sortBy]
          if (descending) {
            if (sortA < sortB) return 1
            if (sortA > sortB) return -1
            return 0
          } else {
            if (sortA < sortB) return -1
            if (sortA > sortB) return 1
            return 0
          }
        })
      }
      // NOT NECESSARY WHEN WE PAGINATE ON THE SERVER
      // if (rowsPerPage > 0) {
      //   users = users.slice((page - 1) * rowsPerPage, page * rowsPerPage)
      //   console.log(users)
      // }
      this.loading = false
      return { users, total }
    }
  }
}
</script>

<style scoped>
.tabel-link {
  color: black;
  text-decoration: none;
}
</style>