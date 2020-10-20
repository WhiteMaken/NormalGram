<template>
    <div id="app">
        <div class="button_cont"><a class="example_c"  target="_blank" color="red"
          to @click="goBack()">Back</a>
        </div>
        <div class="responsive">
<div class="gallery">
        <a target="_blank" :href="this.user.avatar">
          <img :src="this.user.avatar"  width="1200" height="800"/>
        </a>
        <div class="desc">{{this.user.username}}</div>
        <div class="desc3">Name: {{this.user.name}}</div>
        <div class="desc3">Email: {{this.user.email}}</div>
        <div class="desc3">Posts: {{this.user.posts.length}}</div>
        <AddCommentItem v-bind:user={user} v-on:add-new="reupdateByAdd"/>
        <ul>
        <li v-for="comment in comments" :key="comment._id">
        <UserCommentItem v-bind:comment={comment} v-on:patch-new="reupdateByPatch" v-on:delete-new="reupdateByDelete" />
        </li>
        </ul>
    </div>
</div>
</div>
</template>

<script>
import { Api } from '@/Api'
import UserCommentItem from '../components/Comment/UserCommentItem'
import AddCommentItem from '../components/Comment/AddCommentItem'

export default {
  data() {
    return {
      comments: [],
      user: {}
    }
  },
  components: {
    UserCommentItem,
    AddCommentItem
  },
  methods: {

    reupdateByAdd(obj) {
      console.log(obj)
      this.comments.splice(0, 0, obj)
    },
    reupdateByDelete(id) {
      const index = this.comments.findIndex(comment => comment._id === id)
      console.log('Index is :', index)
      this.comments.splice(index, 1)
    },
    reupdateByPatch(obj) {
      const index = this.comments.findIndex(comment => comment._id === obj.id)
      this.comments[index].text = obj.text
    },

    goBack() {
      const path = '/userlist'
      this.$router.push(path)
    },

    getUserId() {
      const path = '/users/my/' + this.$route.params.id
      Api.get(path).then(({ data }) => {
        this.user = data
        console.log(this.user)
      })
        .catch((err) => console.error(err))
    },

    read() {
      const path = '/users/' + this.$route.params.id + '/comments'
      Api.get(path).then(({ data }) => {
        this.comments = data
        console.log(this.comments)
      })
        .catch((err) => console.error(err))
    }

  },

  mounted() {
    this.getUserId()
    this.read()
  }

}
</script>

<style scoped>

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

div.gallery {
  margin: 5px;
  border: 4px solid #494949;
  border-radius: 25px;
  padding: 5px;
}

div.gallery:hover {
  border: 4px solid #000000;
  border-radius: 25px;
}

div.gallery img {
  width: 100%;
  height: auto;
  border: 2px groove black;
}

div.desc {
  padding: 15px;
  text-align: center;
  font-weight: bolder;
}

div.desc2{
    text-align: end;
    font-weight: lighter;
}

* {
  box-sizing: border-box;
}

.responsive {
  padding: 0 6px;
  float: left;
  width: 99.99999%;
}

@media only screen and (max-width: 700px) {
  .responsive {
    width: 49.99999%;
    margin: 6px 0;
  }
}

@media only screen and (max-width: 500px) {
  .responsive {
    width: 100%;
  }
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

.example_c {
margin-top: 1em;
margin-bottom: 1em;
margin-right: 3em;
margin-left: 1em;
color: #000000 !important;
text-decoration: none;
background: #ff0000;
padding: 10px;
border: 4px solid #494949 !important;
display: inline-block;
transition: all 0.4s ease 0s;
border-radius: 20px;
}

.example_c:hover {
color: #000000 !important;
background: #ad0505;
border-color: #000000 !important;
transition: all 0.4s ease 0s;
}

.example_c:active{
  background:black;
  color:white !important;
  transition: all 0.1s ease 0s;
}
</style>
