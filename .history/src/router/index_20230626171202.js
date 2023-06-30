import Vue from "vue";
import VueRouter from "vue-router";
import RoomsView from "../views/roomsView.vue";
import ReservationsView from "../views/reservationsView.vue";
import manageUsers from "../views/manageUsers.vue";
import managePosts from "../views/managePosts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "rooms",
    component: RoomsView,
  },
  {
    path: "/reservations",
    name: "reservations",
    component: ReservationsView,
  },
  {
    path: "/manageusers",
    name: "manageusers",
    component: manageUsers,
  },
  {
    path: "/manageposts",
    name: "manageposts",
    component: managePosts,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
