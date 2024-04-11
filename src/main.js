import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { fetchCountries } from './services/fetchCountries';
import { createPinia } from 'pinia'; // Import createPinia

async function initApp() {
  const pinia = createPinia(); // Create a Pinia instance

  try {
    const countries = await fetchCountries();
    console.log('Countries loaded:', countries);

    const countryStore = useCountryStore(); // Use your store
    countryStore.setCountries(countries); // Store the countries data
  } catch (error) {
    console.error('Failed to fetch countries:', error);
  }

  createApp(App).use(router).use(pinia).mount('#app'); // Use Pinia with your Vue app
}

initApp();
