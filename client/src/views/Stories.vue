<template>
  <div class="container">
  <b-container>
      <b-row align-h="center" align-v="center" class="mt-3">
  <h>My stories</h>
  <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
  >      <b-carousel-slide
            v-for="image in stories"
            :key="image"
            :img-src="'data:image/jpeg;base64,'+image.image"
          >
      </b-carousel-slide>
      </b-carousel>
          </b-row>
    </b-container>
<form @submit.prevent="sendFile"  enctype="multipart/form-data">
    <div class="field">
        <label for="file" class="label">Upload picture</label>
        <input
            type="file"
            ref="file"
            accept="image/*"
            @change="selectFile"
            />
    </div>
    <div class="field">
      <button class="button is-info">Send</button>
    </div>
       </form>
       <b-button to @click="deleteStories(); reloadPage()" variant=danger>Delete All Stories</b-button>
        <b-container>
      <b-row align-h="center" align-v="center" class="mt-3">
        <h>Other's stories</h>
  <b-carousel
      id="carousel-2"
      v-model="slide2"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideTwoStart"
      @sliding-end="onSlideTwoEnd"
  >      <b-carousel-slide
            v-for="image in allStories.stories"
            :key="image"
            :img-src="'data:image/jpeg;base64,'+image.image"
          >
      </b-carousel-slide>
      </b-carousel>
          </b-row>
    </b-container>
  </div>

</template>

<script>
import { Api } from '@/Api'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data() {
    return {
      users: [],
      stories: [],
      slide: 0,
      sliding: null,
      slide2: 0,
      sliding2: null,
      file: '',
      allStories: [],
      story: {
        contentType: '',
        image: '',
        path: ''
      }
    }
  },

  methods: {
    read() {
      Api.get('/stories/' + this.user._id).then(({ data }) => {
        console.log(data)
        this.stories = data
      })
        .catch((err) => console.error(err))
    },
    selectFile() {
      this.file = this.$refs.file.files[0]
    },
    getUserId() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.user = decoded
    },
    async sendFile() {
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await Api.post('/stories/' + this.user._id, formData)
      } catch (err) {
        console.log(err)
      } finally { window.location.reload() }
    },
    getAllStories() {
      const path = '/stories'
      Api.get(path).then(({ data }) => {
        console.log(data)
        this.allStories = data
      })
        .catch((err) => console.error(err))
    },
    reloadPage() {
      window.location.reload()
    },
    async deleteStories() {
      const path = '/stories/' + this.user._id
      Api.delete(path)
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideTwoStart(slide2) {
      this.sliding2 = true
    },
    getAllUser() {
      const path = '/users'
      Api.get(path).then(({ data }) => {
        console.log(data)
        this.users = data
      })
        .catch((err) => console.error(err))
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    onSlideTwoEnd(slide2) {
      this.sliding2 = false
    }

  },
  mounted() {
    this.getAllUser()
    this.getUserId()
    this.read()
    this.getAllStories()
  }
}
</script>
<style scoped>
.carousel .responsive{
  width:250px;
  height:360px;
}
</style>
