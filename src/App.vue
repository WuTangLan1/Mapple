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
    <router-view/>
    <bottom-footer/>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
