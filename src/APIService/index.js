function APIService() {
  this.API_URL = process.env.VUE_APP_API_URL;
  this.API_KEY = process.env.VUE_APP_API_KEY;
}

APIService.prototype.fetchAllCurrencies = async function () {
  try {
    let response = await fetch(`${this.API_URL}/currencies?api_key=${this.API_KEY}`);
    let data = await response.json();
    return data.currencies;
  } catch (error) {
    console.error(error);
  }
};

APIService.prototype.fetchExchangeRate = async function (baseCurrency, secondaryCurrency) {
  try {
    let response = await fetch(
      `${this.API_URL}/fetch-one?from=${baseCurrency}&to=${secondaryCurrency}&api_key=${this.API_KEY}`
    );
    let data = await response.json();
    return data.result[secondaryCurrency];
  } catch (error) {
    console.error(error);
  }
};

APIService.prototype.fetchDependCurrencies = async function (baseCurrency) {
  try {
    let response = await fetch(`${this.API_URL}/fetch-all?from=${baseCurrency}&api_key=${this.API_KEY}`);
    let data = await response.json();
    return Object.entries(data.results);
  } catch (error) {
    console.error(error);
  }
};

export let apiService = new APIService();
