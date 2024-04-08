<!-- This is the code for the src\App.vue -->

<script>
import TopHeader from './components/homedir/topheader.vue';
import BottomFooter from './components/homedir/bottomfooter.vue';
import StartModal from './components/homedir/startModal.vue'

export default {
  components: {
    TopHeader,
    BottomFooter,
    StartModal
  },
  methods: {
    setDifficulty(level) {
      console.log("Difficulty selected:", level);
    }
  }
}
</script>

<template>
  <div id="app">
    <start-modal @difficultySelected="setDifficulty"/>
    <top-header/>
    <div class="router-view-container">
      <router-view/>
    </div>
    <bottom-footer/>
  </div>
</template>

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


