<template>
  <div class="home">
    <Logout />
    <img class="logo" alt="Snect logo" src="../assets/snect_logo.svg">
    <p> Email: {{cUserEmail}} </p>
    <Map />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Map from "@/components/Map.vue";
import Logout from "@/components/Logout.vue";
import cookies from "@/cookies.js";

export default {
  name: "home",
  components: {
    HelloWorld,
    Map,
    Logout
  },
  mounted: function(){
    this.cUserName = cookies.getCookie("name");
    this.cUserLastName = cookies.getCookie("lastname");
    this.cUserEmail = cookies.getCookie("email");
  },
  data: function() {
    return{
      cUserName : "",
      cUserLastName : "",
      cUserEmail : "",
    }
  },
  methods:{

  }
};


</script>

<style scoped lang="scss">

.options_section{
  display:block;
  width:100%;
  margin-top:40px;
  margin-bottom:40px;
}

</style>

