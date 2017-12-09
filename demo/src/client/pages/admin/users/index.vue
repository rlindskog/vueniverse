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
      v-model="selected"
      item-key="username"
      select-all
      :headers="headers"
      :items="users"
      :search="search"
      :total-items="totalUsers"
      :pagination.sync="pagination"
      :loading="loading"
      class="elevation-3"
    >
      <template slot="headerCell" scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" scope="props">
        <td><v-checkbox primary hide-details v-model="props.selected"></v-checkbox></td>
        <!-- <td><nuxt-link class="tabel-link" :to="`users/${props.item.username}`">{{ props.item.username }}</nuxt-link></td> -->
        <td class="text-xs-right" v-for="header in headers">
          <item-edit-dialog
            :itemName="header.value"
            v-if="header.editable !== false"
            :item="props.item"
            type="string"
            :editable="header.editable"
            :endpoint="`/admin/users/${props.item.username}`">
          </item-edit-dialog>
          <nuxt-link v-else-if="header.link" :to="`/admin/users/${props.item.username}`" class="link">{{ props.item[header.value] }}</nuxt-link>
          <span v-else>{{ props.item[header.value] }}</span>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from '~/plugins/axios'
import qs from 'qs'
import itemEditDialog from '~/components/admin/item-edit-dialog.vue'

export default {
  layout: 'admin',
  middleware: 'admin',
  components: { itemEditDialog },
  data () {
    return {
      search: '',
      totalUsers: 0,
      users: [],
      loading: true,
      pagination: {},
      selected: [],
      headers: [
        { text: 'Username', value: 'username', editable: false, link: true },
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'Email Address', value: 'email' },
        { text: 'Role', value: 'role' },
        { text: 'Created At', value: 'createdAt', editable: false },
        { text: 'Updated At', value: 'updatedAt', editable: false }
      ]
    }
  },
  watch: {
    pagination: {
      handler () {
        this.getUsers().then(({ users, total }) => {
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
    async getUsers () {
      this.loading = true
      // use these as query parameters in the AJAX request!
      const { sortBy, descending, page, rowsPerPage } = this.pagination
      let query = qs.stringify({ sortBy, descending, page, rowsPerPage })
      let { data } = await axios.get(`/admin/users?${query}`)
      let users = data.items
      let total = data.total

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
.link {
  color: rgba(0,0,0,.91);
  /* text-decoration: none; */
}
</style>