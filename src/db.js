
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
          .then((entry)=>{
              console.log(userMusic);
              for(var i = 0; i < userMusic.length; i++){
                  console.log(userMusic[i]);
                if(userMusic[i].checked){
                    console.log('getGenreIDBRA');
                    var gID = this.getGenreId(userMusic[i].name)
                    console.log(gID);
                }
              }
            //console.log(entry);
            //let music = {'en-US':[{sys:{id:"4wcSKrltAI2eao2WIgiais", linkType:'Entry', type: 'Link'}}]};
            let music = {'en-US':[{sys:{id:"4wcSKrltAI2eao2WIgiais", linkType:'Entry', type: 'Link'}}]};
            entry.fields.music = music;
            return entry.update();
            //return null;
          }).then(entry =>{ return entry.publish();})
        })
    },
    updateUserActivities: function(userActivities){
        
    },
    getGenreId: function(name){
        window.contentfulClient.getEntries({
            'content_type': 'music',
            'fields.name': this.name
          })
          .then((entries)=>{
            entries.items.forEach((entry)=>{
                console.log('test');
                console.log(entry);
                return entry.sys.id;

            });
        });
    }
  };