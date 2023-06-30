import Vue from "vue";
Vue.filter("capital", (value) => {
  return (
    value.substring(0, 1).toUpperCase() +
    value.slice(1, value.toString().length)
  );
});
Vue.filter("uppercase", (value) => {
  return value.toString().toUpperCase();
});
