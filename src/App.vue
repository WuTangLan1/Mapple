<!-- src\App.vue -->
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
  },
  mounted() {
    this.updateRouterViewHeight();
  },
  updated() {
    this.updateRouterViewHeight();
  },
  methods: {
    updateRouterViewHeight() {
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10);
      const footerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--footer-height'), 10);
      const newRouterViewHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
      document.documentElement.style.setProperty('--router-view-height', newRouterViewHeight);
    }
  }

}
</script>

<template>
  <div id="app">
    <start-modal @difficultySelected="setDifficulty" v-if="showStartModal"/>
    <auth-modal v-if="showAuthModal" @close-modal="closeAuthModal" />
    <top-header @auth-modal-open="openAuthModal"/>
    <div class="router-view-container">
      <router-view v-if="difficultySelected" @gameOver="handleGameOver"/>
    </div>
    <bottom-footer @footer-height-changed="updateRouterViewHeight"/>
    <game-over-modal v-if="showGameOverModal" :score="gameScore" @restartGame="restartGame"/>
  </div>
</template>

<style>
 @import '@/assets/css/styles.css';
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.router-view-container {
    height: var(--router-view-height);
    transition: height 0.3s ease-in-out;
    overflow: auto;
}
</style>


