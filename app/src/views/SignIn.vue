<template>
<v-main>
    <v-card width="500" class="mx-auto mt-16">
      <v-card-title>Sign In</v-card-title>
      <v-form @submit.prevent="submit">
        <v-card-text>
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
          <v-btn color="success" type="Submit">Sign In</v-btn>
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
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions({
      signIn: 'auth/signIn'
    }),

    submit () {
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: 'dashboard'
        })
      })
    }
  }

}
</script>

<style>

</style>