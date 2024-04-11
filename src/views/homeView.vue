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
import { useCountryStore } from '@/stores/useCountryStore.js';

export default {
  name: 'HomeView',
  components: {
    PromptContainer,
    MapContainer
  },
  async created() {
    const countryStore = useCountryStore();
    if (typeof countryStore.fetchCountries === 'function') {
      await countryStore.fetchCountries();
    } else {
      console.error('fetchCountries method is not defined');
    }
  }
};
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





