<template>
    <div id="app">
        <ul id="example-1">
  <li v-for="story in stories.docs" :key="story._id">
      <div>
      <img v-bind:src="'data:image/jpeg;base64,'+story.image" />
      </div>
      <div>
      {{story.likes}}
      </div>
      <input
            type="newPicture"
            id="input"
            class="form-control mb-5"
            placeholder="Enter new number of likes"
            v-model="storymodifier.likes"
            required
          />
          <b-button to @click="putStory(story._id); reloadPage()" variant=warning>Put Story</b-button>
  </li>
</ul>
<b-button to @click="deleteStories(); reloadPage()" variant=danger>Delete All Stories</b-button>
        <form @submit.prevent="sendFile"  enctype="multipart/form-data">

    <div class="field">
        <label for="file" class="label">Upload File</label>
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
    <b-button href ='/home' type="home" variant="secondary">Home</b-button>
    </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      stories: {},
      storymodifier: {
        likes: '',
        lifespan: '2023-09-10T18:25:43.511Z'
      },
      file: ''
    }
  },
  computed: {
    myImage() {
      return `data:image/png;base64, ${this.stories}`
    }
  },
  methods: {

    read() {
      Api.get('/stories').then(({ data }) => {
        console.log(data)
        this.stories = data
      })
        .catch((err) => console.error(err))
    },

    async deleteStories() {
      const path = '/stories/'
      Api.delete(path)
    },
    selectFile() {
      this.file = this.$refs.file.files[0]
    },
    async sendFile() {
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await Api.post('/stories', formData)
      } catch (err) {
        console.log(err)
      } finally { window.location.reload() }
    },

    async putStory(id) {
      const path = '/stories/' + id
      Api.put(path, this.storymodifier)
    },

    reloadPage() {
      window.location.reload()
    },
    loadImage() {
      Api.get('/stories').then(({ result }) => {
        console.log(result)
        this.stories = result
      })
        .catch((err) => console.error(err))
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
