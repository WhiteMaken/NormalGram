<template>
  <main id="app">
    <nav-bar
      :login="login"
      :logged-in="loggedIn"
      @move-to-login="moveToLogin"
      @move-to-reg="moveToReg"
      @sign-out="signOut"
    />
    <div class="content_wrapper">
      <div class="content">
        <router-view
          :login="login"
          :logged-in="loggedIn"
          @set-logged-in="setLoggedIn"
        />
      </div>
    </div>
  </main>
</template>

<script>
import NavBar from './components/NavBar'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'home',
  data() {
    return {
      login: false,
      loggedIn: false,
      mod: false
    }
  },
  components: {
    NavBar
  },
  created() {
    const token = localStorage.getItem('jwt')
    const decoded = VueJwtDecode.decode(token)

    if (decoded != null) {
      this.loggedIn = true
    } else {
      this.login = false
      this.loggedIn = false
    }
  },
  methods: {
    moveToLogin() {
      this.login = true
    },
    moveToReg() {
      this.login = false
    },
    setLoggedIn(response) {
      this.loggedIn = response.data.user.loggedIn
      location.href = /home/
    },
    signOut() {
      this.login = true
      this.loggedIn = false

      location.href = '/'
    }
  }
}
</script>

<style>
  html {
    scroll-behavior: smooth;
  }

  #app {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    line-height: 1.7;
    padding: 0;
    margin: auto;
    background-color: #fafafa;
    min-height: 100vh;
  }

  #app a {
    text-decoration: none;
  }
  .content_wrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 1300px;
  }
  .content_wrapper .content {
    margin: 0 20px 20px 20px;
  }
</style>
