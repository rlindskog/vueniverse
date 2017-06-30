{{{{raw}}}}
<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1 md6 offset-md3 xl6 offset-xl6 >
        <v-container v-if="$store.state.user.isAuthenticated">
          <h3 class="text-xs-center">Vueniverse<v-btn class="xs-center" router :to="{ name: 'users-username', params: { username: this.$store.state.user.username } }">
            view your profile.
          </v-btn></h3>
          <img id="logo" :src="vueniverseLogo" alt="vueniverse_logo.svg">
        </v-container>
        <v-container v-else>
          <h3 class="text-xs-center">Vueniverse</h3>
          <img id="logo" :src="vueniverseLogo" alt="vueniverse_logo.svg">
          <h4>Source code</h4>
          <a href="https://vueniverse.now.sh/_src" target="_blank"><h5>NOW</h5></a>
          <a href="https://www.github.com/rlindskog/vueniverse" target="_blank"><h5>Github</h5></a>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
{{{{/raw}}}}

<script>
import vueniverseLogo from '~assets/img/vueniverse_logo.svg'
export default {
  data() {
    return {
      vueniverseLogo
    }
  }
}
</script>
