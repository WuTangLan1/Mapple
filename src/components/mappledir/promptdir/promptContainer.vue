<!-- This is the code for the src\components\mappledir\promptdir\promptContainer.vue -->

<script>
import { computed } from 'vue';
import { useCountryStore } from '@/stores/useCountryStore.js';

export default {
  name: 'PromptContainer',
  setup() {
    const countryStore = useCountryStore();
    
    // Computed property to reactively update the template when the current country changes
    const country = computed(() => countryStore.currentCountry);

    return {
      country
    };
  }
}
</script>

<template>
  <div class="container">
    <div v-if="country" class="prompt-container">
      <div class="data-card">
        <div class="label">Flag</div>
        <img :src="country.flag_url" alt="National Flag" class="flag"/>
      </div>
      <div class="data-card">
        <div class="label">Capital City</div>
        <div class="data-value">{{ country.capital }}</div>
      </div>
      <div class="data-card">
        <div class="label">National Dish</div>
        <div class="data-value">{{ country.dish }}</div>
      </div>
      <div class="data-card">
        <div class="label">Celebrity</div>
        <div class="data-value">{{ country.celebrity }}</div>
      </div>
      <div class="data-card">
        <div class="label">Public Holiday</div>
        <div class="data-value">{{ country.holiday }}</div>
      </div>
      <div class="data-card">
        <div class="label">Population</div>
        <div class="data-value">{{ country.population }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px; /* Reduced max-width for a tighter layout */
  margin: 0 auto;
  padding: 20px;
}

.prompt-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 20px;
  text-align: center;
}

.data-card {
  background: #f4f4f4;
  border-radius: 10px; /* Slightly more rounded corners */
  padding: 20px; /* Adjust padding */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 10%;
}

.flag-card {
  grid-row: 1 / 3; /* Make the flag card span two rows */
}

.label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.data-value {
  font-size: 0.9rem;
  color: #333;
}

.flag {
  max-width: 100%;
  max-height: 100px; /* Adjust flag size */
  margin-bottom: 10px;
  border-radius: 4px; /* Optional: rounds the corners of the flag image */
}
</style>


