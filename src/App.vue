<!-- This is the code for the src\App.vue -->

<script>
import TopHeader from './components/homedir/topheader.vue';
import BottomFooter from './components/homedir/bottomfooter.vue';

export default {
  components: {
    TopHeader,
    BottomFooter
  }
}
</script>

<template>
  <div id="app">
    <top-header/>
    <div class="router-view-container">
      <router-view/>
    </div>
    <bottom-footer/>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  width: 100%;
}

.router-view-container {
  flex-grow: 1;
  width: 100%;
  overflow: auto; 
  height: calc(100vh - var(--footer-height + 100px));
  overflow: auto;
}

</style>


