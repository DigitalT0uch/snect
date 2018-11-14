<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Map />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Map from "@/components/Map.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    Map
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

