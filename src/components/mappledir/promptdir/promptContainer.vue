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
      <div class="data-card flag-card">
        <div class="label">Flag</div>
        <img v-if="difficulty === 'easy'" :src="country.flag_url" alt="National Flag" class="flag"/>
        <img v-else src="@/assets/images/questionmark/question_mark.png" alt="Question Mark" class="placeholder"/>
      </div>
      <!-- Capital City card: shown on easy and medium level -->
      <div class="data-card capital-card">
        <div class="label">Capital City</div>
        <div v-if="difficulty === 'easy' || difficulty === 'medium'" class="data-value">{{ country.capital }}</div>
        <img v-else src="@/assets/images/questionmark/question_mark.png" alt="Question Mark" class="placeholder"/>
      </div>
      <!-- National Dish card: shown on easy and hard level -->
      <div class="data-card dish-card">
        <div class="label">National Dish</div>
        <div v-if="difficulty === 'easy' || difficulty === 'hard'" class="data-value">{{ country.dish }}</div>
        <img v-else src="@/assets/images/questionmark/question_mark.png" alt="Question Mark" class="placeholder"/>
      </div>
      <!-- Celebrity card: shown on easy and medium level -->
      <div class="data-card celebrity-card">
        <div class="label">Celebrity</div>
        <div v-if="difficulty === 'easy' || difficulty === 'medium'" class="data-value">{{ country.celebrity }}</div>
        <img v-else src="@/assets/images/questionmark/question_mark.png" alt="Question Mark" class="placeholder"/>
      </div>
      <!-- Public Holiday card: shown on easy and medium level -->
      <div class="data-card holiday-card">
        <div class="label">Public Holiday</div>
        <div v-if="difficulty === 'easy' || difficulty === 'medium'" class="data-value">{{ country.holiday }}</div>
        <img v-else src="@/assets/images/questionmark/question_mark.png" alt="Question Mark" class="placeholder"/>
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

.placeholder {
  max-width: 50%; /* Set the size of the placeholder image */
  margin: auto; /* Center the placeholder image in the card */
}

.flag {
  max-width: 40%; /* Reduced width to fit in smaller card */
  border-radius: 4px;
  margin: auto;
}
</style>
