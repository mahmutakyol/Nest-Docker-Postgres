<template>
  <v-app>
    <v-container>
      <navigation></navigation>
      <v-row class="mx-auto mt-16 ml-10">
        <books :list="desserts"></books>
        <authors :list="desserts" class="ml-10"></authors>
      </v-row>
    </v-container>
  </v-app>  
</template>

<script>
import Authors from '../components/authors.vue'
import Books from '../components/books.vue'
import navigation from '../components/navigation.vue'
export default {
	components: { navigation, Books, Authors },
  data () {
    return {
      showPassword: false,
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },

  mounted () {
    
  }
}
</script>