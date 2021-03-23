<template>
<v-main>
    <v-card width="500" class="mx-auto mt-16">
      <v-card-title>Sign Up</v-card-title>
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-text-field 
            v-model="form.name"
            label="Name"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field 
            v-model="form.email"
            label="Email"
            prepend-icon="mdi-account-circle"
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" type="Submit">Sign Up</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'sign-in',

  data () {
    return {
      showPassword: false,
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions({
      signUp: 'auth/signUp'
    }),

    submit () {
      this.signUp(this.form).then(() => {
        this.$router.replace({
          name: 'signin'
        })
      })
    }
  }

}
</script>

<style>

</style>