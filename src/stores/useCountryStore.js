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
    lastCountryId: null ,
    isLoadingFlag:false
  }),
  actions: {
    async resetCountries(excludeLastCountry = false) {
      this.experiencedCountries = [];
      console.log('reset method called excluded country: ')
      await this.fetchCountries(true, excludeLastCountry);
    },
    async fetchCountries(shouldShuffle = false, excludeLastCountry = false) {
      const querySnapshot = await getDocs(collection(db, "countries"));
      let fetchedCountries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      if (shouldShuffle) {
        fetchedCountries = this.shuffleCountries(fetchedCountries);
      }
      if (excludeLastCountry && this.lastCountryId) {
        fetchedCountries = fetchedCountries.filter(c => c.id !== this.lastCountryId);
      }
      this.countries = fetchedCountries;
    },
    shuffleCountries(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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
        await this.fetchCountries(true, true); // Also exclude the last country on refresh
        filteredCountries = this.countries;
      }
      const randomIndex = Math.floor(Math.random() * filteredCountries.length);
      this.currentCountry = filteredCountries[randomIndex];
      this.experiencedCountries.push(this.currentCountry.id);
      this.lastCountryId = this.currentCountry.id; 
      console.log("Selected new country: ", this.currentCountry);
      await this.fetchAdditionalData(this.currentCountry);
      await this.fetchRandomCelebrityAndHoliday(this.currentCountry.id);
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

