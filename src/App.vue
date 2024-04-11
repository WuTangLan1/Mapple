<!-- This is the code for the src\App.vue -->

<template>
  <div id="app">
    <start-modal @difficultySelected="setDifficulty" v-if="!difficultySelected"/>
    <top-header/>
    <div class="router-view-container">
      <router-view v-if="difficultySelected"/>
    </div>
    <bottom-footer/>
  </div>
</template>

<script>
import { ref } from 'vue';
import TopHeader from './components/homedir/topheader.vue';
import BottomFooter from './components/homedir/bottomfooter.vue';
import StartModal from './components/homedir/startModal.vue';
import { useGameStore } from '@/stores/useGameStore'; // Import the game store

export default {
  components: {
    TopHeader,
    BottomFooter,
    StartModal
  },
  setup() {
    const difficultySelected = ref(false); // Reactive variable to track difficulty selection
    const gameStore = useGameStore(); // Use the game store

    // Method to set difficulty and mark as selected
    function setDifficulty(level) {
      gameStore.setDifficulty(level); // Set difficulty in the store
      difficultySelected.value = true; // Mark as selected to render other components
    }

    return { difficultySelected, setDifficulty };
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
  height: calc(100vh - var(--header-height) - var(--footer-height));
}

</style>


