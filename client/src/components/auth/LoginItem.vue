
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="loginUser"
        >
          <input
            type="username"
            id="username"
            class="form-control mb-5"
            placeholder="Username"
            v-model="login.username"
            required
          />

          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
            required
          />

          <p>
            Dont have an account? <router-link to="/register"
              >click here</router-link
            >
          </p>

          <!-- Sign in button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { Api } from '@/Api'
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''

      }
    }
  },
  methods: {
    async loginUser() {
      try {
        const response = await Api.post('/users/login', this.login)
        const token = response.data.token
        localStorage.setItem('jwt', token)
        if (token) {
          swal('Success', 'Login Successful', 'Error')
          this.$router.push('/home')
          this.$emit('sign-in', true)
        }
      } catch (err) {
        swal('Error', 'Something Went Wrong', 'error')
        console.log(err.response)
      }
    }
  }
}
</script>
