import { defineStore } from 'pinia';
import { db } from '@/components/fbdir/fbInit';
import { collection,  getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Initialize Firebase Storage
const storage = getStorage();

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [],
    currentCountry: null,
  }),
  actions: {
    async fetchCountries() {
      const querySnapshot = await getDocs(collection(db, "countries"));
      this.countries = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
    },
    async getRandomCountry() {
      // Ensure there are countries to choose from
      if (this.countries.length === 0) {
        await this.fetchCountries();
      }
      const randomIndex = Math.floor(Math.random() * this.countries.length);
      this.currentCountry = this.countries[randomIndex];

      // Check if flag_dir is a Firebase Storage path and fetch the download URL
      if (this.currentCountry.flag_dir && this.currentCountry.flag_dir.startsWith('gs://')) {
        const flagRef = ref(storage, this.currentCountry.flag_dir);
        this.currentCountry.flag_url = await getDownloadURL(flagRef);
      } else {
        // Set a default flag or handle the error
        this.currentCountry.flag_url = '/path/to/default/flag/image.png';
      }

      // Fetch a random celebrity for the current country
      const celebsRef = collection(db, 'countries', this.currentCountry.id, 'celebrities');
      const celebsSnapshot = await getDocs(celebsRef);
      const celebDocs = celebsSnapshot.docs.map(doc => doc.data());
      const randomCelebIndex = Math.floor(Math.random() * celebDocs.length);
      this.currentCountry.celebrity = celebDocs[randomCelebIndex].name;

      // Fetch a random holiday for the current country
      const holidaysRef = collection(db, 'countries', this.currentCountry.id, 'holidays');
      const holidaysSnapshot = await getDocs(holidaysRef);
      const holidayDocs = holidaysSnapshot.docs.map(doc => doc.data());
      const randomHolidayIndex = Math.floor(Math.random() * holidayDocs.length);
      this.currentCountry.holiday = holidayDocs[randomHolidayIndex].name;
    },
  },
});
