import Vue from "vue";
Vue.filter("capital", (value) => {
  if (value) {
    return (
      value.substring(0, 1).toUpperCase() +
      value.slice(1, value.toString().length)
    );
  } else {
    return value;
  }
});
Vue.filter("uppercase", (value) => {
  if (value) {
    return value.toString().toUpperCase();
  } else {
    return value;
  }
});
