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
    key: "AIzaSyDp3Ud3SixagW8bJOwtosy5bBMB5JRNS_k",
    libraries: "", // necessary for places input
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
