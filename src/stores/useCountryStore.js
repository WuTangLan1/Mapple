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
    async fetchCountries() {
      const querySnapshot = await getDocs(collection(db, "countries"));
      this.countries = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      // Filter out any countries already experienced to reset if all have been seen
      this.countries = this.countries.filter(c => !this.experiencedCountries.includes(c.id));
      if (this.countries.length === 0) {
        this.experiencedCountries = []; // Reset if all countries have been seen
      }
    },
    async getRandomCountry() {
      // Ensure countries are fetched and filtered
      let filteredCountries = this.countries.filter(c => !this.experiencedCountries.includes(c.id));
      if (filteredCountries.length === 0) {
        await this.fetchCountries(); // Fetch again if all have been experienced
        filteredCountries = this.countries;
      }
      const randomIndex = Math.floor(Math.random() * filteredCountries.length);
      this.currentCountry = filteredCountries[randomIndex];
      this.experiencedCountries.push(this.currentCountry.id);
  
      // Fetch additional data like flag, celebrity, etc.
      await this.fetchAdditionalData(this.currentCountry);
    },
  
    async fetchAdditionalData(country) {
      if (country.flag_dir && country.flag_dir.startsWith('gs://')) {
        const flagRef = ref(storage, country.flag_dir);
        country.flag_url = await getDownloadURL(flagRef);
      } else {
        country.flag_url = '/path/to/default/flag/image.png'; // Default or error handling
      }
  
      // Example for fetching celebrity details
      if (country.celebrity_dir && country.celebrity_dir.startsWith('gs://')) {
        const celebRef = ref(storage, country.celebrity_dir);
        country.celebrity_url = await getDownloadURL(celebRef);
      }
    }
  }
});

