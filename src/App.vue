<!-- This is the code for the src\App.vue -->

<template>
  <div id="app">
    <start-modal @difficultySelected="setDifficulty" v-if="!difficultySelected"/>
    <top-header/>
    <div class="router-view-container">
      <router-view v-if="difficultySelected" @gameOver="handleGameOver"/>
    </div>
    <bottom-footer/>
    <game-over-modal v-if="gameOver" :score="gameScore" @restartGame="restartGame"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import TopHeader from './components/homedir/topheader.vue';
import BottomFooter from './components/homedir/bottomfooter.vue';
import StartModal from './components/homedir/startModal.vue';
import GameOverModal from './components/mappledir/additional/gameovermodal.vue';
import { useGameStore } from '@/stores/useGameStore';
import { useCountryStore } from '@/stores/useCountryStore'; // Ensure this is imported

export default {
  components: {
    TopHeader,
    BottomFooter,
    StartModal,
    GameOverModal
  },
  setup() {
    const difficultySelected = ref(false);
    const gameStore = useGameStore();
    const countryStore = useCountryStore();
    const gameOver = ref(false);
    const gameScore = ref(0);

    function setDifficulty(level) {
      gameStore.setDifficulty(level);
      countryStore.resetCountries(); 
      countryStore.getRandomCountry();
      difficultySelected.value = true;
      gameOver.value = false;
    }

    function restartGame(level) {
      gameScore.value = 0;
      gameOver.value = false;
      countryStore.resetCountries(); 
      setDifficulty(level);
    }

    function handleGameOver(score) {
      gameScore.value = score;
      gameOver.value = true;
      difficultySelected.value = false;
    }

    return {
      difficultySelected,
      setDifficulty,
      gameOver,
      gameScore,
      restartGame,
      handleGameOver
    };
  }
}
</script>




<style>
@import './assets/css/styles.css';
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  max-height: 100vh;
  width: 100%;
}

.router-view-container {
  flex-grow: 1;
  width: 100%;
  overflow: auto; 
}

</style>


