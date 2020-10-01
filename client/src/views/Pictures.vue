<template>
    <div id="app">
        <input
            type="newPicture"
            id="input1"
            class="form-control mb-5"
            placeholder="Enter url of a picture to add a new picture"
            v-model="picture.picture_url"
            required
          />
        <div>
        <b-button to @click="postPicture(); reloadPage()" variant=success>Post Picture</b-button>
        </div>
        <ul id="example-1">
  <li v-for="picture in images.pictures" :key="picture._id">
      <div>
      <img :src="picture.picture_url"/>
      </div>
      <input
            type="newPicture"
            id="newPicture"
            class="form-control mb-5"
            placeholder="Enter url of a picture to replace the picture above"
            v-model="picturemodifier.picture_url"
            required
          />
        <b-button to @click="patchPicture(picture._id); reloadPage()" variant=warning>Patch Picture</b-button>
        <b-button to @click="deletePicture(picture._id); reloadPage()" variant=danger>Delete Picture</b-button>
  </li>
</ul>
    </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      images: [],
      picture: {
        picture_url: ''
      },
      picturemodifier: {
        picture_url: ''
      }
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
    },

    async postPicture() {
      const path = '/pictures/'
      Api.post(path, this.picture)
    },

    async patchPicture(id) {
      const path = '/pictures/' + id
      Api.patch(path, this.picturemodifier)
    },

    reloadPage() {
      window.location.reload()
    }
  },

  mounted() {
    this.read()
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

button{
margin-top: 1em;
margin-bottom: 1em;
margin-right: 3em;
}

img {
border: 3px groove rgb(26, 0, 143);
}
</style>
