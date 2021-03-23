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
      authors: [],
    }
  },

  mounted() {
    this.getAuthors()
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
    }
  },

  methods: {
    getAuthors() {
      rest.get('http://localhost:8080/v1/authors', {}, (res) => {
        this.authors = JSON.parse(JSON.stringify(res))
      })
    },
    deleteAuthor (id) {
      rest.delete('http://localhost:8080/v1/authors/' + id, {}, () => {
        this.authors = this.authors.filter(author => author.id != id)
      })
    },

    updateAuthor (author) {
      this.$socket.emit('messageToServer', {
        type: 'UpdateAuthor',
        data: author
      })
    }
  }
}
</script>

<style>

</style>