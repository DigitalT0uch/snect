import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {createClient} from 'contentful'

Vue.config.productionTip = false;

window.contentfulClient = createClient({
  accessToken: 'fa06e8446827e704aa8bd292a83ea0edb272aea8511d09b5b50c40c1d13c02f1',
  space: 'vqa5vjiwaxli'
});
/*
contentfulClient.getEntries()
.then((response) => console.log(response.items))
.catch(console.error);
*/
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");