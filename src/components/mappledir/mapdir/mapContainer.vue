<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->

<template>
  <div class="map-container" ref="globeContainer"></div>
</template>

<script>
import Globe from 'globe.gl';
import { onMounted, ref } from 'vue';

export default {
  name: 'MapContainer',
  setup() {
    const globeContainer = ref(null);

    onMounted(() => {
      // Initialize the globe
      const globe = Globe()(globeContainer.value)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-day.jpg') // You can use a different texture or none
        .polygonsData([])
        .polygonAltitude(0.01) 
        .polygonCapColor(() => '#ffcc00') 
        .polygonStrokeColor(() => '#fff'); 

        fetch('data/mapple.geo.json')
        .then(res => res.json())
        .then(data => {
          globe.polygonsData(data.features);
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
  height: 50%; /* Adjust based on your layout */
  width: 100%;
  background-color: #f2f2f2;
}
</style>
