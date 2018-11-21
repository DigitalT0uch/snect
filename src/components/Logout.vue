<template>
    <div id="logout">
        <button v-if="this.cUserEmail != ''" v-on:click="logout">Logout</button>
    </div>
</template>



<script>

import cookies from "@/cookies.js";

export default {
  name: "Logout",
    data: function() {
    return{
      cUserName : "",
      cUserLastName : "",
      cUserEmail : ""
    }
  },
  mounted: function(){
      this.cUserEmail = cookies.getCookie("email");
  },
  methods: {
      logout: function(){
        cookies.deleteCookie("email");
        cookies.deleteCookie("name");
        cookies.deleteCookie("lastname");
        this.$router.push("/");
      }
  }
};
</script>