<template>
    <div>
        <div class="container">

            <header>
                <h1>v-lightbox</h1>
                <h4>Lightbox Photo Grid and Slideshow component for Vue.Js</h4>
            </header>

            <div class="row my-30">
                <div class="col-12 col-lg-8">
                    <lightbox :items="images"></lightbox>
                    <div class="form-group">
                        Photo of Chloe Ting
                    </div>

                </div>
                <div class="col-12 col-lg-4">
                    <div class="viralroll" data-id="5e8d2bb73364491e2a946eec"></div>
                </div>
            </div>

        </div>

        <footer>

            <p>
                <a class="social-icon" href="https://github.com/Morioh-Lab/v-lightbox" target="_blank">
                    <i class="fa-3x fab fa-github-square"></i>
                </a>

            </p>

            <p>Themed by <a href="http://on.morioh.net/96d5d36367" target="_blank">Morioh Theme</a><br>
                <a href="https://morioh.com">Social Network for Developers</a>
            </p>

        </footer>

    </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg',
        './nice.jpg'
      ]
    }
  }
}
</script>
