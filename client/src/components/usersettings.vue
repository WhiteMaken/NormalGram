<template>
  <div>
    <b-button href ='/home' type="home" variant="secondary">Return Home</b-button>
    <b-form @submit="onSubmit">
      <span>New user name (Input current name if not changed)</span>
       <b-form-input
          id="input-1"
          v-model="form.name"
          required
          type="username"
          placeholder="Enter new user name"
        ></b-form-input>
        <span>New e-mail (Input current email if not changed)</span>
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter new email address"
        ></b-form-input>
        <span>Change password (Input current password if not changed) </span>
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      <b-button type="submit" variant="primary">Save Update</b-button>
      <b-button v-on:click= "deleteUser"  variant="danger" >Delete Account</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{form}}</pre>
    </b-card>
  <div></div>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
import { Api } from '@/Api'
import swal from 'sweetalert'
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
    updateProfile() {
      try {
        Api.patch('/users/' + this.user._id, this.form)
        swal('Success', 'Profile has been changed', 'Error')
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
      this.updateProfile()
    }
  },
  mounted() {
    this.read()
  }
}
</script>
