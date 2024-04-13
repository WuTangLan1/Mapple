// this is the code for the useCountryStore 

import { defineStore } from 'pinia';
import { db } from '@/components/fbdir/fbInit'; // Ensure this import path matches your project structure
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    currentCountry: null,
    experiencedCountries: [],
    isLoadingFlag:false
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

      const celebSubCollectionRef = collection(db, `countries/${countryId}/celebrities`);
      const celebSnapshot = await getDocs(celebSubCollectionRef);
      const celebrities = celebSnapshot.docs.map(doc => doc.data());

      if (celebrities.length > 0) {
        const randomCelebIndex = Math.floor(Math.random() * celebrities.length);
        this.currentCountry.celebrity = celebrities[randomCelebIndex].name;
      }

      const blurbSubCollectionRef = collection(db, `countries/${countryId}/blurbs`);
      const blurbSnapshot = await getDocs(blurbSubCollectionRef);
      const blurbs = blurbSnapshot.docs.map(doc => doc.data());

      if (blurbs.length > 0) {
        const randomBlurbIndex = Math.floor(Math.random() * blurbs.length);
        this.currentCountry.blurb = blurbs[randomBlurbIndex].text;
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
      this.isLoadingFlag = true; 
      if (country.flag_dir && country.flag_dir.startsWith('gs://')) {
        const flagRef = ref(storage, country.flag_dir);
        country.flag_url = await getDownloadURL(flagRef);
      } else {
        country.flag_url = '/path/to/default/flag/image.png'; 
      }
      this.isLoadingFlag = false; 
    }
  }
});

