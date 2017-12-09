<template>
  <v-app id="inspire">
    <v-navigation-drawer
      fixed
      enable-resize-watcher
      disable-route-watcher
      persistent
      :mini-variant.sync="mini"
      v-model="drawer"
      v-if="$store.state.user.isAuthenticated"
      app>
      <v-list class="main-list">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{name}}
              </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action icon>
            <v-btn icon light @click.stop="mini = !mini">
              <v-icon light>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-group v-for="item in items" :value="item.active" v-bind:key="item.title">
          <v-list-tile slot="item" :ripple="!item.items" :router="!item.items" :to="item.to ? item.to : ''">
            <v-list-tile-action icon light>
              <v-icon icon light>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.items">
              <v-icon light>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.items" v-bind:key="subItem.title" ripple>
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.action }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed>
      <v-toolbar-side-icon v-if="$store.state.user.isAuthenticated" light @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <v-btn icon="icon" slot="activator" light>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile ripple router to="/users/auth/sign-in" v-if="!$store.state.user.isAuthenticated">
            <v-list-tile-title>Sign In</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple router to="/users/auth/sign-up" v-if="!$store.state.user.isAuthenticated">
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple router to="/users/auth/sign-out" v-if="$store.state.user.isAuthenticated">
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple router to="/users">
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple router to="/admin" v-if="$store.state.user.role === 'admin'">
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content app clipped-left>
      <v-container fluid fill-height>
        <v-layout>
          <nuxt></nuxt>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer light app>
      <span>&copy; 2017</span>
    </v-footer>
    <v-snackbar
      :timeout="3000"
      :bottom="true"
      :right="true"
      :multi-line="true"
      :color="snackbarColor"
      v-model="snackbar">
      {{ $store.state.notification.text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
// search icons: https://material.io/icons/ asd
export default {
  props: {
    source: String
  },
  data () {
    return {
      items: [
        {
          action: 'accessibility',
          title: 'Tables',
          active: false,
          items: [
            { title: 'Users', route: { name: 'admin-users' } },
            { title: 'Posts', route: { name: 'admin-posts' } }
          ]
        }
      ],
      name: 'Vueniverse Admin',
      drawer: true,
      mini: true,
      right: null,
      profilePath: this.$store.state.user.isAuthenticated
        ? { name: 'users-username', params: { username: 'rlindskog' } }
        : { path: '/' }
    }
  },
  computed: {
    snackbar: {
      get () {
        return this.$store.state.notification.snackbar
      },
      set (value) {
        this.$store.commit('notification/UPDATE_SNACKBAR', value)
      }
    },
    snackbarColor () {
      return this.$store.state.notification.context
    }
  }
}
</script>
