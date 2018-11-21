<template>
    <div>
        <div class="options_section"> 

        </div>
        <div id="map"></div>
            <div v-on:click="changeMapToPeople">People</div>
            <div v-on:click="changeMapToEvents">Events</div>

    </div>
</template>


<script>

import mapstyles from "@/styles.js";
import shared from "@/shared.js";

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
        if(this.userMode == true){
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
                        //console.log(profileimg.fields.file.url);
                        profileimg = profileimg.fields.file.url;
                        iconUrl = profileimg;
                    }
                }
                let latCord = entry.fields.lat;
                let lngCord = entry.fields.long;

                let marker = new google.maps.Marker({
                    position: { lat: latCord, lng: lngCord },
                        icon: {
                            url: iconUrl,
                            scaledSize: new google.maps.Size(64, 64)
                            },
                        map: mapPref,
                        optimized: false
                    });
                this.markers.push(marker);
                //this.markers[this.markers.length -1].setMap(mapPref);
                let contentString ="";
                if(this.userMode){
                    shared.users[entry.sys.id]=
                    {
                        profileimg: profileimg,
                        fields:  entry.fields
                    };
                    
                    marker.addListener("click", event => {
                        this.$router.push("/user/"+entry.sys.id);
                    });
                }else{
                     shared.events[entry.sys.id]=
                    {
                        profileimg: profileimg,
                        fields:  entry.fields
                    };
                    marker.addListener("click", event => {
                        this.$router.push("/events/"+entry.sys.id);
                    });
                }


                /***************************  END Markers  ***************************/
            });
        });
        
      },
      changeMapToPeople: function(){
          if(!this.userMode){
              this.userMode = true;
              this.changeMap();
          }
      },
      changeMapToEvents: function(){
          if(this.userMode){
              this.userMode = false;
              this.changeMap();
          }
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
    let style;
    if(this.$route.params.pref){
        if(this.$route.params.pref == "people"){
            this.userMode = true;
            style = mapstyles["lighttheme"];
        }else if(this.$route.params.pref=="events"){
            this.userMode = false;          
            style = mapstyles["darktheme"];
        }
    }
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(this.userLat, this.userLng),
      styles: style
    };

    this.map = new google.maps.Map(element, options);

    var myoverlay = new google.maps.OverlayView();
        myoverlay.draw = function () {
            this.getPanes().markerLayer.id='markerLayer';
        };
        myoverlay.setMap(this.map);

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
        .location img {
           border-radius:10px;
        }
        #markerLayer img {
           border-radius:30px;
        }
    }
</style>