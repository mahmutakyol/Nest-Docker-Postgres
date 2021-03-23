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
          </tr>
        </thead>
        <tbody v-if="authors.length > 0">
          <tr
            v-for="item in authors"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.surname }}</td>
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

  methods: {
    getAuthors() {
      rest.get('http://localhost:8080/v1/authors', {}, (res) => {
        this.authors = JSON.parse(JSON.stringify(res))
      })
    }
  }
}
</script>

<style>

</style>