<template>
  <div class="lookingfor">
    <h1>What are you <br> looking for? </br></h1>
    <button class="submitbtn" @click="goToPeople">People</button>
    <button class="submitbtn" @click="goToEvents">Events</button>
  </div>
</template>

<script>
// @ is an alias to /src
import cookies from "@/cookies.js";

export default {
  name: "lookingfor",
  components: {
  },
   data:function (){
      return {
        cUserName : '',
        cUserLastName : '',
        cUserEmail : ''
      }

  },
  mounted: function(){
    this.cUserName = cookies.getCookie("name");
    this.cUserLastName = cookies.getCookie("lastname");
    this.cUserEmail = cookies.getCookie("email");
  },
  methods: {
    goToPeople: function(){
      console.log('function call people');
      this.$router.push("/preferences");
    },
    goToEvents: function(){
      console.log('function call events');
      this.$router.push("/map/events");
    }
  }
};
</script>

<style scoped lang="scss">

.lookingfor{
  h1{
  
    margin-bottom: 200px;}
}

</style>
