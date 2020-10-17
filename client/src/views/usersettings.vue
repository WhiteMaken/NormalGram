<template>
  <div>
    <b-jumbotron >
      <b-container >
        <b-row align-h="center" align-v="center" class="mt-4">
          <b-col cols="8" >
            <b-card id="p-1">
              <div id="usersettings"/>
              <!-- An element with a unique id -->
              <h1 id="myHeader">Settings</h1>
               <usersettings />
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
import usersettings from '../components/usersettings'
export default {
  components: {
    usersettings
  }
}
</script>

<style>
  .p-1 {
    padding-right: 5rem;
    background-color: lightblue
  }
  b-container{
  background-color: lightblue
  }
body {
  background-color: lightblue
}
/* Style the element with the id "myHeader" */
#myHeader{
  color: white;
  background-color: #2F303A;
}
.action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
img {
border: 3px groove rgb(26, 0, 143);
}
</style>
