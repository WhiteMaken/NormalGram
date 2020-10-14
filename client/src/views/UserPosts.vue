<template>
    <div id="app">
<div>
            <input
            type="newText"
            id="input"
            class="form-control mb-5"
            placeholder="Enter a valid picture URL"
            v-model="post.picture"
            required
          />
        </div>
        <div>
            <input
            type="newText"
            id="input2"
            class="form-control mb-5"
            placeholder="Enter text"
            v-model="post.text"
            required
          />
        </div>
        <div>
        <b-button to @click="addPost(); reloadPage()" variant=success>Add Post</b-button>
        </div>
    <div>
    <b-button href ='/home' type="home" variant="secondary">Home</b-button>
    </div>
        <ul id="example-1">
  <li v-for="post in posts" :key="post._id">
      <div class="blue_box">
    <span>{{post.upload_date}} Likes: {{post.likes}}</span>
</div>
<div>
        <b-img :src="post.picture" fluid alt="Responsive image"></b-img>/>
</div>
      <div class="blue_box">
    <span>{{post.text}}</span>
    </div>
    <div>
        <input
            type="newText"
            id="inputText"
            class="form-control mb-6"
            placeholder="Enter new text"
            v-model="postmodifier.text"
            required
          />
          </div>
    <div>
    <b-button to @click="patchPost(post._id); reloadPage()" variant=warning>Edit Text</b-button>
    </div>
    <div>
    <b-button to @click="deletePost(post._id); reloadPage()" variant=danger>Delete Post</b-button>
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
      user: {},
      post: {
        text: '',
        picture: '',
        owner: ''

      },
      postmodifier: {
        text: ''
      }
    }
  },
  methods: {

    read() {
      const path = '/users/' + this.user._id + '/posts'
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

    seedPost() {
      this.post.owner = this.user._id
    },

    async addPost() {
      const path = '/users/' + this.user._id + '/posts'
      Api.post(path, this.post)
    },

    async deletePost(id) {
      const path = '/users/' + this.user._id + '/posts/' + id
      Api.delete(path)
      const path2 = '/posts/' + id
      Api.delete(path2)
    },

    async patchPost(id) {
      const path = '/posts/' + id
      Api.patch(path, this.postmodifier)
    },

    reloadPage() {
      window.location.reload()
    }
  },

  mounted() {
    this.getUserId()
    this.read()
    this.seedPost()
  }

}
</script>

<style>

body {
  background-color: lightblue;
}

input[class="form-control mb-5"] {
  width: 50%;
  margin-top: 1em;
margin-bottom: 1em;
background-color: aliceblue;
}

input[class="form-control mb-6"] {
    width: 50%;
background-color: rgb(255, 200, 209);
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
