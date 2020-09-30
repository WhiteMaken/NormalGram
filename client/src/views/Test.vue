<template>
    <div id="app">
        <ul id="example-1">
  <li v-for="picture in images.pictures" :key="picture._id">
      {{picture.picture_url}}
      <img :src="picture.picture_url"/>
      <div>
        <b-button to @click="deletePicture(picture._id)" variant=danger>Delete Picture</b-button>
        </div>
  </li>
</ul>
    </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      images: []
    }
  },
  methods: {

    read() {
      Api.get('/pictures').then(({ data }) => {
        console.log(data)
        this.images = data
      })
        .catch((err) => console.error(err))
    },

    async deletePicture(id) {
      const path = '/pictures/' + id
      Api.delete(path)
    }
  },

  mounted() {
    this.read()
  }

}
</script>

<style lang="css">
</style>
