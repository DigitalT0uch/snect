<template>
  <div class="register">
     <div class="grid-container full">
          <div class="grid-x">
            <div class="cell small-6 small-offset-3"> 
               <h1>Register</h1>
            </div>
          </div>
          <div class="grid-x">
           <div class="cell small-6 small-offset-3">
              <form
                id="app"
                @submit.prevent="checkForm"
                novalidate="true"
              >

                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>

                <p>
                  <label for="name">Name</label>
                  <input id="name" v-model="name" type="text" name="name" placeholder="Name" >
                </p>

                <p>
                  <label for="lastname">Lastname</label>
                  <input id="lastname" v-model="lastname" type="text" name="lastname"  placeholder="Lastname">
                </p>

                <p>
                  <label for="lastname">Gender</label>
                      <select id="gender" v-model="gender" name="gender">
                        <option value="" disabled selected>Select your gender</option>
                        <option>male</option>
                        <option>female</option>
                        <option>other</option>
                      </select>
                </p>
                
                <p>
                  <label for="birthday">Birthday</label>
                  <input id="birthday" v-model="birthday" type="date" name="birthday"  placeholder="Birthday">
                </p>

                <p>
                  <label for="city">City</label>
                  <input id="city" v-model="city" type="text" name="city"  placeholder="City">
                </p>
                
                <p>
                  <label for="email">Email</label>
                  <input id="email" v-model="email" type="email" name="email"  placeholder="Email">
                </p>

                
                <p>
                  <label for="university">University</label>
                  <input id="university" v-model="university" type="text" name="university"  placeholder="University">
                </p>

                <p>
                  <label for="courseOfStudies">Course of Studies</label>
                  <input id="courseOfStudies" v-model="courseOfStudies" type="text" name="courseOfStudies"  placeholder="Course of Studies">
                </p>

                <p>
                  <label for="universityCity">City University</label>
                  <input id="universityCity" v-model="universityCity" type="text" name="universityCity"  placeholder="City University">
                </p>


                <p>
                  <label for="profileimage">Profilbild</label>
                  <input id="profileimage" type="file" name="profileimage" @change="displayImage" >
                </p>
                <img :src="imgSrc">

                <p>
                  <label for="password">Password</label>
                  <input id="password" v-model="password" type="password" name="password"  placeholder="Password">
                </p>

                <p>
                  <label for="password2">Password2</label>
                  <input id="password2" v-model="password2" type="password" name="password2"  placeholder="Password2">
                </p>

                  <p>
                  <input type="submit" value="Submit">
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
      lastname: "",
      gender: "",
      birthday: "",
      email: "",
      city: "",
      university:"",
      courseOfStudies:"",
      universityCity:"",
      password:"",
      password2:"",
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
              gender: {
                'en-US': this.gender
              },
              birthday: {
                'en-US' : this.birthday
              },
              city:{
                'en-US' : this.city
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
              universityCity: {
                'en-US' : this.universityCity
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
        if (!this.lastname) {
          this.errors.push("Lastname required.");
        }
        if (!this.gender) {
          this.errors.push("Gender required.");
        }
        if (!this.birthday) {
          this.errors.push("Birthday required.");
        }
        if (!this.email) {
          this.errors.push('Email required.');
        } else if (!this.validEmail(this.email)) {
          this.errors.push('Valid email required.');
        }
        if (!this.city) {
          this.errors.push("City required.");
        }
        if (!this.university) {
          this.errors.push("University required.");
        }
        if (!this.universityCity) {
          this.errors.push("City of your University required.");
        }
        if (!this.courseOfStudies) {
          this.errors.push("Course of Studies required.");
        }
        if (!this.birthday) {
          this.errors.push("Birthday required.");
        }
        if (!this.password) {
          this.errors.push("Password required.");
        }
        if (!this.password2) {
          this.errors.push("Password confirmation required.");
        }
        if(this.password != this.password2){
          this.errors.push("Passwords must be identical.");
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
</style>
