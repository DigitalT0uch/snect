<template>
  <div class="register">
    <div class="grid-container full">
          <div class="grid-x">
            <div class="cell small-6 small-offset-3">
            <div class="animatedLogo">
                <img class="logo" alt="Snect logo" src="../assets/snect_logo_invert.svg">
            </div>
            </div>
          </div>

          <div class="grid-x">
           <div class="cell small-10 small-offset-1">
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
        <input class="submitbtn" type="submit" value="Sign in">
        </p>
    </form>
    </div>
          </div>
     </div>
    <div class="register_wrapper">
      <p>New to SNECT?  <router-link to="register" class="register">Sign up</router-link></p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import cookies from "@/cookies.js";

export default {
  name: "login",
  components: {
  },
   data:function (){
      return {
        errors: [],
        seen: false,
        email: "",
        password: "",
        cUserName : "",
        cUserLastName : "",
        cUserEmail : "",
      }

  },
  mounted: function(){
    this.cUserName = cookies.getCookie("name");
    this.cUserLastName = cookies.getCookie("lastname");
    this.cUserEmail = cookies.getCookie("email");
    
    console.log(this.cUserEmail);
    if(this.cUserEmail != ''){
            this.$router.push("/map");
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
            this.$router.push("/lookingfor");
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
 .animatedLogo{
   background: linear-gradient(to right, #e6475f 0%, #ef8138 60%, #e6475f 130%);
    margin-top:80px;
   margin-bottom: 70px;
    background-size: 200% 100%;
   -webkit-animation: AnimationName 3s ease infinite;
-moz-animation: AnimationName 3s ease infinite;
animation: AnimationName 3s ease infinite;
 }

 @-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName { 
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

  #login{
    input:not([type='submit']){
      width: 100%;

      margin: 8px 0;
      
      padding-left: 5px;
      padding-top: 12px;
      padding-bottom: 6px;
      
      border:none;
      border-bottom:1px solid #fff;

      background-color:#323232;

      display: inline-block;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      color: #fff;

      &:focus {outline: none;}
    }

    .submitbtn{
      margin-top: 70px;
      width: 80%;
    }
    p{
      margin: 5px;
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
  .register_wrapper{
    font-size: 12px;
    text-align: center;
    display: block;
    color:#a0a0a0;
    padding-top: 0px;
    a.register{
      color:#fff;
      text-decoration: none;
    }
  }
}
</style>
