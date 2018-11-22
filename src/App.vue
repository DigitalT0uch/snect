<template>
  <div id="app">
    <div id="nav" v-if="$route.name != 'login'">
      <a href="javascript:history.go(-1)" class="backlink"> <img class="navicon" src="@/assets/icons/white_back.svg"/></a>
      <div class="navright">
        <router-link to="/" v-if="$route.name != 'register' && $route.name != 'lookingfor' && $route.name != 'user'"><img src="@/assets/icons/white_filter.svg" class="navicon"/></router-link>
        <router-link to="/"><img src="@/assets/icons/white_settings.svg" class="navicon" /></router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<!-- Globaler import -->
<style src="@/assets/css/foundation.css"></style>
<style src="@/assets/css/style.css"></style>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway');
body{
  background-color:#323232;
}
#app {
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.08rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}
#nav {
  padding: 15px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

img.snect_logo{
  width:300px;
}
.backlink{
  float: left;
}

.navright{
  float:right;
  a{
    margin:10px;
  }
}
.navicon{
    width: 15px;
    height:15px;
}

#login input.submitbtn{
        width:70%;
        flex: 1 1 auto;
        margin: 10px;
        padding: 20px;
        text-align: center;
        text-transform: uppercase;
          font-size: 4.75vw;
  font-weight: 700;
  letter-spacing: 0.6vw; 
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        cursor:pointer;
      /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
        border:none;
        border-radius: 30px;
        /*background-image: linear-gradient(to right, #f6d365 0%, #fda085 51%, #f6d365 100%);*/
        background-image: linear-gradient(to right, #e6475f 0%, #ef8138 51%, #e6475f 100%);

        &:hover{
          background-position: right center; /* change the direction of the change here */
        }
    }

</style>


