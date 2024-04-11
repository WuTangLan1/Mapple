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
      <!-- Row 1 -->
      <div class="data-card flag-card">
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

      <!-- Row 2 -->
      <div class="data-card">
        <div class="label">Celebrity</div>
        <div class="data-value">{{ country.celebrity }}</div>
      </div>
      <div class="data-card">
        <div class="label">Currency</div>
        <div class="data-value">{{ country.currency }}</div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.prompt-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns for the first row */
  grid-template-rows: auto auto; /* 2 rows */
  gap: 1rem;
  text-align: center;
}

.data-card {
  background: #f4f4f4;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flag-card {
  grid-row: 1 / 3; /* Make the flag card span two rows */
}

.label {
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  font-size: 1.2rem;
}

.data-value {
  color: #555;
  font-size: 1rem;
  word-wrap: break-word;
}

.flag {
  max-width: 100%;
  max-height: 100px; /* Adjust flag size */
  margin-bottom: 10px;
  border-radius: 4px; /* Optional: rounds the corners of the flag image */
}
</style>


