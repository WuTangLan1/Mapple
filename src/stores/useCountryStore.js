// src/stores/countryStore.js
import { defineStore } from 'pinia';

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
  }),
  actions: {
    setCountries(countries) {
      this.countries = countries;
    },
  },
});
