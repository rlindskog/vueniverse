{{{{raw}}}}
<template>
  <v-layout justify-center column class="width400">
    <v-subheader>Users</v-subheader>
    <v-expansion-panel>
      <v-expansion-panel-content v-for="user in $store.state.lists.users" :key="user.username" hide-actions>
        <v-layout align-center row spacer slot="header">
          <v-flex xs4 sm2 class="ellipsis">
            <v-avatar size="48px" slot="activator">
              <img v-bind:src="getAvatar(user.username)" alt="">
            </v-avatar>
          </v-flex>
          <v-flex>
            <strong>{{ user.username }}</strong>
          </v-flex>
        </v-layout>
        <v-card>
          <v-divider></v-divider>
          <v-card-text>
            {{ user.firstName }}
            <v-btn router 
              :to="{ name: 'users-username', params: { username: user.username } }">view profile</v-btn>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>
{{{{/raw}}}}

<script>
import getAvatar from '~/plugins/getAvatar'

export default {
  middleware: 'authenticated',
  fetch ({ store }) {
    if (store.state.user.isAuthenticated) {
      return store.dispatch('fetchAllUsers')
    }
  },
  methods: {
    getAvatar (seed) {
      return getAvatar(seed)
    }
  }
}
</script>
