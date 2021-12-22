<template>
  <div>
    <div v-if="!stringIsValid(baseCurrencyAmount)" class="message">
      <a-alert message="Wrong base currency amount" type="error" />
    </div>

    <div class="mainCurrenciesBlock">
      <div class="baseCurrencyBlock">
        <div class="title">base currency</div>
        <a-input
          v-bind:value="baseCurrencyAmount"
          class="input"
          placeholder="Amount"
          @input="baseCurrencyAmountChangeHandler"
        ></a-input>
        <a-select v-bind:value="baseCurrency" class="select" @change="baseCurrencyChangeHandler">
          <a-select-option
            v-for="(currencyName, currencyAbbreviation, index) of currenciesList"
            v-bind:key="index"
            v-bind:value="currencyAbbreviation"
            v-bind:selected="currencyAbbreviation === baseCurrency"
            v-bind:disabled="currencyAbbreviation === secondCurrency"
            >{{ `${currencyAbbreviation} - ${currencyName}` }}</a-select-option
          >
        </a-select>
      </div>
      <div class="middleBlock">=</div>
      <div class="secondCurrencyBlock">
        <div class="title">second currency</div>
        <a-input
          v-bind:value="computedSecondCurrencyAmount || ''"
          class="secondCurrencyAmount"
          placeholder="Amount"
          v-bind:readonly="true"
        ></a-input>
        <a-select v-bind:value="secondCurrency" class="select" @change="secondCurrencyChangeHandler">
          <a-select-option
            v-for="(currencyName, currencyAbbreviation, index) of currenciesList"
            v-bind:key="index"
            v-bind:value="currencyAbbreviation"
            v-bind:selected="currencyAbbreviation === secondCurrency"
            v-bind:disabled="currencyAbbreviation === baseCurrency"
            >{{ `${currencyAbbreviation} - ${currencyName}` }}</a-select-option
          >
        </a-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { apiService } from "../APIService";

export default {
  data() {
    return { computedSecondCurrencyAmount: null };
  },
  mounted() {
    if (this.firstLoad) {
      this.setupAllCurrencies()
        .then(() => this.setBaseCurrency())
        .then(() => this.setSecondCurrency())
        .then(() => this.computeSecondCurrencyAmount());
    }
  },

  computed: {
    ...mapState({
      baseCurrency: (state) => state.currencyConverter.baseCurrency,
      firstLoad: (state) => state.currencyConverter.firstLoad,
      currenciesList: (state) => state.currencyConverter.currenciesList,
      baseCurrencyAmount: (state) => state.currencyConverter.baseCurrencyAmount,
      secondCurrency: (state) => state.currencyConverter.secondCurrency,
    }),
  },

  methods: {
    ...mapActions({
      setupAllCurrencies: "currencyConverter/setupAllCurrencies",
      setBaseCurrency: "currencyConverter/setBaseCurrency",
      setSecondCurrency: "currencyConverter/setSecondCurrency",
    }),
    ...mapMutations({
      changeBaseCurrencyAmount: "currencyConverter/changeBaseCurrencyAmount",
    }),

    baseCurrencyChangeHandler(currency) {
      this.setBaseCurrency(currency);
      this.computeSecondCurrencyAmount();
    },

    secondCurrencyChangeHandler(currency) {
      this.setSecondCurrency(currency);
      this.computeSecondCurrencyAmount();
    },

    baseCurrencyAmountChangeHandler(e) {
      this.changeBaseCurrencyAmount(e.target.value);
      this.computeSecondCurrencyAmount();
    },

    stringIsValid(str) {
      let regExp = /^[0-9]+\.?[0-9]*$/;
      return regExp.test(str);
    },

    computeSecondCurrencyAmount() {
      if (this.baseCurrency !== null && this.secondCurrency !== null && this.stringIsValid(this.baseCurrencyAmount)) {
        apiService
          .fetchExchangeRate(this.baseCurrency, this.secondCurrency)
          .then((rate) => (this.computedSecondCurrencyAmount = this.baseCurrencyAmount * rate));
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.message
  margin-bottom: 40px

.mainCurrenciesBlock
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center

  .secondCurrencyBlock, .baseCurrencyBlock
    border: 1px solid #ddd
    padding: 20px
    border-radius: 5px
    position: relative

    .title
      display: block
      background: #fff
      padding: 0px 5px
      border: 1px solid #ddd
      border-radius: 10px
      position: absolute
      top: 0
      left: 50%
      transform: translate(-50%, -50%)

  .middleBlock
    width: 40px
    height: 40px
    border-radius: 50%
    text-align: center
    line-height: 36px
    color: #fff
    font-size: 22px
    font-weight: 600
    background: #1890FF
    margin: 0 -10px
    z-index: 5
    user-select: none

.input
  width: 100px
  margin-right: 10px

.select
  width: 220px

.secondCurrencyAmount
  width: 100px
  margin-right: 10px


@media screen and (max-width: 850px)
  .mainCurrenciesBlock
    flex-direction: column

    .baseCurrencyBlock
      margin-bottom: 5px

    .secondCurrencyBlock
      margin-top: 15px
</style>
