<template>
  <div>
    <img v-bind:src= "currentUserImage" />
    <div class="mainInfo">
        <span>{{currentUser.name}}</span>
        <span>{{currentUser.lastname}}</span>
        <span>{{age}}</span>
    </div>
    <div class="schoolInfo">
        <span>{{currentUser.university}}</span>
        <span>{{currentUser.city}}</span>
    </div>
    <div class="activities">
        <div id="activitylist" class="demo">
            <span class="attrInfo" v-for="activity in currentUserActivities">
                {{ activity.fields.activity }}
            </span>
        </div>
    </div>

    <div class="music">
        <div id="musiclist" class="demo">
            <span class="attrInfo" v-for="music in currentUserMusic">
                {{ music.fields.genre }}
            </span>
        </div>
    </div>

    <div class="chatbtn">
        <button>CHAT</button>
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


</style>
