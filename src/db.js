
import cookies from "@/cookies.js";

export default {
    getMusicAsArray: function() {
        var music = [];
        contentfulClient.getEntries({'content_type': "music"}).then((entries) => {
            entries.items.forEach((entry) => {
                music.push({name:entry.fields.genre, checked:false}) ;
            });
        });
        return music;
    },

    getActivitiesAsArray: function(contentType) {
        var activities = [];
        contentfulClient.getEntries({'content_type': "activities"}).then((entries) => {
            entries.items.forEach((entry) => {
                activities.push({name:entry.fields.activity, checked:false}) ;
            });
        });
        return activities;
    },
    updateUserMusic: function(userMusic){
        window.contentfulManagementClient.getSpace('vqa5vjiwaxli')
        .then((space)=>{
          space.getEntry(cookies.getCookie("id"))
          .then(async (entry)=>{
              
             let music = {'en-US':[]};
              for(var i = 0; i < userMusic.length; i++){
                  //console.log(userMusic[i]);
                if(userMusic[i].checked){
                    //console.log("get Genre with name: "+userMusic[i].name);
                    var gID = await this.getGenreId(userMusic[i].name);
                    music['en-US'].push({sys:{id:gID, linkType:'Entry', type: 'Link'}});
                }
              }
            //let music = {'en-US':[{sys:{id:"4wcSKrltAI2eao2WIgiais", linkType:'Entry', type: 'Link'}}]};
            entry.fields.music = music;
            return entry.update();
            //return null;
          }).then(entry =>{ return entry.publish();})
        })
    },
    updateUserActivities: function(userActivities){
        window.contentfulManagementClient.getSpace('vqa5vjiwaxli')
        .then((space)=>{
          space.getEntry(cookies.getCookie("id"))
          .then(async (entry)=>{
              
             let activities = {'en-US':[]};
              for(var i = 0; i < userActivities.length; i++){
                  //console.log(userMusic[i]);
                if(userActivities[i].checked){
                    //console.log("get Genre with name: "+userActivities[i].name);
                    var gID = await this.getActivityId(userActivities[i].name);
                    activities['en-US'].push({sys:{id:gID, linkType:'Entry', type: 'Link'}});
                }
              }
            //let activities = {'en-US':[{sys:{id:"4wcSKrltAI2eao2WIgiais", linkType:'Entry', type: 'Link'}}]};
            entry.fields.activities = activities;
            return entry.update();
            //return null;
          }).then(entry =>{ return entry.publish();})
        })
    },
    getGenreId: function(name){
        return window.contentfulClient.getEntries({
            'content_type': 'music',
            'fields.genre': name
          })
          .then((entries)=>{
            return entries.items[0].sys.id;
        });
    },

    getActivityId: function(name){
        return window.contentfulClient.getEntries({
            'content_type': 'activities',
            'fields.activity': name
          })
          .then((entries)=>{
            return entries.items[0].sys.id;
        });
    }
  };