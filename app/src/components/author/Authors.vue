<template>
  <v-card width="500" class="ml-10">
    <v-card-title>Authors</v-card-title>
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Surname
            </th>
            <th class="text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody v-if="authors.length > 0">
          <tr
            v-for="item in authors"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.surname }}</td>
            <td>
              <v-btn color="warning" x-small type="button" @click="updateAuthor(item)">update</v-btn>
              <v-btn color="error" x-small type="button" @click="deleteAuthor(item.id)">delete</v-btn>
              <v-btn v-if="canBeAdd" color="success" x-small type="button" @click="addAuthor(item)">add</v-btn>
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
  name: 'add-author',

  props: {
    authors: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      canBeAdd: false,
      book: []
    }
  },

  sockets: {
    messageToClient(data) {
      if (data.type === 'AddAuthor') {
        this.authors.push(data.data) 
      }

      if (data.type === 'UpdatedAuthor') {
        this.authors.map((b) => {
          if (b.id === data.data.id) {
            b.name = data.data.name
            b.surname = data.data.surname
          }
        })
      }

      if (data.type === 'AddAuthorToBook') {
        this.canBeAdd = true
        this.book = data.data
      }
    }
  },

  methods: {
    deleteAuthor (id) {
      rest.delete('/authors/' + id, {}, () => {
        this.authors = this.authors.filter(author => author.id != id)
      })
    },

    updateAuthor (author) {
      this.$socket.emit('messageToServer', {
        type: 'UpdateAuthor',
        data: author
      })
    },

    addAuthor (item) {
      this.book.author = item
      this.$socket.emit('messageToServer', {
        type: 'BookAuthorAdded',
        data: this.book
      })
      this.canBeAdd = false
    }
  }
}
</script>