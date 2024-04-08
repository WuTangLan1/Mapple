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
      const globe = Globe({
        // Check if any initial options are needed
      })(globeContainer.value);
      globe.globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg');
      globe.polygonsData([]);
      globe.polygonAltitude(0.01);
      globe.polygonCapColor(() => '#ffcc00');
      globe.polygonStrokeColor(() => '#fff');
      // ... Add more globe configurations

      // Setup the atmosphere (if this method is available)
      if (typeof globe.atmosphereAltitude === 'function') {
        globe.atmosphereAltitude(0.1);
      }

      // If the `onRender` method is available and you need to use it:
      if (typeof globe.onRender === 'function') {
        globe.onRender(() => {
          // Your render logic
        });
      }

      // Fetch the geoJSON data
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
  height: 50%; /* Adjusted to your needs, it can be 100% if it should occupy the full height */
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* This ensures that any part of the globe that overflows will be hidden */
}
</style>

