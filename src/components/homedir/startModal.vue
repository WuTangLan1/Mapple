<!-- This is the code for the startModal.vue component  -->


<script>
import { useCountryStore } from '@/stores/useCountryStore';
export default {
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
  selectDifficulty(level) {
    this.$emit('difficultySelected', level);
    this.isVisible = false;
    const countryStore = useCountryStore();
    countryStore.getRandomCountry();
  },
},
};
</script>

<template>
  <v-dialog v-model="isVisible" persistent max-width="500px">
    <v-card>
      <v-card-title class="text-h5">Welcome to Mapple</v-card-title>
      <v-card-text class="subtitle-1">
        Guess the country based on the clue given. Select your difficulty level to start playing.
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="green" class="mx-2" outlined @click="selectDifficulty('easy')">Easy</v-btn>
        <v-btn color="blue" class="mx-2" outlined @click="selectDifficulty('medium')">Medium</v-btn>
        <v-btn color="purple" class="mx-2" outlined @click="selectDifficulty('hard')">Hard</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-card-title {
  text-align: center;
  font-weight: bold;
}

.v-card-text {
  margin-bottom: 20px;
}

.v-btn {
  min-width: 100px;
}
</style>
