<template>
    <div id="app">
        <ul id="example-1">

  <li v-for="post in posts" :key="post._id">
      <AllPostItem v-bind:post={post} v-on:like-new="reupdateByLike" v-on:delete-popular-new="reupdateByDelete"/>
      </li>
</ul>
    </div>
</template>

<script>
import { Api } from '@/Api'
import VueJwtDecode from 'vue-jwt-decode'
import AllPostItem from '../components/Post/AllPostItem'
export default {
  data() {
    return {
      posts: [],
      user: {}
    }
  },
  components: {
    AllPostItem
  },
  methods: {

    read() {
      const path = '/posts'
      Api.get(path).then(({ data }) => {
        console.log(data)
        this.posts = data
      })
        .catch((err) => console.error(err))
    },

    getUserId() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.user = decoded
    },

    reupdateByLike(id) {
      const index = this.posts.findIndex(post => post._id === id)
      this.posts[index].likes = this.posts[index].likes + 1
      console.log(this.posts[index].likes)
    },

    reupdateByDelete(id) {
      const index = this.posts.findIndex(post => post._id === id)
      console.log('Index is :', index)
      this.posts.splice(index, 1)
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
