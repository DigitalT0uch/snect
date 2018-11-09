import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {createClient} from 'contentful'

Vue.config.productionTip = false;

window.contentfulClient = createClient({
  accessToken: '79aa451a69a502a0d00c7fb61264b273fcdc67c349bfb13613aa00306573c521',
  space: 'k3mp96odf6se'
});

contentfulClient.getEntries()
.then((response) => console.log(response.items))
.catch(console.error);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");