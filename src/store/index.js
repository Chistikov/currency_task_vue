import { createStore } from "vuex";
import { currencyConverter } from "./modules/currencyConverter.js";
import { currencies } from "./modules/currencies.js";

export default createStore({
  modules: {
    currencyConverter,
    currencies,
  },
});
