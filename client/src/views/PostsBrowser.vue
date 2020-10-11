<template>
    <div id="app">
    <div>
    <b-button href ='/home' type="home" variant="secondary">Home</b-button>
    </div>
        <ul id="example-1">

  <li v-for="post in posts" :key="post._id">
      <div class="blue_box">
    <span>{{post.upload_date}} Likes: {{post.likes}}</span>
</div>
<div>
        <img :src="post.picture"/>
</div>
      <div class="blue_box">
    <span>{{post.text}}</span>
    </div>
    <div id=likeButton>
    <b-button to @click="patchPost(post._id);hideLikes()" variant=success>Like</b-button>
    </div>
    <div id=dislikeButton>
    <b-button class="dislike" to @click="patchPost(post._id);hideDislikes()" variant=danger>Dislike</b-button>
    </div>
  </li>
</ul>
    </div>
</template>

<script>
import { Api } from '@/Api'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data() {
    return {
      posts: [],
      user: {}
    }
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

    async patchPost(id) {
      const path = '/posts/' + id + '/pluslikes/'
      Api.patch(path)
    },

    hideLikes() {
      document.getElementById('likeButton').style.display = 'hidden'
      document.getElementById('dislikeButton').style.visibility = 'visible'
    },

    hideDislikes() {
      document.getElementById('likeButton').style.visibility = 'visible'
      document.getElementById('dislikeButton').style.visibility = 'hidden'
    },

    reloadPage() {
      window.location.reload()
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
  background-color: lightblue;
}

ul {
    color: white;
   list-style-type: circle;
   padding: 11px 21px;
   list-style-type: none;
}

ul li {
  background: #cce5ff;
  margin: 5px;
}

button{
    display: block;
margin-top: 1em;
margin-bottom: 1em;
margin-right: 3em;
}

img {
border: 3px groove rgb(26, 0, 143);
}

.blue_box{
    display: block;
    clear:both;
    margin-bottom: 5em;
    margin-top: 1em;
}
.blue_box span {
    background-color:lightskyblue;
    color: black;
    padding: 10px 5px;
    display: block;
    border: 3px groove rgb(26, 0, 143);
    float: left;
    margin-right: 50px;
}
</style>
