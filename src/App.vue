<!-- src\App.vue -->
<script>
import { ref } from 'vue';
import TopHeader from './components/homedir/topheader.vue';
import BottomFooter from './components/homedir/bottomfooter.vue';
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
    BottomFooter,
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

    const showPrivacyModal = ref(false);
    const showToSModal = ref(false);

    function openPrivacyModal() {
      showPrivacyModal.value = true;
    }

    function closePrivacyModal() {
      showPrivacyModal.value = false;
    }

    function openToSModal() {
      showToSModal.value = true;
    }

    function closeToSModal() {
      showToSModal.value = false;
    }

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
      openComingSoonModal
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
    <top-header @auth-modal-open="openAuthModal" @coming-soon-modal-open="openComingSoonModal"/>
    <div class="router-view-container">
      <router-view v-if="difficultySelected" @gameOver="handleGameOver"/>
    </div>
    <bottom-footer
      @footer-height-changed="updateRouterViewHeight"
      @open-privacy-modal="openPrivacyModal"
      @open-tos-modal="openToSModal"
    />
    <privacy-modal v-if="showPrivacyModal" @close-modal="closePrivacyModal" />
    <tos-modal v-if="showToSModal" @close-modal="closeToSModal" />
    <comingsoon-modal v-if="showComingSoonModal" @close-modal="closeComingSoonModal"/>
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


