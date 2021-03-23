<template>
  <v-card width="500" class="ml-10">
    <v-card-title>Books</v-card-title>
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              ISBN
            </th>
            <th class="text-left">
              Author
            </th>
          </tr>
        </thead>
        <tbody v-if="books.length > 0">
          <tr
            v-for="item in books"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.isbn }}</td>
            <td>{{ item.author ? item.author.name : '' }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import rest from '@/core/rest'
export default {

  data () {
    return{
      books: [],
    }
  },

  mounted() {
    this.getBooks()
  },

  methods: {
    getBooks() {
      rest.get('http://localhost:8080/v1/books', {}, (res) => {
        this.books = JSON.parse(JSON.stringify(res))
      })
    }
  }
}
</script>

<style>

</style>