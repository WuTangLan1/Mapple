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
  <v-container class="px-4 py-3">
    <v-row>
      <v-col cols="12" sm="6" md="4" v-if="difficulty === 'easy'">
        <v-card class="pa-3" outlined tile>
          <div class="d-flex flex-column align-center">
            <v-img :src="flagUrl" height="150px" contain v-if="!isLoadingFlag"></v-img>
            <v-progress-circular indeterminate color="primary" v-else></v-progress-circular>
            <v-card-title class="pt-3">National Flag</v-card-title>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-3" outlined tile>
          <v-card-title>Capital</v-card-title>
          <v-card-text>{{ country.capital }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-3" outlined tile>
          <v-card-title>Dish</v-card-title>
          <v-card-text>{{ country.dish }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" v-if="difficulty === 'easy' || difficulty === 'medium'">
        <v-card class="pa-3" outlined tile>
          <v-card-title>Celebrity</v-card-title>
          <v-card-text>{{ country.celebrity }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4" v-if="difficulty === 'easy' || difficulty === 'medium'">
        <v-card class="pa-3" outlined tile>
          <v-card-title>Animal</v-card-title>
          <v-card-text>{{ country.animal }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-card class="pa-3" outlined tile>
          <v-card-title>Population</v-card-title>
          <v-card-text>{{ country.population }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>
.v-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>