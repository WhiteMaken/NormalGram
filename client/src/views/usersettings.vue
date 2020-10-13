<template>
  <div>
    <b-jumbotron >
      <b-container >
        <b-row align-h="center" align-v="center" class="mt-4">
          <b-col cols="8" >
            <b-card class="p-1">
              <div class="usersettings"/>
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
