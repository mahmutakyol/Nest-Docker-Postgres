<template>
  <v-card width="500" class="ml-10">
    <v-card-title>Add Author</v-card-title>
    <v-form @submit.prevent="submit">
      <v-card-text>
        <v-text-field 
          v-model="form.name"
          label="Name"
          prepend-icon="mdi-account"
        ></v-text-field>
        <v-text-field 
          v-model="form.surname"
          label="Surname"
          prepend-icon="mdi-account-circle"
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
      form: {
        id: null,
        name: null,
        surname: null,
      }
    }
  },

  sockets: {
    messageToClient(data) {
      if (data.type === 'UpdateAuthor') {
        this.form.id = data.data.id
        this.form.name = data.data.name
        this.form.surname = data.data.surname
      }
    }
  },

  methods: {
    clearForm() {
      this.form.id = null
      this.form.name = null
      this.form.surname = null
    },
    submit() {
      if (this.form.id !== null) {
        rest.put('/authors/' + this.form.id, this.form, () => {
          this.$socket.emit('messageToServer', {
            type: 'UpdatedAuthor',
            data: this.form
          })
          this.clearForm()
        })
      } else {
        rest.post('/authors', this.form, (res) => {
          this.$socket.emit('messageToServer', {
            type: 'AddAuthor',
            data: res
          })
          this.clearForm()
        })
      }
    }
  }

}
</script>