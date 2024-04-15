<!-- This is the code for the src\views\homeView.vue -->

<script>
import PromptContainer from '@/components/mappledir/promptdir/promptContainer.vue';
import MapContainer from '@/components/mappledir/mapdir/mapContainer.vue';
import correctModal from '@/components/mappledir/additional/correctModal.vue'
import { useCountryStore } from '@/stores/useCountryStore.js';
import { useGameStore } from '@/stores/useGameStore';
import { computed, ref } from 'vue';

export default {
  name: 'HomeView',
  components: {
    PromptContainer,
    MapContainer,
    correctModal
  },
  setup() {
    const gameStore = useGameStore();
    const difficulty = computed(() => gameStore.difficulty);

    const componentKey = ref(0);

    const showCorrectModal = ref(false);

    const correctCountry = ref(null);

    function correctGuessHandler(countryData) {
        correctCountry.value = countryData;
        showCorrectModal.value = true;
    }

    function closeModal() {
        showCorrectModal.value = false;
        fetchNextCountry();
    }


    function fetchNextCountry() {
      const countryStore = useCountryStore();
      countryStore.getRandomCountry().then(() => {
        componentKey.value++; // Trigger re-render by updating key
      });
    }

    return { 
      difficulty, 
      componentKey, 
      showCorrectModal,
      correctGuessHandler,
      closeModal,
      fetchNextCountry ,
      correctCountry
    };
  },
  async created() {
    const countryStore = useCountryStore();
    if (typeof countryStore.fetchCountries === 'function') {
      await countryStore.fetchCountries();
    } else {
      console.error('fetchCountries method is not defined');
    }
  },
  methods : {
    handleModalClose() {
    this.showCorrectModal = false;
    this.$refs.mapContainer.resetMap();
    this.$refs.promptContainer.refreshPrompts();
  },
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

};
</script>

<template>
  <div class="home-view">
    <PromptContainer v-if="difficulty" :key="componentKey" />
    <MapContainer ref="mapContainer" v-if="difficulty" @gameOver="handleGameOver" @correctGuess="correctGuessHandler" @refreshData="refreshData"/>
    <correct-modal :visible="showCorrectModal" :country="correctCountry" @close="closeModal"/>
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





