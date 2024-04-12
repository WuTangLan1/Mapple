<!-- This is the code for the src\views\homeView.vue -->

<script>
import PromptContainer from '@/components/mappledir/promptdir/promptContainer.vue';
import MapContainer from '@/components/mappledir/mapdir/mapContainer.vue';
import { useCountryStore } from '@/stores/useCountryStore.js';
import { useGameStore } from '@/stores/useGameStore';
import { computed, ref } from 'vue';

export default {
  name: 'HomeView',
  components: {
    PromptContainer,
    MapContainer
  },
  methods : {
    handleGameOver(score) {
      this.$emit('gameOver', score);  // Emitting again to bubble up
    },
    refreshData() {
    const countryStore = useCountryStore();
    countryStore.getRandomCountry().then(() => {
      this.componentKey++; // Trigger re-render by updating key
    });
  }
  },
  async created() {
    const countryStore = useCountryStore();
    if (typeof countryStore.fetchCountries === 'function') {
      await countryStore.fetchCountries();
    } else {
      console.error('fetchCountries method is not defined');
    }
  },
  setup() {
    const gameStore = useGameStore();
    const difficulty = computed(() => gameStore.difficulty);

    const componentKey = ref(0);

    return { difficulty, componentKey}
  }
};
</script>

<template>
  <div class="home-view">
    <PromptContainer v-if="difficulty" :key="componentKey" />
    <MapContainer v-if="difficulty" @gameOver="handleGameOver" @correctGuess="refreshData" @refreshData="refreshData"/>
  </div>
</template>

<style scoped>
  .home-view {
    display: flex;
    flex-direction: column;
    height:100%;
    width: 100%;
    background-color: #ffffff;
    color: #333333;
  }
</style>





