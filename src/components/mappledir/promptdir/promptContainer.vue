<!-- This is the code for the src\components\mappledir\promptdir\promptContainer.vue -->

<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col cols="12" md="4" v-for="(item, index) in items" :key="index">
        <v-card
          :color="item.color"
          class="d-flex flex-column align-center justify-center pa-3 text-center"
          elevation="2"
          hover
        >
          <div class="text-h6 mb-2">{{ item.label }}</div>
          <div v-if="difficulty === item.levels && !isLoadingFlag">
            <img v-if="item.type === 'image'" :src="country[item.value]" alt="Data Image" class="flag">
            <div v-else class="text-subtitle-1">{{ country[item.value] }}</div>
          </div>
          <div v-else>
            <v-img :src="item.placeholder" aspect-ratio="1.6"></v-img>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

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

    const items = [
      { label: 'Flag', value: 'flag_url', type: 'image', color: 'pink lighten-4', levels: 'easy', placeholder: '@/assets/images/questionmark/qmark.png' },
      { label: 'Capital', value: 'capital', color: 'blue lighten-4', levels: 'easy', placeholder: '@/assets/images/questionmark/qmark.png' },
      { label: 'Dish', value: 'dish', color: 'green lighten-4', levels: 'easy', placeholder: '@/assets/images/questionmark/qmark.png' },
      { label: 'Celebrity', value: 'celebrity', color: 'amber lighten-4', levels: 'easy', placeholder: '@/assets/images/questionmark/qmark.png' },
      { label: 'Animal', value: 'animal', color: 'purple lighten-4', levels: 'easy', placeholder: '@/assets/images/questionmark/qmark.png' },
      { label: 'Population', value: 'population', color: 'deep-purple lighten-4', levels: 'easy', placeholder: '@/assets/images/questionmark/qmark.png' },
    ];

    return {
      country,
      difficulty,
      isLoadingFlag,
      items,
    };
  }
};
</script>

<style scoped>
.flag {
  max-width: 100%;
  border-radius: 8px;
}
</style>
