<template>
  <v-container>
    <h3>Users</h3>
    <div>
      <div v-for="user in $store.state.lists.users">
        <hr>
        <p>Username: {{ user.username }}</p>
        <p v-if="user.firstName">Name: {{ user.firstName }}</p>
      </div>
      <hr>
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  fetch ({ store }) {
    if (store.state.user.isAuthenticated) {
      return store.dispatch('fetchAllUsers')
    }
  }
}
</script>
