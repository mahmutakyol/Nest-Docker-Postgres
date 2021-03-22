<template>
  <v-app-bar app color="orange">
    <v-toolbar-title>Valde / Book Storage </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text rounded @click="$router.push('/')">Home</v-btn>
    <v-btn text rounded @click="$router.push('/auth/login')">Login</v-btn>
    <v-btn text rounded @click="$router.push('/auth/register')">Register</v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: 'Navigation',
  methods: {
    route() {

    }
  }
}
</script>