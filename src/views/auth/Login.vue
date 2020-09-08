<template>
  <div>
    <h1>Login Page</h1>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <input
        type="email"
        v-model="form.user_email"
        placeholder="Input Your Email ..."
      /><br />
      <input
        type="password"
        v-model="form.user_password"
        placeholder="Input Your Password ..."
      />
      <br />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </b-form>
    <hr />
    <!-- [1&2] -->
    <!-- <h3>{{ dataName }}</h3> -->
    <!-- [3] -->
    <h3>{{ name }}</h3>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  computed: {
    // [1]
    // dataName() {
    //   return this.$store.state.name
    // }
    // [2]
    // ...mapState({ dataName: 'name' })
    // [3]
    ...mapState(['name'])
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      // console.log(this.form)
      this.login(this.form)
        .then(result => {
          console.log(result)
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
    }
  }
}
</script>
