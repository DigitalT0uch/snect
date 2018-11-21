<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/register_design">Register Design</router-link> |
      <router-link to="/map_design">Map Design</router-link>
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
  padding: 30px;
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
</style>


