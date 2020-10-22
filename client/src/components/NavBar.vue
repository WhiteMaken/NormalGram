<template>
  <header>
    <div class="max_width">
  <nav role="navigation">
    <div id="menuToggle">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <ul id="menu">
        <a href="/myposts"><li>My Wall</li></a>
        <a href="posts"><li>Posts</li></a>
        <a href="stories"><li>Stories</li></a>
        <a href="userlist"><li>Users</li></a>
        <a href="home" target="_blank"><li>Settings</li></a>
        <a href="home" target="_blank" @click="$emit('sign-out')"><li>Sign out</li></a>
        </ul>
    </div>
</nav>

      <div class="nav_content">
        <router-link to="/home">
        <img src="../assets/normalgram.png" alt="logo">
          <span style="color: #fff"> NormalGram</span>
        </router-link>
        <div class="nav_links">
          <router-link v-if="loggedIn" to="/myposts">My Wall</router-link>
          <router-link v-if="loggedIn" to="/posts">Posts</router-link>
          <router-link v-if="loggedIn" to="/stories">Stories</router-link>
          <router-link v-if="loggedIn" to="/userlist">Users</router-link>
          <router-link v-if="loggedIn" to="/home">Settings</router-link>
          <a href="#" v-if="loggedIn" @click="$emit('sign-out')">Sign out</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'nav-bar',
  props: ['login', 'loggedIn']
}
</script>

<style>

#menuToggle{
  display:none
}

  header {
    background-color: #2F303A;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100 !important;
  }
  header .max_width {
    max-width: 1300px;
    margin-left: auto;
    margin-right: auto;
  }
  header .nav_content {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px;
    padding: 0.666em 0 0.666em 0;
  }
  header .nav_content .nav_links {
    display: flex;
    align-items: center;
  }
  header .nav_content .nav_links > a {
    color: rgb(255, 255, 255);
  }
  header .nav_content .nav_links > a:nth-child(n + 1) {
    margin-right: 30px;
  }

@media(max-width: 768px){

  header .nav_content {
   display:none!important
  }
  #menuToggle
{
  display: block!important;
  position: relative;
  top: 20px;
  left: 30px;
  height: 60px;

  z-index: 1;

  -webkit-user-select: none;
  user-select: none;
}

#menuToggle a
{
  text-decoration: none;
  color: #232323;

  transition: color 0.3s ease;
}

#menuToggle a:hover
{
  color: tomato;
}

#menuToggle input
{
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;

  cursor: pointer;

  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */

  -webkit-touch-callout: none;
}

/*
 * Just a quick hamburger
 */
#menuToggle span
{
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;

  background: #cdcdcd;
  border-radius: 3px;

  z-index: 1;

  transform-origin: 4px 0px;

  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
              opacity 0.55s ease;
}

#menuToggle span:first-child
{
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2)
{
  transform-origin: 0% 100%;
}

/*
 * Transform all the slices of hamburger
 * into a crossmark.
 */
#menuToggle input:checked ~ span
{
  opacity: 1;
  transform: rotate(45deg) translate(-2px, -1px);
  background: #cdcdcd;
}

/*
 * But let's hide the middle one.
 */
#menuToggle input:checked ~ span:nth-last-child(3)
{
  opacity: 0;
  transform: rotate(0deg) scale(0.2, 0.2);
}

/*
 * Ohyeah and the last one should go the other direction
 */
#menuToggle input:checked ~ span:nth-last-child(2)
{
  transform: rotate(-45deg) translate(0, -1px);
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
#menu
{
  position: absolute;
  width: 300px;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;

  background: #2F303A;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */

  transform-origin: 0% 0%;
  transform: translate(-100%, 0);

  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
}

#menu li
{
  padding: 10px 0;
  font-size: 22px;
  color: #cdcdcd;
}

/*
 * And let's slide it in from the left
 */
#menuToggle input:checked ~ ul
{
  transform: none;
}
}

</style>
