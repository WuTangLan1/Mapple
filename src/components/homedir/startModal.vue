<!-- This is the code for the startModal.vue component  -->

<script>
import { useCountryStore } from '@/stores/useCountryStore';
import { ref } from 'vue';

export default {
  setup() {
    const isVisible = ref(true);
    const countryStore = useCountryStore();

    function selectDifficulty(level) {
      isVisible.value = false;
      countryStore.getRandomCountry();
      this.$emit('difficultySelected', level);
    }

    return { isVisible, selectDifficulty };
  },
};
</script>

<template>
  <v-dialog v-model="isVisible" persistent max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Welcome to Mapple</v-card-title>
      <v-card-text>
        Guess the country based on the clue given. Select your difficulty level to start playing.
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" text @click="selectDifficulty('easy')">Easy</v-btn>
        <v-btn color="blue" text @click="selectDifficulty('medium')">Medium</v-btn>
        <v-btn color="purple" text @click="selectDifficulty('hard')">Hard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style>
