<template>
    <div>
        <div class="options_section"> 
        <label class="switch">
            <input v-on:click="changeMap" v-model="userMode" id="mode_switch" type="checkbox">
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
          userMode : true,
          userLat : 0,
          userLng : 0,
          markers : []
      }
  },
  methods:{
    changeMap: function () {
        this.userMode = !this.userMode;
        if(this.userMode){
          style = mapstyles["lighttheme"];
        }else{
          style = mapstyles["darktheme"];
        }
        this.map.setOptions({
          styles : style
        });
        this.resetData();
        this.displayData();
      },
      updateUserPosition: function(){
          if(navigator.geolocation){
            var userPosition = navigator.geolocation.getCurrentPosition(this.showPosition);
          }else{
            var error = "Geolocation is not supported by this browser.";
          }
      },
      showPosition: function(position){
            var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // using global variable:
            this.map.panTo(center);
      },
      displayData: function(){
            let mapPref = this.map;
            var contentType = "";
            if(this.userMode){
                contentType = "user";
            }else{
                contentType = "events";
            }
           contentfulClient.getEntries({'content_type': contentType}).then((entries) => {
            entries.items.forEach((entry) => {
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
                if(this.userMode){
                    var profileimg = entry.fields.profileImage;
                    if(profileimg){
                        console.log(profileimg.fields.file.url);
                        profileimg = profileimg.fields.file.url;
                        
                    }
                }
                let latCord = entry.fields.lat;
                let lngCord = entry.fields.long;

                let marker = new google.maps.Marker({
                position: { lat: latCord, lng: lngCord },
                    icon: iconUrl,
                    map: mapPref
                });
                this.markers.push(marker);
                this.markers[this.markers.length -1].setMap(mapPref);
                let contentString ="";
                if(this.userMode){
                     contentString = `<div class="markerbox">
                     <img class="profileimg" src="`+profileimg+`" />
                        <h1>` + entry.fields.name +` ` + entry.fields.lastname + `</h1>
                        <p>` +entry.fields.birthday+   `</p> 
                        <p>` +entry.fields.university+ ` ` + entry.fields.city +  `</p> 
                    </div>`;
                }else{
                    contentString =
                    `<div>
                        <h1>` + entry.fields.eventName + `</h1>
                        <p>` +  entry.fields.descriptions + `</p> 
                    </div>`;
                }

                let infowindow = new google.maps.InfoWindow({
                content: contentString
                });

                marker.addListener("click", event => {
                    infowindow.open(mapPref, marker);
                });

                /***************************  END Markers  ***************************/
            });
        });
      },
      resetData: function(){

            this.markers.forEach(function(marker) {
                marker.setMap(null);
            });
            this.markers = [];
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

<style lang="scss">
    #map{
        .profileimg{
            border-radius: 50%;
            max-width:200px;
        }
    }
</style>