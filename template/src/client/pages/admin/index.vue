<template>
  <v-container>
    <!--<v-layout>
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3 lg6 offset-lg6 >
        <v-card class="grey lighten-4 elevation-3">
          <v-container>
            <h3 align="center">Admin</h3>
            <form v-on:keyup.enter="submit">
              <v-text-field
                required
                name="username"
                label="username"
                v-model="username"
                />
              <v-text-field
                required
                name="password"
                label="password"
                v-model="password"
                />
              <v-btn @click.native="submit">Submit</v-btn>
            </form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>-->
    <h3 v-if="$store.state.user.admin">welcome to the admin.</h3>
  </v-container>
</template>

<script>
export default {
}
</script>

<style>

</style>
