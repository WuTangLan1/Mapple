<!-- src\App.vue -->
<script>
import { ref } from 'vue';
import TopHeader from './components/homedir/topheader.vue';
import AuthModal from './components/auth/authModal.vue';
import StartModal from './components/homedir/startModal.vue';
import GameOverModal from './components/mappledir/additional/gameovermodal.vue';
import PrivacyModal from './components/homedir/additional/privacyModal.vue';
import tosModal from './components/homedir/additional/tosModal.vue';
import comingsoonModal from './components/homedir/additional/comingsoonModal.vue'
import { useGameStore } from '@/stores/useGameStore';
import { useCountryStore } from '@/stores/useCountryStore'; 

export default {
  components: {
    TopHeader,
    AuthModal,
    StartModal,
    GameOverModal,
    PrivacyModal,
    tosModal,
    comingsoonModal
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
    const lastCountryName = ref('');


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

    function handleGameOver(score, countryName) {
      gameScore.value = score;
      lastCountryName.value = countryName;  
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

    const showPrivacyModal = ref(false);
    const showToSModal = ref(false);

    const openToSModal = () => {
      showToSModal.value = true;
    };

    const closeToSModal = () => {
      showToSModal.value = false;
    };

    const openPrivacyModal = () => {
      showPrivacyModal.value = true;
    };

    const closePrivacyModal = () => {
      showPrivacyModal.value = false;
    };

    const showComingSoonModal = ref(false);

    const openComingSoonModal = () => {
      showComingSoonModal.value = true;
    };

    const closeComingSoonModal = () => {
      showComingSoonModal.value = false;
    };

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
      closeAuthModal,
      openPrivacyModal,
      closePrivacyModal,
      openToSModal,
      closeToSModal,
      showPrivacyModal,
      showToSModal,
      showComingSoonModal,
      closeComingSoonModal,
      openComingSoonModal,
      lastCountryName
    };
  },

}
</script>

<template>
  <v-app>
    <div id="app">
      <top-header
        @auth-modal-open="openAuthModal"
        @coming-soon-modal-open="openComingSoonModal"
        @tos-modal-open="openToSModal"
        @privacy-modal-open="openPrivacyModal" />
      <start-modal @difficultySelected="setDifficulty" v-if="showStartModal"/>
      <auth-modal v-if="showAuthModal" @close-modal="closeAuthModal" />
      <div class="router-view-container">
        <router-view v-if="difficultySelected" @gameOver="handleGameOver"/>
      </div>
      <privacy-modal :value="showPrivacyModal" @input="value => showPrivacyModal = value" />
      <tos-modal :value="showToSModal" @input="value => showToSModal = value" />
      <comingsoon-modal v-model="showComingSoonModal"/>
      <game-over-modal v-if="showGameOverModal" :score="gameScore" :countryName="lastCountryName" @restartGame="restartGame"/>
    </div>
  </v-app>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: background-color 0.3s, color 0.3s;
}

body:not(.dark) #app {
  background-color: #f3f4f6; 
  color: #2c3e50;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  overflow-y: auto;
}

.top-header {
    flex: 0 0 auto;
    height: 64px; 
  }

  .router-view-container {
    flex: 1;
    overflow-y: auto;
    margin-top: 64px; /* Same as the height of the top-header */
  }
</style>
