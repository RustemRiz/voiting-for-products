<template>
  <v-app>
    <v-toolbar app>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat to="/">Products</v-btn>
          <v-btn v-if="user" flat @click="logout">Log out</v-btn>
          <v-btn v-else flat to="/login">Log in</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },
  created () {
    this.$store.dispatch('auth');
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>
