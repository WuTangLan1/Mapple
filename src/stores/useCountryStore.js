// src/stores/countryStore.js
import { defineStore } from 'pinia';
import { db } from '@/components/fbdir/fbInit';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    currentCountry: null,
  }),
  actions: {
    async getRandomCountry() {
      // Assume countries have already been fetched and stored in the state
      const randomIndex = Math.floor(Math.random() * this.countries.length);
      this.currentCountry = this.countries[randomIndex];

      // Now fetch a random celebrity for the current country
      const celebsRef = collection(db, 'countries', this.currentCountry.id, 'celebrities');
      const q = query(celebsRef); // You can refine this to actually select random documents
      const celebSnapshot = await getDocs(q);
      const celebDocs = celebSnapshot.docs.map(doc => doc.data());
      const randomCelebIndex = Math.floor(Math.random() * celebDocs.length);
      this.currentCountry.celebrity = celebDocs[randomCelebIndex].name;
    },
    // ... other actions
  },
  // ... other options
});
