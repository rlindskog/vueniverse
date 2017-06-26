{{{{raw}}}}
<template>
  <v-container>
    <h3>Users</h3>
    <div>
      <div v-for="user in $store.state.lists.users">
        <hr>
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
      <hr>
    </div>
  </v-container>
</template>
{{{{/raw}}}}

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
