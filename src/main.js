import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { fetchCountries } from './services/fetchCountries'; // Ensure the path is correct based on your project structure

// Async function to initialize the app after fetching countries
async function initApp() {
  try {
    // Fetch countries data before initializing the app
    const countries = await fetchCountries();
    console.log('Countries loaded:', countries);
    // Consider storing the countries in your Pinia store or another state management solution
  } catch (error) {
    console.error('Failed to fetch countries:', error);
  }

  // Create and mount the Vue app after fetching the countries
  createApp(App).use(router).mount('#app');
}

// Call initApp to start the app initialization
initApp();
