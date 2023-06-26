import Vue from "vue";
import Vuex from "vuex";
import googleReviews from "google-reviews-web-scraper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: "http://localhost:3000",
    users: [],
    posts: [],
    sections: [],
    reviews: [],
    lang: {
      default: "en",
      list: [
        { id: "en", name: "english", flag: "mdi-flag-spain" },
        { id: "es", name: "español", flag: "mdi-flag-usa" },
      ],
    },
    socket: null,
  },
  getters: {},
  mutations: {
    setData(state, payload) {
      Vue.set(state, payload.table, payload.data);
    },
  },
  actions: {
    getData({ state, commit }, payload) {
      let tables = ["posts", "sections"];
      if (payload) {
        tables = [payload];
      }

      tables.forEach((table) => {
        fetch(`${state.api}?tabla=${table}`, {
          method: "get",
          headers: { "content-type": "application/json" },
        })
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            commit("setData", { tabla: table, data: json });
          });
      });
    },
    getGoogleReviews({ state }) {
      const reviews = googleReviews(
        "https://www.google.com/maps/place/Hospeder%C3%ADa+Casa+De+Cisneros/@39.856734,-4.0231206,17z/data=!4m20!1m10!3m9!1s0xd6a0ba424802f99:0x48f55efb7d5074ed!2sHospeder%C3%ADa+Casa+De+Cisneros!5m2!4m1!1i2!8m2!3d39.856734!4d-4.0231206!16s%2Fg%2F1tvw68bs!3m8!1s0xd6a0ba424802f99:0x48f55efb7d5074ed!5m2!4m1!1i2!8m2!3d39.856734!4d-4.0231206!16s%2Fg%2F1tvw68bs?hl=es&entry=ttu"
      );
      Vue.set(state, "reviews", reviews);
    },
  },
  modules: {},
});
