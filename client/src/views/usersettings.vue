<template>
  <div>
    <b-jumbotron >
      <b-container >
        <b-row align-h="center" align-v="center" class="mt-4">
          <b-col cols="8" >
            <b-card id="p-1">
              <h1 id="myHeader">Settings</h1>
              <UserSettingsItem/>
              <!-- An element with a unique id -->
               <usersettings />
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
import UserSettingsItem from '../components/UserSettingsItem'
export default {
  components: {
    UserSettingsItem
  }
}
</script>

<style>

body {
    padding-top: 80px;
}

ul {
   padding: 11px 21px;
   list-style-type: none;
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
</style>
