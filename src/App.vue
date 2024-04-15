<!-- This is the code for the src\App.vue -->
<template>
  <div id="app">
    <start-modal @difficultySelected="setDifficulty" v-if="showStartModal"/>
    <auth-modal v-if="showAuthModal" @close-modal="closeAuthModal" />
    <top-header @auth-modal-open="openAuthModal"/>
    <div class="router-view-container">
      <router-view v-if="difficultySelected" @gameOver="handleGameOver"/>
    </div>
    <bottom-footer/>
    <game-over-modal v-if="showGameOverModal" :score="gameScore" @restartGame="restartGame"/>
  </div>
</template>


<script>
import { ref } from 'vue';
import TopHeader from './components/homedir/topheader.vue';
import BottomFooter from './components/homedir/bottomfooter.vue';
import AuthModal from './components/auth/authModal.vue';
import StartModal from './components/homedir/startModal.vue';
import GameOverModal from './components/mappledir/additional/gameovermodal.vue';
import { useGameStore } from '@/stores/useGameStore';
import { useCountryStore } from '@/stores/useCountryStore'; 

export default {
  components: {
    TopHeader,
    BottomFooter,
    AuthModal,
    StartModal,
    GameOverModal
  },
  setup() {
    const difficultySelected = ref(false);
    const gameStore = useGameStore();
    const countryStore = useCountryStore();
    const gameOver = ref(false);
    const gameScore = ref(0);
    const showStartModal = ref(true);
    const showGameOverModal = ref(false);
    const showAuthModal = ref(false);

    function setDifficulty(level) {
      gameStore.setDifficulty(level);
      countryStore.resetCountries(true); 
      countryStore.getRandomCountry();
      difficultySelected.value = true;
      showStartModal.value = false;
      showGameOverModal.value = false;
    }

    function restartGame(level) {
      gameScore.value = 0;
      gameOver.value = false;
      countryStore.resetCountries(true);
      setDifficulty(level);
      showGameOverModal.value = false;
      showStartModal.value = false;
    }

    function handleGameOver(score) {
      gameScore.value = score;
      gameOver.value = true;
      difficultySelected.value = false;
      showGameOverModal.value = true;
      showStartModal.value = false;
    }

    function openAuthModal() {
      showAuthModal.value = true;
    }

    function closeAuthModal() {
      showAuthModal.value = false;
    }


    return {
      difficultySelected,
      setDifficulty,
      gameOver,
      gameScore,
      restartGame,
      handleGameOver,
      showStartModal,
      showGameOverModal,
      showAuthModal,
      openAuthModal,
      closeAuthModal
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


