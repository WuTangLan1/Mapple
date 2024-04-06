<!-- This is the code for the src\views\homeView.vue -->

<template>
  <div class="home-view">
    <FlagContainer />
    <MapContainer />
  </div>
</template>

<script>
import FlagContainer from '@/components/mappledir/flagdir/flagContainer.vue';
import MapContainer from '@/components/mappledir/mapdir/mapContainer.vue';

export default {
  name: 'HomeView',
  components: {
    FlagContainer,
    MapContainer
  }
}
</script>

<style scoped>
  .home-view {
    display: flex;
    flex-direction: column; /* Stack children vertically */
    height: calc(100vh - var(--header-height) - var(--footer-height)); /* Adjust based on your header/footer height */
    width: 100%;
    background-color: #ffffff;
    color: #333333;
  }
</style>





