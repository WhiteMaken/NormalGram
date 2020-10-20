<template>
  <header>
    <div class="max_width">
      <div class="nav_content">
        <router-link to="/home">
        <img src="../assets/normalgram.png" alt="logo">
          <span style="color: #fff"> NormalGram</span>
        </router-link>
        <div class="nav_links">
          <router-link v-if="loggedIn" to="/myposts">My Wall</router-link>
          <router-link v-if="loggedIn" to="/posts">Posts</router-link>
          <router-link v-if="loggedIn" to="/stories">Stories</router-link>
          <router-link v-if="loggedIn" to="/userlist">Users</router-link>
          <router-link v-if="loggedIn" to="/home">Settings</router-link>
          <a href="#" v-if="loggedIn" @click="$emit('sign-out')">Sign out</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'nav-bar',
  props: ['login', 'loggedIn']
}
</script>

<style>
  header {
    background-color: #2F303A;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100 !important;
  }
  header .max_width {
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
  header .nav_content {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px;
    padding: 0.666em 0 0.666em 0;
  }
  header .nav_content .nav_links {
    display: flex;
    align-items: center;
  }
  header .nav_content .nav_links > a {
    color: rgb(255, 255, 255);
  }
  header .nav_content .nav_links > a:nth-child(n + 1) {
    margin-right: 30px;
  }
</style>
