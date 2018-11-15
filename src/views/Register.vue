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
        <input id="profileimage" v-model="profileimage" type="file" name="email">
      </p>

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
      }

  },
  methods: {
      addUser: function(){
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
              }
            }
          }))
          .then((entry) => entry.publish())
          .then((entry)=> console.log(entry))
          .catch(console.error)
      },
      uploadfile: function() {
        contentfulManagementClient.getSpace('vqa5vjiwaxli').then((space) => space.getContentType('User')
        .then((contentType) => contentType.getEnvironment('master')
        .then((environment) => environment.createAssetFromFiles({
          fields: {
              file: {
                'en-US': {
                  contentType: 'image/jpeg',
                  fileName: 'filename_english.jpg',
                  file: createReadStream('path/to/filename_english.jpg')
                },
                'de-DE': {
                  contentType: 'image/svg+xml',
                  fileName: 'filename_german.svg',
                  file: '<svg><path fill="red" d="M50 50h150v50H50z"/></svg>'
                }
              }
          }
        }))))
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
          this.addUser();
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
