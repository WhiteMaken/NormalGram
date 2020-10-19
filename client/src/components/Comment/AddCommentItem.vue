<template>
<div>
 <div class="page">
  <label class="field field_v1">
    <input class="field__input" placeholder="e.g. I'm so good looking " required
    v-model="newComment.text">
    <span class="field__label-wrap">
      <span class="field__label">Enter  a comment</span>
    </span>
  </label>
  </div>
<div class="button_cont"><a class="example_c"  target="_blank"
to @click="addComment()">Add comment</a>
</div>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      newComment: {
        text: '',
        owner: ''
      }
    }
  },
  props: ['user'],
  mounted() {
    this.seedComment()
  },
  methods: {

    seedComment() {
      this.newComment.owner = this.user._id
    },

    async addComment() {
      console.log(this.user)
      const path = '/users/' + this.user.user._id + '/comments'
      Api.post(path, this.newComment)
        .then(({ data }) => {
          this.$emit('add-new', data)
          this.newComment.text = ''
        })
        .catch((err) => console.error(err))
    }
  }

}
</script>
