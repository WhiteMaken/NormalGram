<template>
    <div id="app">

  <AddPostItem v-on:add-new="reupdateByAdd"/>

  <ul id="example-1">
    <li v-for="post in posts" :key="post._id">
      <PostItem v-bind:post={post} v-on:patch-new="reupdateByPatch" v-on:delete-new="reupdateByDelete" />
    </li>
  </ul>
    </div>
</template>

<script>
import { Api } from '@/Api'
import VueJwtDecode from 'vue-jwt-decode'
import PostItem from '../components/Post/PostItem'
import AddPostItem from '../components/Post/AddPostItem'

export default {
  data() {
    return {
      posts: [],
      user: {}
    }
  },
  components: {
    PostItem,
    AddPostItem
  },
  methods: {

    reupdateByAdd(obj) {
      console.log(obj)
      this.posts.splice(0, 0, obj)
    },
    reupdateByDelete(id) {
      const index = this.posts.findIndex(post => post._id === id)
      console.log('Index is :', index)
      this.posts.splice(index, 1)
    },
    reupdateByPatch(obj) {
      const index = this.posts.findIndex(post => post._id === obj.id)
      this.posts[index].text = obj.text
    },
    read() {
      const path = '/users/' + this.user._id + '/posts'
      Api.get(path).then(({ data }) => {
        this.posts = data
        console.log(this.posts)
      })
        .catch((err) => console.error(err))
    },

    getUserId() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.user = decoded
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
