<template>
    <div>
        <div class="grid-container full">
            <div class="grid-x warumnidfullbra">
                <div class="cell small-6 small-offset-3"> 
                    <img v-bind:src= "currentEventImage" class="roundImage profileimage"/>  
                </div>
            </div>
            <div class="grid-x">
                <div class="cell small-10 small-offset-1">
                    <div class="mainInfo">
                        <h1> {{currentEvent.eventName}}</h1>
                        <p>{{date}}</p>
                        <p>{{enddate}}</p>
                    </div>
                </div>
            </div>

            <div class="grid-x">
                <div class="cell small-10 small-offset-1">
                    <div class="description">
                        <h3> {{currentEvent.descriptions}} </h3>
                    </div>
                </div>
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
            events : shared.events,
            id : this.$route.params.id,
            currentEvent: {},
            currentEventImage: '',
            date: '',
            enddate:'',
            description: ''
        }
    },
    mounted: function(){
        console.log(this.events);
        this.currentEvent = this.events[this.id].fields;
        this.currentEventImage = this.currentEvent.flyer.fields.file.url;
        this.date = new Date(this.events[this.id].fields.dateTime);
        var month = this.date.getUTCMonth() + 1; //months from 1-12
        var day = this.date.getUTCDate();
        var year = this.date.getUTCFullYear();
        var hours = this.date.getHours();
        var minutes = this.date.getMinutes();
        this.date = day+"."+month+"."+year+" "+hours+":"+minutes;

    },
    methods: {
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
