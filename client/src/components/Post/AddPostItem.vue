<template>
<div>
<div class="page">
  <label class="field field_v1">
    <input class="field__input" placeholder="Just copy the image url" required
    v-model="newPost.picture">
    <span class="field__label-wrap">
      <span class="field__label">Enter a valid image url</span>
    </span>
  </label>
  </div>
 <div class="page">
  <label class="field field_v1">
    <input class="field__input" placeholder="e.g. I'm so good looking " required
    v-model="newPost.text">
    <span class="field__label-wrap">
      <span class="field__label">Enter  a description</span>
    </span>
  </label>
  </div>
<div class="button_cont"><a class="example_c"  target="_blank"
to @click="addPost()">Add post</a>
</div>
</div>
</template>

<script>
import { Api } from '@/Api'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  data() {
    return {
      post: {},
      newPost: {
        text: '',
        picture: '',
        owner: ''
      }
    }
  },
  mounted() {
    console.log(this.post.post)
    this.getUserId()
    this.seedPost()
  },
  methods: {

    getUserId() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.user = decoded
    },

    seedPost() {
      this.newPost.owner = this.user._id
    },

    async addPost() {
      const path = '/users/' + this.user._id + '/posts'
      Api.post(path, this.newPost)
        .then(({ data }) => {
          this.$emit('add-new', data)
          this.newPost.text = ''
          this.newPost.picture = ''
        })
        .catch((err) => console.error(err))
    }
  }

}
</script>
