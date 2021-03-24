<template>
  <v-main>
    <v-row class="mt-16">
      <Books />
      <AddBook :authors="author_list" />
      <Authors :authors="author_list" />
      <AddAuthor />
    </v-row>
  </v-main>
</template>

<script>
import Books from '../components/book/Books.vue'
import AddBook from '../components/book/AddBook.vue'
import Authors from '../components/author/Authors.vue'
import AddAuthor from '../components/author/AddAuthor.vue'
import rest from '@/core/rest'

export default {
	components: { 
    Books,
    AddBook,
    Authors,
    AddAuthor
  },
  name: 'dashboard',

  data () {
    return{
      author_list: [],
    }
  },

  mounted() {
    this.getAuthors()
  },

  methods: {
    getAuthors() {
      rest.get('http://localhost:8080/v1/authors', {}, (res) => {
        this.author_list = JSON.parse(JSON.stringify(res))
      })
    },
  }
}
</script>

<style>

</style>