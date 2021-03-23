<template>
  <v-app-bar app color="orange">
    <v-toolbar-title>Book Storage</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded @click="goTo('home')">Home</v-btn>
    <template v-if="authenticated">
      <v-btn text rounded disabled>{{ user.email }}</v-btn>
      <v-btn text rounded @click="goTo('dashboard')">Dashboard</v-btn>
      <v-btn text rounded @click="signOut()">Sign Out</v-btn>
    </template>
    <template v-else>
      <v-btn text rounded @click="goTo('signup')">Sign Up</v-btn>
      <v-btn text rounded @click="goTo('signin')">Sign In</v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  },

  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),

    signOut () {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: 'home'
        })
      })
    },

    goTo(name) {
      this.$router.replace({ name: name })
    }
  }
}
</script>

<style>

</style>