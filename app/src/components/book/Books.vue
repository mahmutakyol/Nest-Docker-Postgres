<template>
  <v-card width="700" class="ml-10">
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
            <th class="text-left">
              Actions
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
            <td>
              <v-btn color="warning" x-small type="button" @click="updateBook(item)">update</v-btn>
              <v-btn color="error" x-small type="button" @click="deleteBook(item.id)">delete</v-btn>
            </td>
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

  sockets: {
    messageToClient(data) {
      if (data.type === 'AddBook') {
        this.books.push(data.data) 
      }

      if (data.type === 'UpdatedBook') {
        this.books.map((b) => {
          if (b.id === data.data.id) {
            b.name = data.data.name
            b.isbn = data.data.isbn
            b.author = data.data.author
          }
        })
      }
    }
  },

  methods: {
    getBooks() {
      rest.get('http://localhost:8080/v1/books', {}, (res) => {
        this.books = JSON.parse(JSON.stringify(res))
      })
    },

    deleteBook (id) {
      rest.delete('http://localhost:8080/v1/books/' + id, {}, () => {
        this.books = this.books.filter(book => book.id != id)
      })
    },

    updateBook (book) {
      this.$socket.emit('messageToServer', {
        type: 'UpdateBook',
        data: book
      })
    }
  }
}
</script>