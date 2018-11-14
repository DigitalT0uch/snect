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


  const element = document.getElementById("map");
  const options = {
      zoom: 14,
      center: new google.maps.LatLng(47.071467, 8.277621),
      styles: style
  }
  this.map = new google.maps.Map(element, options);
  let mapPref = this.map;


    contentfulClient.getEntries()
    .then(function (entries){

      entries.items.forEach(function (entry) {
        console.log(entry.fields);  
          /*************************** Start Markers ***************************/
          let iconUrl ="";
          switch(entry.fields["iconType"]){
            case "event":
              iconUrl = 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-rating-icon.png';
              break;
            case "default":
              break;
          }

          let latCord = entry.fields.lat;
          let lngCord = entry.fields.long;

          let marker = new google.maps.Marker({
              position: {lat: latCord, lng: lngCord},
              icon: iconUrl,
              map: mapPref
          });

          marker.setMap(mapPref);


          const contentString = `<div>
            <h1>`+entry.fields.eventName+`</h1>
            <div>`+entry.fields.descriptions+`</div> 
          </div>`;

          let infowindow = new google.maps.InfoWindow({
            content: contentString
          });

          marker.addListener('click', event => {
            infowindow.open(mapPref, marker);
          }); 

          /***************************  END Markers  ***************************/


      });

    });
   

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

