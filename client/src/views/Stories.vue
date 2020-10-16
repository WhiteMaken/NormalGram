<template>
    <div id="app">
        <ul id="example-1">
  <li v-for="story in stories.docs" :key="story._id">
      <div>
      {{story._id}}
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

    <b-button href ='/home' type="home" variant="secondary">Home</b-button>
    </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      stories: [],
      storymodifier: {
        likes: '',
        lifespan: '2023-09-10T18:25:43.511Z'
      }
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

    async putStory(id) {
      const path = '/stories/' + id
      Api.put(path, this.storymodifier)
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
