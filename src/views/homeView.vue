<!-- src\views\homeView.vue -->

<script>
import PromptContainer from '@/components/mappledir/promptdir/promptContainer.vue';
import MapContainer from '@/components/mappledir/mapdir/mapContainer.vue';
import correctModal from '@/components/mappledir/additional/correctModal.vue'
import { useCountryStore } from '@/stores/useCountryStore.js';
import { useGameStore } from '@/stores/useGameStore';
import { useAuthStore } from '@/stores/useAuthStore';
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
        console.log("Toggling modal visibility");
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
        componentKey.value++; 
      });
    }

    return { 
      difficulty, 
      componentKey, 
      showCorrectModal,
      correctGuessHandler,
      closeModal,
      fetchNextCountry ,
      correctCountry,
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
  handleGameOver(score, countryName) {
    this.$emit('gameOver', score, countryName);
    const authStore = useAuthStore();
    authStore.updateHighScore(score); 
  },
    refreshData() {
    const countryStore = useCountryStore();
    countryStore.getRandomCountry().then(() => {
      this.componentKey++; 
    });
  }
  },

};
</script>

<template>
  <v-container fluid>
    <div class="home-view">
      <div class="prompt-container">
        <prompt-container v-if="difficulty" :key="componentKey" />
      </div>
      <div class="map-container">
        <map-container 
        ref="mapContainer" 
        v-if="difficulty" 
        @gameOver="handleGameOver" 
        @correctGuess="correctGuessHandler" 
        @refreshData="refreshData"/>
      </div>
    </div>
    <correct-modal
      :visible="showCorrectModal"
      @update:visible="val => showCorrectModal = val"
      :country="correctCountry"
      @close="closeModal"
    />
  </v-container>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 800px;
  margin: auto;
}

.prompt-container {
  margin-bottom: 20px;
}

.prompt-container, .map-container {
  flex: 1; 
  overflow: auto;
}

@media (max-width: 600px) { 
  .home-view {
    flex-direction: column;
  }
  
  .prompt-container, .map-container {
    flex: 1 1 50%; 
  }
}
</style>



