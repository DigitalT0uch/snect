<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div class="options_section"> 
      <label class="switch">
        <input v-on:click="changeMap" id="mode_switch" type="checkbox" checked>
        <span class="slider round"></span>
      </label>
      </div>

    <div id="map"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import mapstyles from "@/styles.js";

let style = mapstyles["lighttheme"];

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods:{
      changeMap: function () {
        
        let modeswitch = document.getElementById("mode_switch");
        if(modeswitch.checked){
          style = mapstyles["lighttheme"];
        }else{
          style = mapstyles["darktheme"];
        }
        this.map.setOptions({
          styles : style
        });
      }
  },
  mounted: function(){
    const element = document.getElementById("map")
    const options = {
        zoom: 14,
        center: new google.maps.LatLng(47.071467, 8.277621),
        styles: style
    }
    this.map = new google.maps.Map(element, options);


    /*************************** Start Markers ***************************/


    let marker = new google.maps.Marker({
        position: {lat: 47.055193, lng: 8.317648},
        icon: 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-rating-icon.png',
        map: this.map
    });

    marker.setMap(this.map);


    const contentString = `<div>
      <h1>Casineum, Grand Casino Luzern</h1>
      <h2>Partey</h2>
      <div>Gits eine?</div> 
    </div>`;

    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', event => {
      infowindow.open(this.map, marker);
    }); 

    /***************************  END Markers  ***************************/

  }
};


</script>

<style scoped lang="scss">

#map {
  height: 80vh;
  width: 80vw;
  display:inline-block;
}

.options_section{
  display:block;
  width:100%;
  margin-top:40px;
  margin-bottom:40px;
}

</style>

