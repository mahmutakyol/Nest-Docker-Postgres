<template>
  <v-app>
    <navigation></navigation>
    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Login Area</v-card-title>
        <v-card-text>
          <v-text-field label="Email" v-model="form.email" type="email" prepend-icon="mdi-account-circle"/>
          <v-text-field
            v-model="form.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success">Register</v-btn>
          <v-btn color="info" @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '../../components/navigation'
import rest from '../../core/rest'
export default {
	components: { Navigation },
  name: 'LoginComponent',
  data () {
    return {
      showPassword: false,
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login() {
      rest.post('http://localhost:8080/v1/users/login', this.form, (res) => {

        localStorage.token = res.access_token
        console.log(localStorage)
      })
    } 
  }
}
</script>

<style>

</style>