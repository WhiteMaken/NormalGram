<template>
  <div>
    <b-button href ='/home' type="home" variant="secondary">Return Home</b-button>
    <b-form @submit="onSubmit">
    <b-card bg-variant="light">
    <b-form-group
      label-cols-lg="3"
      label="Profile update"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
      v-row align="center"
      justify="center"
    >
      <b-form-group
        label-cols-sm="3"
        label="Name:"
        label-align-sm="right"
        label-for="nested-street"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          type="username"
          placeholder="Enter new user name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Email:"
        label-align-sm="right"
        label-for="nested-city"
      >
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter new email address"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Password:"
        label-align-sm="right"
        label-for="nested-state"
      >
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
        <b-button type="submit" variant="primary">Save Update</b-button>
        <b-button v-on:click= "deleteUser"  variant="danger"  >Delete Account</b-button>
      <b-button href ='/users/avatar' type="avatar" variant="secondary">Avatar</b-button>
    </b-form-group>
  </b-card>
  </b-form>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
import { Api } from '@/Api'
import swal from 'sweetalert'
// import Notification from 'client/src/components/Notification.vue'
export default {
  data() {
    return {
      user: {},
      form: {
        name: ' ',
        email: ' ',
        password: ' '
      },
      show: true
    }
  },
  methods: {
    changePassword() {
      try {
        Api.patch('/users/' + this.user._id, this.form)
        swal('Success', 'Password changed', 'Error')
      } catch (err) {
        console.log(err.response)
        swal('Error', 'Something Went Wrong', 'error')
      }
    },
    changeName() {
      try {
        Api.patch('/users/' + this.user._id, this.name)
        swal('Success', 'Password changed', 'Error')
      } catch (err) {
        console.log(err.response)
        swal('Error', 'Something Went Wrong', 'error')
      }
    },
    changeEmail() {
      try {
        Api.patch('/users/' + this.user._id, this.email)
        swal('Success', 'Password changed', 'Error')
      } catch (err) {
        console.log(err.response)
        swal('Error', 'Something Went Wrong', 'error')
      }
    },
    deleteUser() {
      Api.delete('/users/' + this.user._id)
      this.$router.push('/')
    },
    read() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.user = decoded
    },
    onSubmit() {
      this.changePassword()
      this.changeEmail()
      this.changeName()
    }
  },
  mounted() {
    this.read()
  }
}
</script>
<style>

body {
  background-color: lightblue
}
.action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

input[class="form-control mb-5"] {
  width: 50%;
  margin-top: 1em;
margin-bottom: 1em;
background-color: aliceblue;
}

button{
margin-top: 1em;
margin-bottom: 1em;
margin-right: 3em;
}
img {
border: 3px groove rgb(26, 0, 143);
}
</style>
