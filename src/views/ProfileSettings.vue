<template>
  <div>
    <div v-if="this.step == 0">
      <h1>Are you a metalhead or a hiphoper?</h1>
      <form      
        id="music_settings"
        @submit.prevent="updateUserMusic"
        novalidate="true">
        <div name="genre" v-for="genre in music">
          <input v-model='genre.checked' type="checkbox" name="genre" :value='genre.name'>{{genre.name}}</input>
        </div>
        <input type="submit" value="Submit">
      </form>
    </div>

    <div  v-if="this.step == 1">
      <h1>What kind of Sports do you like?</h1>
      <form      
        id="activities_settings"
        @submit.prevent="updateUserActivity"
        novalidate="true">

        <div name="activities" v-for="sport in activities">
          <input v-model='sport.checked'  type="checkbox" name="activities" :value='sport.name'>{{sport.name}}</input>
        </div>

        <input type="submit" value="Submit">
      </form>
    </div>

  </div>
</template>



<script>

import cookies from "@/cookies.js";
import db from "@/db.js";

export default {
  name: "profilesettings",
    data: function() {
    return{
      cUserMail: '',
      step:0,
      music: [],
      activities:[]
    }
  },
  mounted: function(){
    this.cUserMail = cookies.getCookie("email");
    this.music = db.getMusicAsArray("music");
    this.activities = db.getActivitiesAsArray("activities");
  },
  methods: {
    nextStep: function (){
      this.step++;
    },
    updateUserMusic: function(){
        db.updateUserMusic(this.music);
    },
    updateUserActivity: function(){

    }
  }
};
</script>