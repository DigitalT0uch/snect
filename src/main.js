import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {createClient} from 'contentful'
import {createClient as createManagment} from 'contentful-management'

Vue.config.productionTip = false;

window.contentfulClient = createClient({
  accessToken: 'fa06e8446827e704aa8bd292a83ea0edb272aea8511d09b5b50c40c1d13c02f1',
  space: 'vqa5vjiwaxli'
});

window.contentfulManagementClient = createManagment({
  accessToken: 'CFPAT-28677e16c63ac5fc33a099851a92fe91d6ba86d85d9ba14c84728474f68c0757'
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