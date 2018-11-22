<template>
    <div class="grid-container full preferences">

       <h1>What are <br> you up to? </br></h1>


      <div class="grid-x warumnidfullbra">
        <div class="cell small-10 small-offset-1">
          <div class="container container-first">
              <div class="activities activities_checked" name="activity" v-for="activity in currentActivities">
                <div class="select" v-on:click="deselectActivity(activity)">{{activity.fields.activity}}</div>
              </div>
          </div>
        </div>
      </div>
   
   <div class="grid-x">
      <div class="cell small-10 small-offset-1">
        <div class="container">
          <div class="activities " name="activity" v-for="activity in userActivities">
            <div class="select" v-if="activity.show" v-on:click="selectActivity(activity)" >{{activity.fields.activity}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-x">
      <div class="cell small-10 small-offset-1">
        <div class="container">
          <div class="music music_checked" v-for="genre in currentMusic">
            <div class="select" v-on:click="deselectMusic(genre)">{{genre.fields.genre}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-x">
      <div class="cell small-10 small-offset-1">
        <div class="container">
          <div class="music" v-for="genre in userMusic">
            <div class="select" v-if="genre.show" v-on:click="selectMusic(genre)" >{{genre.fields.genre}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-x">
      <div class="cell small-10 small-offset-1">
        <p>
          <input v-on:click="savePreferences" class="submitbtn" type="submit" value="Submit">
        </p>
      </div>
    </div>  
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
      userActivities: [],
      currentActivities: [],
      userMusic: [],
      currentMusic: []
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
            entry.fields.activities.forEach((activity)=>{
              activity.show = true;
              this.userActivities.push(activity);
            })
            entry.fields.music.forEach((genre)=>{
              genre.show = true;
              this.userMusic.push(genre);
            })
          })
        }).catch();
    },
    selectActivity: function(activity){
      this.userActivities.forEach((cactivity)=>{
        if(cactivity.fields.activity == activity.fields.activity){
          cactivity.show = false;
        }
      })
      this.currentActivities.push(activity)
    },
    deselectActivity: function(activity){
      this.userActivities.forEach((cactivity)=>{
        if(cactivity.fields.activity == activity.fields.activity){
          cactivity.show = true;
        }
      })
      this.currentActivities.pop(activity)
    },
    selectMusic: function(genre){
      this.userMusic.forEach((cMusic)=>{
        console.log(cMusic);
        if(cMusic.fields.genre == genre.fields.genre){
          cMusic.show = false;
        }
      })
      this.currentMusic.push(genre);
    },
    deselectMusic: function(genre){
      this.userMusic.forEach((cgenre)=>{
        if(cgenre.fields.genre == genre.fields.genre){
          cgenre.show = true;
        }
      })
      this.currentMusic.pop(genre)
    },
    savePreferences: function(){
      this.$router.push("/map/user");
    }
  }
};


</script>

<style scoped lang="scss">

.container{
  margin:10px;
  width: 100%;
  &.container-first{
    margin-top:50px;
  }
}
  .activities{
    display:inline-flex;
    margin: 1px 6px 0px 0px;
    float: left;
    cursor:pointer;
    .select{
      padding: 5px;
      padding-left:8px;
      padding-right:8px;
      border: 1px solid white;
    }
    &.activities_checked{
      border: none;
      .select{
        background-image: linear-gradient(to right, #e6475f 0%, #ef8138 51%, #e6475f 100%);
        background-size: 200% auto;
        &:hover{
          background-position: right center; /* change the direction of the change here */
        }
      }
    }
  }
  
  .music{
    display:inline-flex;
    margin: 5px;
    margin-left: 0;
    float: left;
    cursor:pointer;
    .select{
      padding: 5px;
      padding-left:8px;
      padding-right:8px;
      border: 1px solid white;
    }
    &.music_checked{
      border: none;
      .select{
        background-image: linear-gradient(to right, #e6475f 0%, #ef8138 51%, #e6475f 100%);
        background-size: 200% auto;
        &:hover{
          background-position: right center; /* change the direction of the change here */
        }
      }
    }
  }
  .select{
    display:inline-flex;
    border-radius: 30px;
  }

  .submitbtn{
    margin-top: 120px;
  }

</style>

