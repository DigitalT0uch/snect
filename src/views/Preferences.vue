<template>
  <div class="preferences">


      <div class="activities" name="activity" v-for="activity in userActivities">
        <input type="checkbox" name="genre" >{{activity.fields.activity}}</input>
      </div>



    <div class="music" name="music" v-for="genre in userMusic">
      <input type="checkbox" name="music" >{{genre.fields.genre}}</input>
    </div>
    <p>
      <input class="submitbtn" type="submit" value="Submit">
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import cookies from "@/cookies.js";

export default {
  name: "preferences",
  components: {
  },
  mounted: function(){
    this.cUserId = cookies.getCookie("id");
    this.cUserName = cookies.getCookie("name");
    this.cUserLastName = cookies.getCookie("lastname");
    this.cUserEmail = cookies.getCookie("email");
    this.getUserData();
  },
  data: function() {
    return{
      cUserName : "",
      cUserLastName : "",
      cUserEmail : "",
      userActivities: "",
      userMusic: ""
    }
  },
  methods:{
    getUserData: function(){
        contentfulClient.getEntries({
          'content_type': 'user',
          'sys.id': this.cUserId
        })
        .then((entries)=>{
          entries.items.forEach((entry)=>{
            this.userActivities = entry.fields.activities;
            this.userMusic = entry.fields.music;
          })
        }).catch();
    }
  }
};


</script>

<style scoped lang="scss">


</style>

