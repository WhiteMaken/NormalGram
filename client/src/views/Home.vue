<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-lightblue">
      <div class="container">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a href='/pictures'>Pictures</a>
        <a href='/users/settings'>Settings</a>
        <a href='/myposts'>My Posts</a>
        <a href='/stories'>Story</a>
        <a href='/posts'>All Posts</a>

        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" @click="logUserOut"> Logout</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
      </div>
    </nav>
    <b-container>
      <b-row align-h="center" align-v="center" class="mt-3">
        <b-col cols="10">
          <b-card class="p-1">
            <div class="usersettings" />
            <li class="list-group-item">Name : {{ user.name }}</li>
            <li class="list-group-item">Email : {{ user.email }}</li>
            <li class="list-group-item">Username : {{ user.username }}</li>
            <usersettings />
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    getUserDetails() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.user = decoded
    },
    logUserOut() {
      localStorage.removeItem('jwt')
      this.$router.push('/')
    }
  },
  created() {
    this.getUserDetails()
  }
}
</script>
<style scoped>
a {
  margin: 5px;
}
</style>
