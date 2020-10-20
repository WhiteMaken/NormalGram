<template>
<div id="app">
  <LoginItem v-on:sign-in="reupdateByTrue"/>
</div>
</template>

<script>
import LoginItem from '../components/auth/LoginItem'
export default {
  data() {
    return {
    }
  },
  props: ['login', 'loggedIn'],
  components: {
    LoginItem
  },
  methods: {

    reupdateByTrue(response) {
      this.$emit('set-logged-in', response)
    }
  }
}
</script>
