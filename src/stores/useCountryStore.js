// this is the code for the useCountryStore 

import { defineStore } from 'pinia';
import { db } from '@/components/fbdir/fbInit'; // Ensure this import path matches your project structure
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Initialize Firebase Storage
const storage = getStorage();

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    currentCountry: null,
    experiencedCountries: [] // Store IDs of countries already seen
  }),
  actions: {
    async resetCountries() {
      this.experiencedCountries = []; // Clear the list of seen countries
      await this.fetchCountries(); // Refetch the countries
    },
    async fetchCountries() {
      const querySnapshot = await getDocs(collection(db, "countries"));
      this.countries = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      this.countries = this.countries.filter(c => !this.experiencedCountries.includes(c.id));
      if (this.countries.length === 0) {
        this.experiencedCountries = []; // Reset if all countries have been seen
      }
    },
    async fetchRandomCelebrityAndHoliday(countryId) {
      // Fetch the celebrities subcollection
      const celebSubCollectionRef = collection(db, `countries/${countryId}/celebrities`);
      const celebSnapshot = await getDocs(celebSubCollectionRef);
      const celebrities = celebSnapshot.docs.map(doc => doc.data());

      // Fetch the holidays subcollection
      const holidaySubCollectionRef = collection(db, `countries/${countryId}/holidays`);
      const holidaySnapshot = await getDocs(holidaySubCollectionRef);
      const holidays = holidaySnapshot.docs.map(doc => doc.data());

      // Randomly select a celebrity
      if (celebrities.length > 0) {
        const randomCelebIndex = Math.floor(Math.random() * celebrities.length);
        this.currentCountry.celebrity = celebrities[randomCelebIndex].name;
      }

      // Randomly select a holiday
      if (holidays.length > 0) {
        const randomHolidayIndex = Math.floor(Math.random() * holidays.length);
        this.currentCountry.holiday = holidays[randomHolidayIndex].name;
      }
    },
    async getRandomCountry() {
      let filteredCountries = this.countries.filter(c => !this.experiencedCountries.includes(c.id));
      if (filteredCountries.length === 0) {
        await this.fetchCountries(); // Fetch again if all have been experienced
        filteredCountries = this.countries;
      }
      const randomIndex = Math.floor(Math.random() * filteredCountries.length);
      this.currentCountry = filteredCountries[randomIndex];
      this.experiencedCountries.push(this.currentCountry.id);
  
      await this.fetchRandomCelebrityAndHoliday(this.currentCountry.id);
      await this.fetchAdditionalData(this.currentCountry)
    },
  
    async fetchAdditionalData(country) {
      if (country.flag_dir && country.flag_dir.startsWith('gs://')) {
        const flagRef = ref(storage, country.flag_dir);
        country.flag_url = await getDownloadURL(flagRef);
      } else {
        country.flag_url = '/path/to/default/flag/image.png'; // Default or error handling
      }
    }
  }
});

