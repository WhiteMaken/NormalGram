<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-lightblue">
      <div class="container">
<div class="topnav">
        <a href="/pictures">Pictures</a>
        <a href="/users/settings">Settings</a>
        <a href="/myposts">Posts</a>
        <a href="/stories">Story</a>
        <a class="nav-link" @click="getUserDetails"> Normalgram</a>
        <c class="nav-link" @click="logUserOut"> Logout</c>
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
<style>
.p-1 {
  padding-right: 10rem;
  background-color: lightblue;
}

/* Add a black background color to the top navigation */
.topnav {
  background-color: lightblue;
  overflow: hidden;
}
.container{
 background-color: lightblue
}

.topnav a {
  float: left;
  color: #042b75;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: rgb(108, 235, 235);
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4CAF50;
  color: white;
}

.topnav c{ background-color: rgb(22, 60, 61);
  overflow: hidden;
}
.topnav c {
  float: right;
  color: #f2f2f2;
  text-align: right;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 17px;
}

.topnav c:hover {
  background-color: brown;
  color: black;
}

img {
  border: 3px groove rgb(26, 0, 143);
}

</style>
