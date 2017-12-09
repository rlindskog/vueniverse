<template>
  <v-container>
    <div>
      <h1>Welcome to the admin</h1>
      <nuxt-link to="/admin/users">Users Admin Panel.</nuxt-link>
    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin'
}
</script>

<style>

</style>
