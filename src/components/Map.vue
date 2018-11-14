<template>
    <div>
        <div class="options_section"> 
        <label class="switch">
            <input v-on:click="changeMap" v-model="checked" id="mode_switch" type="checkbox">
            <span class="slider round"></span>
        </label>
        </div>
        <div id="map"></div>
    </div>
</template>


<script>

import mapstyles from "@/styles.js";

let style = mapstyles["lighttheme"];

export default {
  name: "Map",
  props: {
  },
  data: function (){
      return {
          checked : true,
          userLat : 0,
          userLng : 0
      }
  },
  methods:{
    changeMap: function () {
        this.checked = !this.checked;
        if(this.checked){
          style = mapstyles["lighttheme"];
        }else{
          style = mapstyles["darktheme"];
        }
        this.map.setOptions({
          styles : style
        });
      },
      updateUserPosition: function(){
          if(navigator.geolocation){
            var userPosition = navigator.geolocation.getCurrentPosition(this.showPosition);
          }else{
            var error = "Geolocation is not supported by this browser.";
          }
      },
      showPosition: function(position){
          console.log("showposition: ");
            var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // using global variable:
            this.map.panTo(center);
      },
      displayData: function(){
          
            let mapPref = this.map;
           contentfulClient.getEntries().then(function(entries) {
            entries.items.forEach(function(entry) {
                console.log(entry.fields);
                /*************************** Start Markers ***************************/
                let iconUrl = "";
                switch (entry.fields["iconType"]) {
                case "event":
                    iconUrl =
                    "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-rating-icon.png";
                    break;
                case "default":
                    break;
                }

                let latCord = entry.fields.lat;
                let lngCord = entry.fields.long;

                let marker = new google.maps.Marker({
                position: { lat: latCord, lng: lngCord },
                icon: iconUrl,
                map: mapPref
                });

                marker.setMap(mapPref);

                const contentString =
                `<div>
                    <h1>` + entry.fields.eventName + `</h1>
                    <p>` +  entry.fields.descriptions + `</p> 
                </div>`;

                let infowindow = new google.maps.InfoWindow({
                content: contentString
                });

                marker.addListener("click", event => {
                    infowindow.open(mapPref, marker);
                });

                /***************************  END Markers  ***************************/
            });
        });
      }
  },
  mounted: function() {
    const element = document.getElementById("map");

    this.updateUserPosition();

    const options = {
      zoom: 14,
      center: new google.maps.LatLng(this.userLat, this.userLng),
      styles: style
    };

    this.map = new google.maps.Map(element, options);

    //this function needs to be somewhere else. firefox can't display the data.
    this.displayData();
  }
};
</script>

<style scoped lang="scss">
    #map {
    height: 80vh;
    width: 80vw;
    display:inline-block;
    }
</style>