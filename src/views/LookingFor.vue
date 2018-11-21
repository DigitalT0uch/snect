<template>
  <div class="lookingfor">
    <h1>Hi, {{cUserName}} {{cUserLastName}}</h1>
    <h2>What are you looking for?</h2>
    <button @click="goToPeople">People</button>
    <button @click="goToEvents">Events</button>
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

</style>
