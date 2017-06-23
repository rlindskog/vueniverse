{{{{raw}}}}
<template>
  <v-container>
    <h3>Users</h3>
    <div v-if="$store.state.user.isAuthenticated">
      <div v-for="user in $store.state.lists.users">
        <hr>
        <p>Username: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
      <hr>
    </div>
    <div v-else>
      <h3>Must be authenticated to view all users.</h3>
      <v-btn router :to="{ name: 'users-auth-sign-in' }">Sign in</v-btn>
    </div>
  </v-container>
</template>
{{{{/raw}}}}

<script>
export default {
  fetch ({ store }) {
    if (store.state.user.isAuthenticated) {
      return store.dispatch('fetchAllUsers')
    }
  }
}
</script>
