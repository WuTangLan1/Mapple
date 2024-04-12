<!-- This is the code for the src\components\mappledir\promptdir\promptContainer.vue -->

<script>
import { computed } from 'vue';
import { useCountryStore } from '@/stores/useCountryStore.js';
import { useGameStore } from '@/stores/useGameStore';

export default {
  name: 'PromptContainer',
  setup() {
    const countryStore = useCountryStore();
    const gameStore = useGameStore();

    const country = computed(() => countryStore.currentCountry);
    const difficulty = computed(() => gameStore.difficulty);

    return {
      country,
      difficulty,
    };
  }
};

</script>
<template>
  <div class="container">
    <div v-if="country" class="prompt-container">
      <!-- Flag card: shown on easy level -->
      <transition name="wipe" mode="out-in">
        <div class="data-card flag-card">
          <div v-if="difficulty === 'easy'" class="label">Flag</div>
          <img v-if="difficulty === 'easy'" :src="country.flag_url" alt="National Flag" class="flag"/>
          <img v-else src="@/assets/images/questionmark/qmark.png" alt="Question Mark" class="placeholder"/>
      </div>
      </transition>

      <!-- Capital City card: shown on easy and medium level -->
      <transition name="wipe" mode="out-in">
        <div class="data-card capital-card">
        <div v-if="difficulty === 'easy' || difficulty === 'medium'"  class="label">Capital City</div>
        <div v-if="difficulty === 'easy' || difficulty === 'medium'" class="data-value">{{ country.capital }}</div>
        <img v-else src="@/assets/images/questionmark/qmark.png" alt="Question Mark" class="placeholder"/>
      </div>
      </transition>

      <!-- National Dish card: shown on easy and hard level -->
      <div class="data-card dish-card">
        <div class="label">National Dish</div>
        <div class="data-value">{{ country.dish }}</div>
      </div>
      <!-- Celebrity card: shown on easy and medium level -->
      <div class="data-card celebrity-card">
        <div v-if="difficulty === 'easy' || difficulty === 'medium'" class="label">Celebrity</div>
        <div v-if="difficulty === 'easy' || difficulty === 'medium'" class="data-value">{{ country.celebrity }}</div>
        <img v-else src="@/assets/images/questionmark/qmark.png" alt="Question Mark" class="placeholder"/>
      </div>
      <!-- Public Holiday card: shown on easy and medium level -->
      <div class="data-card holiday-card">
        <div v-if="difficulty === 'easy' " class="label">Public Holiday</div>
        <div v-if="difficulty === 'easy'" class="data-value">{{ country.holiday }}</div>
        <img v-else src="@/assets/images/questionmark/qmark.png" alt="Question Mark" class="placeholder"/>
      </div>
      <!-- Population card: always shown -->
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
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr); /* Two equal rows */
  gap: 1%; /* Reduced gap between rows and columns */
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
  height: 70%;
}

.wipe-enter-active, .wipe-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.wipe-enter, .wipe-leave-to /* Starting and ending state for entering/leaving */ {
  opacity: 0;
  transform: translateX(100%);
}

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

.placeholder {
  max-width: 70%; /* Set the size of the placeholder image */
  margin: auto; /* Center the placeholder image in the card */
}

.flag {
  max-width: 40%; /* Reduced width to fit in smaller card */
  border-radius: 4px;
  margin: auto;
}
</style>
