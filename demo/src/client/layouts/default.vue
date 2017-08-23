<template>
  <v-app>
    <v-navigation-drawer
      enable-resize-watcher
      disable-route-watcher
      persistent
      :mini-variant.sync="mini"
      v-model="drawer"
      v-if="$store.state.user.isAuthenticated">
      <v-list class="main-list">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <v-icon light>face</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $store.state.user.username || '' }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action icon>
            <v-btn icon light @click.native.stop="toggleNavDrawer(items)">
              <v-icon light>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-group v-for="item in items" :value="item.active" v-model="item.active" v-bind:key="item.title">
          <v-list-tile slot="item" :ripple="!item.items" nuxt :to="item.route || !item.items ? item.route : ''">
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
          <v-list-tile
            v-for="subItem in item.items"
            v-bind:key="subItem.title"
            ripple
            nuxt
            :to="item.route"
            @click.native.stop="toggleNavDrawer(items)">
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
    <v-toolbar class="indigo darken-4" dark fixed>
      <v-toolbar-side-icon v-if="$store.state.user.isAuthenticated" light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom>
        <v-btn icon="icon" slot="activator" light>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile ripple nuxt :to="{ name: 'users-username', params: { username: $store.state.user.username } }" v-if="$store.state.user.isAuthenticated">
            <v-list-tile-title>{{ $store.state.user.username }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple nuxt to="/users">
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple nuxt to="/admin" v-if="$store.state.user.role === 'admin'">
            <v-list-tile-title>Admin Interface</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple nuxt to="/users/auth/sign-in" v-if="!$store.state.user.isAuthenticated">
            <v-list-tile-title>Sign In</v-list-tile-title>
          </v-list-tile>
          <v-list-tile ripple nuxt to="/users/auth/sign-up" v-if="!$store.state.user.isAuthenticated">
            <v-list-tile-title>Sign Up</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-if="$store.state.user.isAuthenticated">
            <sign-out-button redirect="/"></sign-out-button>
          </v-list-tile>
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
      v-model="$store.state.notification.snackbar">
      {{ $store.state.notification.text }}
      <v-btn dark flat @click.native="$store.state.notification.snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import signOutButton from '~/components/auth/sign-out-button.vue'
// search icons: https://material.io/icons/
export default {
  components: { signOutButton },
  data () {
    return {
      items: [
        {
          action: 'android',
          title: 'Something',
          active: false,
          items: [
            { title: 'First' },
            { title: 'Second' },
            { title: 'Third' }
          ]
        },
        {
          action: 'settings',
          title: 'Settings',
          active: false,
          items: [
            { title: 'Payment' },
            { title: 'Account' },
            { title: 'Privacy' }
          ]
        }
      ],
      name: 'Vueniverse',
      drawer: true,
      mini: true,
      right: null
    }
  },
  methods: {
    toggleNavDrawer (items) {
      items.forEach(item => {
        item.active = false
      })
      this.mini = true
    }
  }
}
</script>
