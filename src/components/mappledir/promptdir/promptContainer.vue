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
      <!-- Flag card with its unique class for pastel background color -->
      <div class="data-card flag-card">
        <img :src="country.flag_url" alt="National Flag" class="flag"/>
      </div>
      <!-- Capital City card with its unique class for pastel background color -->
      <div class="data-card capital-card">
        <div class="label">Capital City</div>
        <div class="data-value">{{ country.capital }}</div>
      </div>
      <!-- National Dish card with its unique class for pastel background color -->
      <div class="data-card dish-card">
        <div class="label">National Dish</div>
        <div class="data-value">{{ country.dish }}</div>
      </div>
      <!-- Celebrity card with its unique class for pastel background color -->
      <div class="data-card celebrity-card">
        <div class="label">Celebrity</div>
        <div class="data-value">{{ country.celebrity }}</div>
      </div>
      <!-- Public Holiday card with its unique class for pastel background color -->
      <div class="data-card holiday-card">
        <div class="label">Public Holiday</div>
        <div class="data-value">{{ country.holiday }}</div>
      </div>
      <!-- Population card with its unique class for pastel background color -->
      <div class="data-card population-card">
        <div class="label">Population</div>
        <div class="data-value">{{ country.population }}</div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  height: 50%;
  margin: 0 auto;
  padding: 1%; /* Adjust as necessary to maintain the overall size */
  display: flex;
  flex-direction: column;
  justify-content: center; /* This will center the content vertically */
}

.prompt-container {
  margin-top: 5%;
  display: grid;
  width: 100%;
  height: 90%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr); /* Two equal rows */
  gap: 10px; /* Reduced gap between rows and columns */
  text-align: center;
}
.data-card {
  background: #f4f4f4;
  border-radius: 10px;
  padding: 10px; /* Further reduced padding if necessary */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Remove margin if you want to reduce space between cards */
  height: calc(50% - 10px); /* Adjust the calc() to account for the new gap */
}


/* Individual background colors for each card */
.flag-card { background-color: #ffe5e5; } /* Pastel red */
.capital-card { background-color: #e5f4ff; } /* Pastel blue */
.dish-card { background-color: #e5ffe5; } /* Pastel green */
.celebrity-card { background-color: #fff5e5; } /* Pastel orange */
.holiday-card { background-color: #e5e5ff; } /* Pastel purple */
.population-card { background-color: #f5e5ff; } /* Pastel pink */


.label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px; /* Reduced bottom margin */
}

.data-value {
  font-size: 0.9rem;
  color: #333;
}

.flag {
  max-width: 80%; /* Reduced width to fit in smaller card */
  max-height: 80px; /* Reduced flag height */
  margin-bottom: 5px;
  border-radius: 4px;
}
</style>
