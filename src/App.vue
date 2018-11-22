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
</style>


