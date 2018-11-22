<template>
  <div class="lookingfor">
    <div class="grid-container full">
            <div class="grid-x warumnidfullbra">
           <div class="cell small-10 small-offset-1">
             </div>
             </div>
             </div>
    <h1>Are you bored <br> or lonely? </br></h1>
    <button class="submitbtn" @click="goToPeople">Find People</button>
    <button class="submitbtn" @click="goToEvents">Find Events</button>
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
      this.$router.push("/map/people");
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
     .warumnidfullbra{
      width: 100%;
      }

</style>
