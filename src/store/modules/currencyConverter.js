import { apiService } from "../../APIService";

export let currencyConverter = {
  namespaced: true,

  state: () => ({
    firstLoad: true,
    baseCurrency: null,
    baseCurrencyAmount: 1,
    secondCurrency: null,
    currenciesList: [],
  }),

  mutations: {
    setAllCurrencies(state, payload) {
      state.currenciesList = payload;
    },

    changeFirstLoadOnFalse(state) {
      state.firstLoad = false;
    },

    setBaseCurrency(state, payload) {
      state.baseCurrency = payload;
    },

    changeBaseCurrencyAmount(state, payload) {
      state.baseCurrencyAmount = payload;
    },

    setSecondCurrency(state, payload) {
      state.secondCurrency = payload;
    },
  },

  actions: {
    async setupAllCurrencies({ commit }) {
      let data = await apiService.fetchAllCurrencies();
      commit("setAllCurrencies", data);
      commit("changeFirstLoadOnFalse");
    },

    setBaseCurrency({ commit, state }, baseCurrency) {
      if (baseCurrency !== undefined) {
        commit("setBaseCurrency", baseCurrency);
      } else if (Object.entries(state.currenciesList).length > 1) {
        commit("setBaseCurrency", Object.keys(state.currenciesList)[0]);
      }
    },

    setSecondCurrency({ commit, state }, secondCurrency) {
      if (secondCurrency !== undefined) {
        commit("setSecondCurrency", secondCurrency);
      } else if (Object.entries(state.currenciesList).length > 2) {
        commit("setSecondCurrency", Object.keys(state.currenciesList)[1]);
      }
    },
  },

  getters: {},
};
