<template>
  <div>
    <div class="container">
      <div class="containerTitle">base currency</div>
      <a-select v-bind:value="baseCurrency" class="select" @change="baseCurrencyChangeHandler">
        <a-select-option
          v-for="(currencyName, currencyAbbreviation, index) of currenciesList"
          v-bind:key="index"
          v-bind:value="currencyAbbreviation"
          v-bind:selected="currencyAbbreviation === baseCurrency"
          >{{ `${currencyAbbreviation} - ${currencyName}` }}</a-select-option
        >
      </a-select>
    </div>
    <div class="container" v-if="getFavoriteCurrencies.length > 0">
      <div class="containerTitle">favorite currencies</div>
      <div v-for="(currency, key) of getFavoriteCurrencies" v-bind:key="key" class="currencyItem">
        <div>{{ `${currency[0]} - ${currency[1]}` }}</div>
        <a-button type="danger" @click="removeFromFavoriteCurrencies(currency[0])">remove from favorite</a-button>
      </div>
    </div>
    <div class="container" v-if="getNotFavoriteCurrencies.length > 0">
      <div class="containerTitle">currencies</div>
      <div v-for="(currency, key) of getNotFavoriteCurrencies" v-bind:key="key" class="currencyItem">
        <div>{{ `${currency[0]} - ${currency[1]}` }}</div>
        <a-button type="primary" @click="addToFavoriteCurrencies(currency[0])">add to favorite</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  mounted() {
    if (this.firstLoad) {
      this.setupAllCurrencies()
        .then(() => this.setBaseCurrency())
        .then(() => this.setCurrenciesValuesDependOn(this.baseCurrency));
    }
  },
  computed: {
    ...mapState({
      firstLoad: (state) => state.currencies.firstLoad,
      baseCurrency: (state) => state.currencies.baseCurrency,
      currenciesList: (state) => state.currencies.currenciesList,
      favoriteCurrencies: (state) => state.currencies.favoriteCurrencies,
      currenciesValues: (state) => state.currencies.currenciesValues,
    }),

    getFavoriteCurrencies() {
      return Object.values(this.currenciesValues.filter((currency) => this.favoriteCurrencies.includes(currency[0])));
    },

    getNotFavoriteCurrencies() {
      return Object.values(
        this.currenciesValues.filter(
          (currency) => !this.favoriteCurrencies.includes(currency[0]) && currency[0] !== this.baseCurrency
        )
      );
    },
  },
  methods: {
    ...mapActions({
      setupAllCurrencies: "currencies/setupAllCurrencies",
      setBaseCurrency: "currencies/setBaseCurrency",
      addToFavoriteCurrencies: "currencies/addToFavoriteCurrencies",
      removeFromFavoriteCurrencies: "currencies/removeFromFavoriteCurrencies",
      setCurrenciesValuesDependOn: "currencies/setCurrenciesValuesDependOn",
    }),

    ...mapMutations({
      addToFavoriteCurrencies: "currencies/addToFavoriteCurrencies",
      removeFromFavoriteCurrencies: "currencies/removeFromFavoriteCurrencies",
    }),

    baseCurrencyChangeHandler(currency) {
      this.setBaseCurrency(currency);
      this.setCurrenciesValuesDependOn(this.baseCurrency);
    },
  },
};
</script>

<style lang="sass" scoped>

.container
  border: 1px solid #ddd
  padding: 20px
  border-radius: 5px
  position: relative
  margin-bottom: 50px

  &:last-child
    margin-bottom: 0

  .containerTitle
    display: block
    background: #fff
    padding: 0px 5px
    border: 1px solid #ddd
    border-radius: 10px
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%, -50%)

  .select
    width: 100%

  .currencyItem
    display: flex
    align-items: center
    margin-bottom: 10px
    padding-bottom: 10px
    border-bottom: 1px solid #ddd

    div
      flex-grow: 1

    &:last-child
      margin-bottom: 0px
      padding-bottom: 0px
      border-bottom: 0px
</style>
