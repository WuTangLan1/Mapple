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
    const isLoadingFlag = computed(() => countryStore.isLoadingFlag); // Access loading state

    return {
      country,
      difficulty,
      isLoadingFlag, 
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
          <img v-if="difficulty === 'easy' && !isLoadingFlag" :src="country.flag_url" alt="National Flag" class="flag"/>
          <img v-else-if="difficulty === 'easy' && isLoadingFlag" src="@/assets/images/loading.gif" alt="Loading" class="loading"/>
          <img v-else src="@/assets/images/questionmark/qmark.png" alt="Question Mark" class="placeholder"/>
        </div>
      </transition>

      <!-- Capital City card: shown on easy and medium level -->
      <transition name="wipe" mode="out-in">
        <div class="data-card capital-card">
        <div v-if="difficulty === 'easy' || difficulty === 'medium'"  class="label">Capital</div>
        <div v-if="difficulty === 'easy' || difficulty === 'medium'" class="data-value">{{ country.capital }}</div>
        <img v-else src="@/assets/images/questionmark/qmark.png" alt="Question Mark" class="placeholder"/>
      </div>
      </transition>

      <!-- National Dish card: shown on easy and hard level -->
      <div class="data-card dish-card">
        <div class="label">Dish</div>
        <div class="data-value">{{ country.dish }}</div>
      </div>
      <!-- Celebrity card: shown on easy and medium level -->
      <div class="data-card celebrity-card">
        <div v-if="difficulty === 'easy' || difficulty === 'medium'" class="label">Celebrity</div>
        <div v-if="difficulty === 'easy' || difficulty === 'medium'" class="data-value">{{ country.celebrity }}</div>
        <img v-else src="@/assets/images/questionmark/qmark.png" alt="Question Mark" class="placeholder"/>
      </div>
      <!-- National Animal card: shown on easy and medium level -->
      <div class="data-card animal-card">
        <div class="label">Animal</div>
        <div class="data-value">{{ country.animal }}</div>
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
  height: 25%;
  margin: 0 auto;
  padding: 1%; /* Adjust as necessary to maintain the overall size */
  display: flex;
  flex-direction: column;
  justify-content: center; 
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
  padding: 5px; /* Further reduced padding if necessary */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
  margin-bottom: 0.2em;
}

.wipe-enter-active, .wipe-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.wipe-enter, .wipe-leave-to  {
  opacity: 0;
  transform: translateX(100%);
}

.flag-card { background-color: #ffe5e5; } 
.capital-card { background-color: #e5f4ff; }
.dish-card { background-color: #e5ffe5; } 
.celebrity-card { background-color: #fff5e5; } 
.animal-card { background-color: #e5e5ff; } 
.population-card { background-color: #f5e5ff; } 

.loading {
  width: 50px;
  height: 50px;
  margin: auto; 
}

.label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.data-value {
  font-size: 0.9rem;
  color: #333;
}

.placeholder {
  max-width: 70%; 
  margin: auto; 
}

.flag {
  max-width: 50%; 
  margin: auto;
}
</style>
