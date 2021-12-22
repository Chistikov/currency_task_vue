import { apiService } from "../../APIService";

export let currencies = {
  namespaced: true,

  state: () => ({
    firstLoad: true,
    baseCurrency: null,
    currenciesList: [],
    favoriteCurrencies: ["USD"],
    currenciesValues: [],
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

    addToFavoriteCurrencies(state, currency) {
      state.favoriteCurrencies = [...state.favoriteCurrencies, currency];
    },

    removeFromFavoriteCurrencies(state, currency) {
      state.favoriteCurrencies = state.favoriteCurrencies.filter((currencyItem) => currencyItem !== currency);
    },

    setCurrenciesValues(state, data) {
      state.currenciesValues = data;
    },

    resetFavoriteCurrencies(state) {
      state.favoriteCurrencies = [];
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

    async setCurrenciesValuesDependOn({ commit }, baseCurrency) {
      let data = await apiService.fetchDependCurrencies(baseCurrency);
      commit("setCurrenciesValues", data);
    },
  },
};
