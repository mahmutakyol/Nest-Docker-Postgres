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
        <v-text-field 
          v-model="form.author"
          label="Author"
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
      form: {
        name: null,
        isbn: null,
        author: null
      }
    }
  },

  methods: {
    submit() {
      rest.post('http://localhost:8080/v1/books', this.form, (res) => {
        console.log(res)
      })
    }
  }

}
</script>

<style>

</style>