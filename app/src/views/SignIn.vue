<template>
  <form @submit.prevent="submit">
    <div class="">
      <label for="">Email</label>
      <input type="text" name="email" id="email" v-model="form.email">
    </div>
    <div class="">
      <label for="">Password</label>
      <input type="password" name="password" id="password" v-model="form.password">
    </div>
    <div>
      <button type="submit">Sign In</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'sign-in',

  data () {
    return {
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
      this.signIn(this.form)
    }
  }

}
</script>

<style>

</style>