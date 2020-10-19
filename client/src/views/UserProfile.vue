<template>
    <div id="app">
        <div class="responsive">
<div class="gallery">
        <a target="_blank" :href="this.user.name">
          <img :src="this.user.name"  width="1200" height="800"/>
        </a>
        <div class="desc">{{this.user.username}}</div>
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

div.gallery {
  margin: 5px;
  border: 1px solid #ccc;
}

div.gallery:hover {
  border: 1px solid #777;
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
  width: 49.99999%;
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
</style>
