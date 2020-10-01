<template>
  <div id="app">
    <div id="nav">
      <div>
      <router-link to="/">Home</router-link>
      </div>
      <div>
    <router-link to="/">Signup</router-link>
    </div>
    <div>
    <router-link to="/pictures">Pictures</router-link>
    </div>
    <router-view/>
    </div>
  </div>
</template>
