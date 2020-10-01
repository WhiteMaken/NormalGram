<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Password:"
        label-for="input-1"
        description="We'll never share your password with anyone else."
      ></b-form-group>

        <b-form-input
          id="input-1"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button href ='/home' type="home" variant="secondary">Home</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
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

    read() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.user = decoded
    },
    onSubmit(evt) {
      this.changePassword()
      evt.preventDefault()
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  mounted() {
    this.read()
  }
}
</script>
