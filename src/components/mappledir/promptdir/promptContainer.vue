<!-- This is the code for the src\components\mappledir\promptdir\promptContainer.vue -->

<template>
  <div class="prompt-container">
    <img :src="country.flag_dir" alt="National Flag" class="flag"/>
    <h2>{{ country.cap_city }}</h2>
    <p>{{ country.language }}</p>
    <p>{{ country.celebrity }}</p>
    <p>{{ country.currency }}</p>
    <p>{{ country.national_dish }}</p>
  </div>
</template>

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

<style scoped>
.flag {
  width: 100px; /* Adjust size accordingly */
  height: auto;
}
.prompt-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: center;
  justify-items: center;
}
</style>
