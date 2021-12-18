import { createRouter, createWebHistory } from "vue-router";
import CurrencyConvertor from "../views/CurrencyConvertor.vue";

const routes = [
  {
    path: "/currency_converter",
    name: "CurrencyConvertor",
    component: CurrencyConvertor,
  },
  {
    path: "/currencies",
    name: "Currencies",
    component: () => import("../views/Currencies.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
