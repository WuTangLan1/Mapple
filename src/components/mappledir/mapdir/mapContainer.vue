<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->

<template>
  <div class="map-container" ref="globeContainer"></div>
</template>

<script>
import Globe from 'globe.gl';
import { onMounted, ref, nextTick } from 'vue';

export default {
  name: 'MapContainer',
  setup() {
    const globeContainer = ref(null);

    onMounted(async () => {
      await nextTick(); // Ensure the DOM has updated with the globe container
      
      // Initialize the globe
      const globe = Globe()(globeContainer.value)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg')
        .polygonsData([])
        .polygonAltitude(0.01)
        .polygonCapColor(() => '#ffcc00')
        .polygonStrokeColor(() => '#fff');

      fetch('data/mapple.geo.json')
        .then(res => res.json())
        .then(data => {
          globe.polygonsData(data.features);
        })
        .catch(error => {
          console.error('Error fetching or setting globe data:', error);
        });
    });

    return {
      globeContainer,
    };
  },
};
</script>

<style scoped>
.map-container {
  height: 50%; /* 50% of the parent container's height */
  width: 100%;
  position: relative;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

