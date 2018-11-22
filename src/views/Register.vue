<template>
  <div class="register">
     <div class="grid-container full">

          <div class="grid-x warumnidfullbra">
           <div class="cell small-10 small-offset-1">
              <form
                id="register"
                @submit.prevent="checkForm"
                novalidate="true"
              >

                <p v-if="errors.length" id="errors">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p> 

                <p>
                  <input id="profileimage" type="file" name="profileimage" @change="displayImage" >
                </p>
                <img :src="imgSrc">

                <p>
                  <input id="name" v-model="name" type="text" name="name" placeholder="Name" >
                </p>
                
                <p>
                  <input id="email" v-model="email" type="email" name="email"  placeholder="Email">
                </p>

                
                <p>
                  <input id="university" v-model="university" type="text" name="university"  placeholder="University">
                </p>

                <p>
                  <input id="courseOfStudies" v-model="courseOfStudies" type="text" name="courseOfStudies"  placeholder="Course of Studies">
                </p>


                <p>
                  <input id="password" v-model="password" type="password" name="password"  placeholder="Password">
                </p>


                  <p>
                  <input class="submitbtn" type="submit" value="Continue">
                  </p>
              </form>
            </div>
          </div>
     </div>
  </div>
</template>

<script>
// @ is an alias to /src
import cookies from "@/cookies.js";

export default {
  name: "register",
  components: {
  },
   data:function (){
      return {
      errors: [],
      name: "",
      email: "",
      university:"",
      courseOfStudies:"",
      password:"",
      file: {},
      imgSrc: "",
      imgId: 0
      }

  },
  methods: {
      addUser: function(pimage){
        contentfulManagementClient.getSpace('vqa5vjiwaxli')
          .then((space) => space.getEnvironment('master'))
          .then((environment) => environment.createEntry('user', {
            fields: {
              name: {
                'en-US': this.name
              },
              lastname: {
                'en-US': this.lastname
              },
              email: {
                'en-US' : this.email
              },
              university: {
                'en-US' : this.university
              },
              courseOfStudies: {
                'en-US' : this.courseOfStudies
              },
              password: {
                'en-US' : this.password
              },
              profileImage: {
                'en-US': {
                  'sys': {
                    'id': this.imgId,
                    'linkType': 'Asset',
                    'type': 'Link',
                  }
                }
              }
            }
          }))
          .then((entry) => entry.publish())
          .then((entry)=> {
            document.cookie = "id="+entry.sys.id;
            document.cookie = "name="+entry.fields.name;
            document.cookie = "lastname="+entry.fields.lastname;
            document.cookie = "email="+entry.fields.email;
            this.$router.push("/profilesettings");
            })
          .catch(console.error)
      },

      displayImage: function(event){
        this.file = event.target.files[0];
        let urlReader = new FileReader();
        urlReader.onload = function(result) {
            //console.log(urlReader.result);
            //console.log(result);
            this.imgSrc  = urlReader.result;
        }.bind(this);
        urlReader.readAsDataURL(this.file)
      },

      uploadFile: function() {
        let fileName = this.file.name;
        let contentType = this.file.type;
        let reader = new FileReader();
        let spaceref;
        reader.onload = (result)=>{
          contentfulManagementClient
            .getSpace("vqa5vjiwaxli")
            .then(space => {
              spaceref = space;
              return space.getEnvironment("master");
            })
            .then(environment =>
              environment.createUpload({ file: reader.result })
            )
            .then(upload => {
              console.log("creating asset...");
              return spaceref
                .createAsset({
                  fields: {
                    title: {
                      "en-US": fileName
                    },
                    file: {
                      "en-US": {
                        fileName: fileName,
                        contentType: contentType,
                        uploadFrom: {
                          sys: {
                            type: "Link",
                            linkType: "Upload",
                            id: upload.sys.id
                          }
                        }
                      }
                    }
                  }
                })
                .then(asset => {
                  console.log("processing...");
                  return asset.processForLocale("en-US", {
                    processingCheckWait: 2000
                  });
                })
                .then(asset => {
                  console.log("publishing...");
                  return asset.publish();
                })
                .then(asset => {
                  this.imgId = asset.sys.id;
                  console.log('call adduser');
                  this.addUser(asset);
                  return asset;
                });
            })
            .catch(err => {
              console.log(err);
            });
      };

      // Read in the image file as a data URL.
      //     reader.readAsDataURL(event.target.files[0]);
      reader.readAsArrayBuffer(this.file);
    },
      checkForm: function (e) {
        this.errors = [];

        if (!this.name) {
          this.errors.push("Name required.");
        }
        if (!this.email) {
          this.errors.push('Email required.');
        } else if (!this.validEmail(this.email)) {
          this.errors.push('Valid email required.');
        }
        if (!this.university) {
          this.errors.push("University required.");
        }
        if (!this.courseOfStudies) {
          this.errors.push("Course of Studies required.");
        }
        if (!this.password) {
          this.errors.push("Password required.");
        }
        
        if (!this.errors.length) {
          this.uploadFile();
          return true;
        }else{
         this.scrollTop();
        }

        e.preventDefault();
      },
      validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      scrollTop: function(){
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
    }
};
</script>

<style scoped lang="scss">


#register{
    input:not([type='submit']){
      width: 100%;

      margin: 5px 0;
      
      padding-left: 5px;
      padding-top: 12px;
      padding-bottom: 6px;
      
      border:none;
      border-bottom:1px solid #fff;
      opacity: 1;

      background-color:#323232;

      display: inline-block;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      color: #fff;

      &:focus {outline: none;}
    }

    .submitbtn{
      width: 80%;
      margin-top: 20px;

    }


    #errors{
          margin-top: 40px;
          color: #e6475f;
              width: 100%;
        li{
          list-style: none;
          color: #e6475f;
    text-align: center;
        }
      }

      #profileimage{
        margin-top: 50px;
      }

    
    .fp-wrapper{
      &:after{
        content: '';
        display: block;
        clear: both;
      }
      a.forgotpw{
        color:#a0a0a0;
        text-decoration: none;
        font-size:12px;
        margin-right:10%;
        float:right;
      }
    }

  }
      .warumnidfullbra{
      width: 100%;
      }

</style>
