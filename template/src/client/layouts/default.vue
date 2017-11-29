{{{{raw}}}}
<template>
  <v-app>
    <v-navigation-drawer
      enable-resize-watcher
      disable-route-watcher
      persistent
      dark
      :mini-variant.sync="mini"
      v-model="drawer"
      v-if="$store.state.user.isAuthenticated">
      <v-list class="main-list">
        <v-list-item>
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
              <v-btn icon light @click.native.stop="mini = !mini">
                <v-icon light>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-item>
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
          <v-list-item v-for="subItem in item.items" v-bind:key="subItem.title">
            <v-list-tile ripple>
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="darken-4" light fixed>
      <v-toolbar-side-icon v-if="$store.state.user.isAuthenticated" light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{name}}</v-toolbar-title>
      <v-menu bottom left>
        <v-btn icon="icon" slot="activator" light>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-item>
            <v-list-tile ripple router to="/users/auth/sign-in" v-if="!$store.state.user.isAuthenticated">
              <v-list-tile-title>Sign In</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple router to="/users/auth/sign-up" v-if="!$store.state.user.isAuthenticated">
              <v-list-tile-title>Sign Up</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple router to="/users/auth/sign-out" v-if="$store.state.user.isAuthenticated">
              <v-list-tile-title>Sign Out</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple router to="/users">
              <v-list-tile-title>Users</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
          <v-list-item>
            <v-list-tile ripple router to="/admin" v-if="$store.state.user.admin">
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <main>
      <v-container fluid>
        <nuxt></nuxt>
      </v-container>
    </main>
    <v-snackbar
      :timeout="3000"
      :bottom="true"
      :right="true"
      :multi-line="true"
      :success="$store.state.notification.context === 'success'"
      :info="$store.state.notification.context === 'info'"
      :warning="$store.state.notification.context === 'warning'"
      :error="$store.state.notification.context === 'error'"
      :primary="$store.state.notification.context === 'primary'"
      :secondary="$store.state.notification.context === 'secondary'"
      v-model="snackbar">
      {{ $store.state.notification.text }}
      <v-btn light flat @click.native="$store.commit('notification/UPDATE_SNACKBAR', false)">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>
{{{{/raw}}}}

<script>
// search icons: https://material.io/icons/ asd
export default {
  data () {
    return {
      items: [
        {
          action: 'android',
          title: 'Something',
          items: [
            { title: 'First' },
            { title: 'Second' },
            { title: 'Third' }
          ]
        },
        {
          action: 'settings',
          title: 'Settings',
          items: [
            { title: 'Payment' },
            { title: 'Account' },
            { title: 'Privacy' }
          ]
        }
      ],
      name: '{{name}}',
      drawer: true,
      mini: true,
      right: null
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
    }
  }
}
</script>
