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
      // Filter countries to exclude those already experienced
      let filteredCountries = this.countries.filter(c => !this.experiencedCountries.includes(c.id));
      if (filteredCountries.length === 0) {
        await this.fetchCountries(); // Re-fetch if all current countries have been experienced
        filteredCountries = this.countries;
      }
      const randomIndex = Math.floor(Math.random() * filteredCountries.length);
      this.currentCountry = filteredCountries[randomIndex];
      this.experiencedCountries.push(this.currentCountry.id); // Add to experienced list

      // Fetch the flag URL if stored in Firebase Storage
      if (this.currentCountry.flag_dir && this.currentCountry.flag_dir.startsWith('gs://')) {
        const flagRef = ref(storage, this.currentCountry.flag_dir);
        this.currentCountry.flag_url = await getDownloadURL(flagRef);
      } else {
        this.currentCountry.flag_url = '/path/to/default/flag/image.png'; // Default or error handling
      }

      // Additional logic to fetch details like celebrity or holidays can be added here
      // Example: Fetching celebrity details
      if (this.currentCountry.celebrity_dir && this.currentCountry.celebrity_dir.startsWith('gs://')) {
        const celebRef = ref(storage, this.currentCountry.celebrity_dir);
        this.currentCountry.celebrity_url = await getDownloadURL(celebRef);
      }
    }
  }
});

