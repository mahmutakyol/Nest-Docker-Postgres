<template>
  <v-card width="500" class="ml-10">
    <v-card-title>Add Book</v-card-title>
    <v-form @submit.prevent="submit">
      <v-card-text>
        <v-text-field 
          v-model="form.name"
          label="Book Name"
          prepend-icon="mdi-library"
        ></v-text-field>
        <v-text-field 
          v-model="form.isbn"
          label="ISBN"
          prepend-icon="mdi-book"
        ></v-text-field>
        <v-text-field v-if="form.author !== null"
          v-model="author_fullname"
          label="Author"
          disabled
          prepend-icon="mdi-pen"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" type="Submit">Add</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import rest from '@/core/rest'
export default {
  name: 'add-book',

  data() {
    return {
      author_fullname: null,
      form: {
        id: null,
        name: null,
        isbn: null,
        author: null
      }
    }
  },

  sockets: {
    messageToClient(data) {
      if (data.type === 'UpdateBook') {
        this.form.id = data.data.id
        this.form.name = data.data.name
        this.form.isbn = data.data.isbn
        this.form.author = data.data.author

        if (this.form.author !== null) {
          this.author_fullname = this.form.author.name + ' ' + this.form.author.surname
        }
      }
    }
  },

  methods: {

    clearForm() {
      this.form.id = null
      this.form.name = null
      this.form.isbn = null
      this.form.author = null
    },
    submit() {
      if (this.form.id !== null) {
        rest.put('/books/' + this.form.id, this.form, () => {
          this.$socket.emit('messageToServer', {
            type: 'UpdatedBook',
            data: this.form
          })
          this.clearForm()
        })
      } else {
        rest.post('/books', this.form, (res) => {
          this.$socket.emit('messageToServer', {
            type: 'AddBook',
            data: res
          })
          this.clearForm()
        })
      }
    }
  }

}
</script>