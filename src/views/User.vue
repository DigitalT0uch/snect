<template>
  <div>
      <div class="grid-container full">
          <div class="grid-x warumnidfullbra">
            <div class="cell small-6 small-offset-3"> 
                <img v-bind:src= "currentUserImage" class="roundImage profileimage"/>  
            </div>
         </div>
    <div class="grid-x">
        <div class="cell small-10 small-offset-1">
            <div class="mainInfo">
                <h1> {{currentUser.name}}</h1>
            </div>
        </div>
    </div>

    



    <div class="grid-x">
        <div class="cell small-10 small-offset-1">
            <div class="courseOfStudies">
                <h3> {{currentUser.courseOfStudies}} </h3>
            </div>
            <div class="schoolInfo">
                <h3>{{currentUser.university}} </h3>
             </div>
        </div>
    
    </div>
    <div class="activities">
        <div id="activitylist" class="demo">
            <div class="attrInfo" v-for="activity in currentUserActivities">
              <h3>  {{ activity.fields.activity }}</h3>
            </div>
        </div>
    </div>

    <div class="music">
        <div id="musiclist" class="demo">
            <div class="attrInfo" v-for="music in currentUserMusic">
               <h3>   {{ music.fields.genre }}</h3>  
            </div>
        </div>
    </div>


<div class="grid-x">
        <div class="cell small-2 small-offset-5 chat">
        <div class="chatbtn">
            <img src="../assets/white_chat.svg">
        </div>
    </div><!--end container-->
  </div>
  </div>
    </div>
</template>



<script>

import cookies from "@/cookies.js";
import shared from "@/shared.js";

export default {
    name: "user",
    data: function() {
        return{
            users : shared.users,
            id : this.$route.params.id,
            currentUser: {},
            currentUserImage: '',
            age: '',
            currentUserActivities: [],
            currentUserMusic: []
        }
    },
    mounted: function(){
        this.currentUser = this.users[this.id].fields;
        this.currentUserImage = this.currentUser.profileImage.fields.file.url;
        this.age = this.calcAge(new Date(this.currentUser.birthday));
        this.currentUserActivities = this.currentUser.activities;
        this.currentUserMusic = this.currentUser.music;
        console.log(this.currentUserMusic);
    },
    methods: {
        calcAge: function(birthday){
            // birthday is a date
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    }
};
</script>

<style scoped lang="scss">
.mainInfo{
    h2{
        margin-bottom: 0px;
    }
}
.roundImage{
    border-radius: 50%;
    }
.profileimage{
        margin-top: 75px;
        margin-bottom: 8px;
    }
.courseOfStudies{
    h3{
        margin-top: 0px;
        margin-bottom: 0px;
    }
}
.schoolInfo{
    h3 {
        margin-top: 0px;
        margin-bottom: 10px;
    }
}

.attrInfo{
margin: 4px 3px;
    display:inline-flex;
  flex: 1 1 auto;
  padding:7px;
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  cursor:pointer;
/* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
  border:none;
  border-radius: 30px;
  border:1px solid white;
    h3{
        margin:0;
    }
}

.chatbtn{
    
       border-radius: 50%;
       flex: 1 1 auto;
        margin-top: 95px;
        padding: 0px;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        img{padding: 15px;}
        color: white;
      /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
        border-bottom:none;
 
        /*background-image: linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%);*/
        background-image: linear-gradient(to right, #e6475f 0%, #ef8138 51%, #e6475f 100%);

        &:hover{
          background-position: right center; /* change the direction of the change here */
        }
}

</style>
