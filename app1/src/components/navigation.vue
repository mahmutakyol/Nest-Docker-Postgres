<template>
  <v-app-bar app color="orange">
    <v-toolbar-title>Valde / Book Storage </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded @click="$router.push('/')">Home</v-btn>
    <v-btn v-if="is_authanticated" text rounded @click="$router.push('/auth/login')">Login</v-btn>
    <v-btn text rounded @click="$router.push('/auth/register')">Register</v-btn>
    <v-btn text rounded @click="logout()">Log Out</v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: 'Navigation',
  data() {
    return {
      is_authanticated: false
    }
  },
  methods: {
    logout() {
      localStorage.setItem('token', null)
    }
  },
  mounted() {
    document.body.addEventListener('loggedIn', () => {
    })

    document.body.addEventListener('loggedOut', () => {
    })
  },
  destroyed () {
    document.body.removeEventListener('loggedIn', this.clickFunction)
    document.body.removeEventListener('loggedOut', this.clickFunction)
  }
}
</script>