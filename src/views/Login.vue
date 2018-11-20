<template>
  <div class="register">
    <img class="logo" alt="Snect logo" src="../assets/snect_logo.svg">

      <form
      id="login"
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
        <input id="email" v-model="email" type="email" name="email" placeholder="Email" >
      </p>

      <p>
        <input id="password" v-model="password" type="password" name="password" placeholder="Password" >
      </p>

      <div class="fp-wrapper">
        <router-link to="#" class="forgotpw">Forgot your password?</router-link>
      </div>
 
        <p>
        <input class="submitbtn" type="submit" value="Submit">
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

#app{
 .logo{
   width:300px;
 }
}
#login{
   input{
    width: 80%;

    margin: 8px 0;
    
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 12px;
    padding-bottom: 12px;
    
    border:none;
    border-bottom:1px solid #fff;

    background-color:#323232;

    display: inline-block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .submitbtn{
      width:70%;
      flex: 1 1 auto;
      margin: 10px;
      padding: 20px;
      text-align: center;
      text-transform: uppercase;
      transition: 0.5s;
      background-size: 200% auto;
      color: white;
    /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
      border-bottom:none;
      border-radius: 30px;
      /*background-image: linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%);*/
      background-image: linear-gradient(to right, #e6475f 0%, #ef8138 51%, #e6475f 100%);

      &:hover{
         background-position: right center; /* change the direction of the change here */
      }
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
</style>
