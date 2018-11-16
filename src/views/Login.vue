<template>
  <div class="register">
    <h1>Login</h1>

      <form
      id="app"
      @submit.prevent="checkForm"
      novalidate="true"
    >

      <p v-if="seen">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="email">email</label>
        <input id="email" v-model="email" type="email" name="email" >
      </p>

      <p>
        <label for="password">password</label>
        <input id="password" v-model="password" type="password" name="password">
      </p>

        <p>
        <input type="submit" value="Submit">
        </p>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "login",
  components: {
  },
   data:function (){
      return {
      errors: [],
      seen: false,
      email: "",
      password: ""
      }

  },
  methods: {
    login: function(){

          window.contentfulClient.getEntries({
          'content_type': 'user',
          'fields.email': this.email
        })
        .then((entries)=>{
          entries.items.forEach((entry)=>{
          console.log(entry.sys.id);
          if(entry.fields.password == this.password){        
            document.cookie = "id="+entry.sys.id;
            document.cookie = "name="+entry.fields.name;
            document.cookie = "lastname="+entry.fields.lastname;
            document.cookie = "email="+entry.fields.email;
            this.$router.push("/profilesettings");
          }
          else{
            this.seen = true;
            this.errors.push("Wrong Email or Passwort.");
          }
          })
        }).catch();
    },
      checkForm: function (e) {
        this.errors = [];

        if (!this.email) {
          this.errors.push('Email required.');
        } else if (!this.validEmail(this.email)) {
          this.errors.push('Valid email required.');
        }
        if (!this.errors.length) {
          this.login();
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
