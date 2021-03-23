<template>
  <v-app>
    <Navigation />
    <router-view/>
  </v-app>
</template>
<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>
