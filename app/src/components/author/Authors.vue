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
        <tbody>
          <tr
            v-for="item in desserts"
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
export default {
  data () {
    return{
      desserts: [
        {
          name: 'Frozen Yogurt',
          surname: 159,
        }
      ],
    }
  }
}
</script>

<style>

</style>