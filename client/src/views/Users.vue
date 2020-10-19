<template>
    <div id="app">
        <ul id="example-1">

  <li v-for="user in users" :key="user._id">
      <AllUserItem v-bind:user={user} v-on:check-profile="checkUser"/>
      </li>
</ul>
    </div>
</template>

<script>
import { Api } from '@/Api'
import VueJwtDecode from 'vue-jwt-decode'
import AllUserItem from '../components/User/AllUserItem'
export default {
  data() {
    return {
      users: [],
      currentUser: {}
    }
  },
  components: {
    AllUserItem
  },
  methods: {

    read() {
      const path = '/users'
      Api.get(path).then(({ data }) => {
        console.log(data)
        this.users = data
      })
        .catch((err) => console.error(err))
    },

    getUserId() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.currentUser = decoded
    },

    checkUser(id) {
      this.$router.push('/myposts')
    }

  },

  mounted() {
    this.getUserId()
    this.read()
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
</style>
