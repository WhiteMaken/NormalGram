<template>
  <div>
    <b-container>
      <b-row align-h="center" align-v="center" class="mt-3">
        <b-col cols="10">
          <b-card class="p-1">
            <div class="usersettings" />
            <li class="list-group-item">Name : {{ user.name }}</li>
            <li class="list-group-item">Email : {{ user.email }}</li>
            <li class="list-group-item">Username : {{ user.username }}</li>
            <usersettings />
            <div class="button_cont"><a class="example_c"  target="_blank"
    to @click="changeParameters()">Change Information</a></div>
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
    changeParameters() {
      this.$router.push('/users/settings')
    }
  },
  created() {
    this.getUserDetails()
  }
}
</script>
<style>

body {
    padding-top: 80px;
}

ul {
   padding: 11px 21px;
   list-style-type: none;
}

ul li {
  margin: 5px;
}

a {
  margin: 5px;
}

.example_c {
margin-top: 1em;
margin-bottom: 1em;
margin-right: 3em;
margin-left: 1em;
color: #000000 !important;
text-decoration: none;
background: #ffffff;
padding: 10px;
border: 4px solid #494949 !important;
display: inline-block;
transition: all 0.4s ease 0s;
border-radius: 25px;
display:flex;
justify-content: center;
align-items: center;
}

.example_c:hover {
color: #000000 !important;
background: #ffffff;
border-color: #000000 !important;
transition: all 0.4s ease 0s;
}

.example_c:active{
  background:black;
  color:white !important;
  transition: all 0.1s ease 0s;
}

</style>
