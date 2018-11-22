<template>
    <div class="grid-container full">
        <div class="grid-x warumnidfullbra">
            <div class="cell small-12">
                <div id="map"></div>
            </div>
        </div>
        <div class="fixed_bottom">
             <div class="options_section"> 
                <div id="option_people" v-bind:class="{active: userMode}" class="hCursor map_option" v-on:click="changeMapToPeople"><h2>People</h2></div>
                <div id="option_events"  v-bind:class="{active: !userMode}"  class="hCursor map_option" v-on:click="changeMapToEvents"><h2>Events</h2></div>
                <div class="chatcontainer">
                    <div class="chatbtn">
                        <img src="../assets/white_chat.svg">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import mapstyles from "@/styles.js";
import shared from "@/shared.js";
import cookies from "@/cookies.js";

export default {
  name: "Map",
  props: {
  },
  data: function (){
      return {
          style : {},
          userMode : true,
          userLat : 0,
          userLng : 0,
          markers : []
      }
  },
  methods:{
    changeMap: function () {
        if(this.userMode == true){
          this.style = mapstyles["lighttheme"];
        }else{
          this.style = mapstyles["darktheme"];
        }
        this.map.setOptions({
          styles : this.style
        });
        this.resetData();
        this.displayData();
      },
      getUserPosition: function(first = false){
          if(navigator.geolocation){
              if(first == true){
                    navigator.geolocation.getCurrentPosition(this.showPosition);
              }else{
                    navigator.geolocation.getCurrentPosition(this.updatePosition);
              }
          }else{
            var error = "Geolocation is not supported by this browser.";
          }
      },
      showPosition: function(position){
            var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            // using global variable:
            this.map.panTo(center);
      },
    updatePosition: function(position){
          //update position in database (contentful)

        window.contentfulManagementClient.getSpace('vqa5vjiwaxli')
        .then((space)=>{
          space.getEntry(cookies.getCookie("id"))
          .then(async (entry)=>{
              console.log(entry);
            //let music = {'en-US':[{sys:{id:"4wcSKrltAI2eao2WIgiais", linkType:'Entry', type: 'Link'}}]};
            entry.fields.lat = {'en-US' : position.coords.latitude};
            entry.fields.long = {'en-US' : position.coords.longitude};
            return entry.update();
            //return null;
          }).then(entry =>{ return entry.publish();})
        })
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
                    if(cookies.getCookie("id")==entry.sys.id){
                        iconUrl = require("../assets/meinstandort.png");  
                    }else{
                        if(profileimg){
                            //console.log(profileimg.fields.file.url);
                            profileimg = profileimg.fields.file.url;
                            iconUrl = profileimg;
                        }
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
                marker.id = entry.sys.id;
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
          console.log(this.userMode);
          if(!this.userMode){
              this.userMode = true;

          }
        this.changeMap();
      },
      changeMapToEvents: function(){
          if(this.userMode){
              this.userMode = false;
          }
           this.changeMap();
      },
      updateMapData: function(){
        contentfulClient.getEntries({'content_type': "user"}).then((entries) => {
            entries.items.forEach((entry) => {
                this.markers.forEach(function(marker){
                    if(marker.id == entry.sys.id){
                        marker.setPosition(new google.maps.LatLng(entry.fields.lat, entry.fields.long));
                    }
                });
            })
        })
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

    this.getUserPosition(true);
    this.interval = setInterval(() => this.getUserPosition(), 100000);
    this.interval2 = setInterval(() => this.updateMapData(), 10000);
    if(this.$route.params.pref){
        if(this.$route.params.pref == "people"){
            this.userMode = true;
            this.style = mapstyles["lighttheme"];
        }else if(this.$route.params.pref=="events"){
            this.userMode = false;          
            this.style = mapstyles["darktheme"];
        }
    }
    const options = {
      zoom: 14,
      center: new google.maps.LatLng(this.userLat, this.userLng),
      styles: this.style,
      disableDefaultUI: true
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
        height: 90vh;
        width: 100vw;
        display:inline-block;
    }
</style>

<style lang="scss">
    #map{
        bottom: -20px;
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

    .fixed_bottom{
        position: absolute;
        width:100%;
        bottom: 0;
        background-color: rgba(50,50,50,0.8);
       
        .map_option{
            display: inline-block;
            width: 50%;
            text-transform: uppercase;
            font-weight: 700;
        }
        #option_people{
            &.active{
                color:#e6475f;
            }
        }
        #option_events{
            &.active{
                color:#a06a2c;
            }
        }
        .chatcontainer{
            position: absolute;
            width:100%;
            height: 44px;
            bottom:44px;
            .chatbtn{
                display:inline-block;
                text-align:center;
                width:50px;
                height:50px;
                border-radius: 50%;
                padding: 0px;
                text-align: center;
                text-transform: uppercase;
                transition: 0.5s;
                color: white;
                cursor:pointer;
                margin-top:10px;
                /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
                border-bottom:none;
                /*background-image: linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%);*/
                background-image: linear-gradient(to right, #e6475f 0%, #ef8138 100%);
                img{
                    padding: 10px;
                    }
            }
        }
       
    }
</style>