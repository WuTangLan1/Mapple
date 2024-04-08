<!-- This is the code for the src\views\homeView.vue -->

<template>
  <div class="home-view">
    <PromptContainer />
    <MapContainer />
  </div>
</template>

<script>
import PromptContainer from '@/components/mappledir/promptdir/promptContainer.vue';
import MapContainer from '@/components/mappledir/mapdir/mapContainer.vue';

export default {
  name: 'HomeView',
  components: {
    PromptContainer,
    MapContainer
  }
}
</script>

<style scoped>
  .home-view {
    display: flex;
    flex-direction: column;
    height:100%;
    width: 100%;
    background-color: #ffffff;
    color: #333333;
  }
</style>





