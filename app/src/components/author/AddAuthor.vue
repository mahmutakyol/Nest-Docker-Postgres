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
export default {
  name: 'add-book',

  data() {
    return {
      form: {
        name: null,
        surname: null,
      }
    }
  }

}
</script>

<style>

</style>