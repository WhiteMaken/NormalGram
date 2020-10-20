<template>
<div class="responsive">
<div class="gallery">
    <date v-if="post.post" :date="post.post.upload_date"/>
    <div>
    {{post.post.likes}}
    <span>&#10084;</span>
    </div>
        <a target="_blank" :href="post.post.picture">
          <img :src="post.post.picture"  width="1200" height="800"/>
        </a>
        <div class="desc">{{post.post.text}}</div>
        <div class="desc2">{{post.post.owner.username}}</div>
        <div class="button_cont"><a class="example_c"  target="_blank"
    to @click="patchPost(post.post._id)"><span class= heart></span></a></div>
</div>
</div>
</template>

<script>
import Date from '../../components/shared/Date'
import { Api } from '@/Api'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  data() {
    return {
    }
  },
  props: ['post'],
  components: {
    Date
  },
  mounted() {
    console.log(this.post.post)
    this.getUserId()
  },
  methods: {

    getUserId() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.user = decoded
    },

    async patchPost(id) {
      if (this.post.post.likes >= 50) {
        this.$emit('delete-popular-new', id)
        const path = '/posts/' + id
        Api.delete(path)
      } else {
        this.$emit('like-new', id)
        const path = '/posts/' + id + '/pluslikes/'
        Api.patch(path)
      }
    }
  }

}
</script>

<style>

.heart:before {
  content: '\2665';
  color: red;

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
