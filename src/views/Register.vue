<template>
  <div class="register">
    <h1>Register</h1>

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
        <input id="name" v-model="name" type="text" name="name" >
      </p>

      <p>
        <label for="lastname">Lastname</label>
        <input id="lastname" v-model="lastname" type="text" name="lastname">
      </p>

      <p>
        <label for="lastname">Gender</label>
            <select id="gender" v-model="gender" name="gender" >
              <option>male</option>
              <option>female</option>
              <option>other</option>
            </select>
      </p>

      <p>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" name="email">
      </p>

      <p>
        <label for="profileimage">Profilbild</label>
        <input id="profileimage" type="file" name="profileimage" @change="displayImage">
      </p>
      <img :src="imgSrc">

        <p>
        <input type="submit" value="Submit">
        </p>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "register",
  components: {
    HelloWorld
  },
   data:function (){
      return {
      errors: [],
      name: "",
      lastname: "",
      gender: "",
      email: "",
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
              email: {
                'en-US' : this.email
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
            console.log(entry)
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
        if (!this.name) {
          this.errors.push("Lastname required.");
        }
        if (!this.gender) {
          this.errors.push("Gender required.");
        }
        if (!this.email) {
          this.errors.push('Email required.');
        } else if (!this.validEmail(this.email)) {
          this.errors.push('Valid email required.');
        }
        if (!this.errors.length) {
          this.uploadFile();
          return true;
        }

        e.preventDefault();
      },
      validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    }
};
</script>

<style scoped lang="scss">
</style>
