import { createStore } from "vuex";
import { currencyConverter } from "./modules/currencyConverter.js";

export default createStore({
  modules: {
    currencyConverter,
  },
});
