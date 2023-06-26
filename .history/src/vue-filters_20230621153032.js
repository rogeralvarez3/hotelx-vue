import Vue from "vue";
Vue.filter("capital", (value) => {
  return value.substring(0, 1) + value.slice(1, 1);
});
