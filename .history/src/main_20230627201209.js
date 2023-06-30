import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./vue-filters.js";
import swal from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDNwYFEmzKmbuVFD9dhkz1plV0aRiWG-tQ",
    libraries: "places,visualization", // This is required if you use the Autocomplete plugin
  },
});

Vue.config.productionTip = false;
Vue.use(swal);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
