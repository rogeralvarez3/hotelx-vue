/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: "",
    users: [],
    posts: [],
    sections: [],
    langDictionary: [],
    lang: {
      default: "en",
      list: [
        { id: "en", name: "english", flag: "mdi-flag-spain" },
        { id: "es", name: "español", flag: "mdi-flag-usa" },
      ],
    },
    socket: null,
  },
  getters: {
    getLang: (state) => (payload) => {
      let result;
      if (state.langDictionary.length > 0) {
        result = state.langDictionary.find((item) => {
          return item.en === payload;
        });
        try {
          result = result[state.lang.default];
        } catch (error) {
          console.log(error, payload);
          result = payload;
        }
      } else {
        result = payload;
      }
      //console.log(result);
      return result;
    },
  },
  mutations: {
    setData(state, payload) {
      Vue.set(state, payload.table, payload.data);
    },
  },
  actions: {
    getData({ state, commit }, payload) {
      let tables = ["posts", "sections", "langDictionary"];
      if (payload) {
        if (typeof payload === "object") {
          tables = [payload.table];
        } else {
          tables = [payload];
        }
      }
      tables.forEach((table) => {
        let data = { tabla: table };
        if (typeof payload === "object") {
          if (payload.token) { data.token = payload.token; }
        }

        fetch(`${state.api}/get`, {
          method: "post",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        })
          .then((res) => {
            return res.text();
          })
          .then((json) => {
            //console.log(json, payload);
            json = JSON.parse(json);
            commit("setData", { table: table, data: json });
          });
      });
    },
  },
  modules: {},
});
