<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->

<template>
  <div class="map-container" ref="globeContainer"></div>
</template>

<script>
import Globe from 'globe.gl';
import { onMounted, ref, nextTick, reactive } from 'vue';
import { geoContains } from 'd3-geo';


export default {
  name: 'MapContainer',
  setup() {
    const globeContainer = ref(null);
    const selectedCountry = reactive({ current: null });

    onMounted(async () => {
      await nextTick();

      // Initialize the globe and add console logs to check each method
      const globe = Globe()(globeContainer.value);
      console.log('Globe instance:', globe);

      globe.globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg');
      console.log('globeImageUrl set');

      globe.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');
      console.log('bumpImageUrl set');

      globe.backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');
      console.log('backgroundImageUrl set');

      globe.polygonsData([]);
      console.log('polygonsData set');

      globe.polygonAltitude(0.01);
      console.log('polygonAltitude set');

      globe.polygonCapColor(() => '#90EE90');
      console.log('polygonCapColor set');

      globe.polygonStrokeColor(() => '#fff');
      console.log('polygonStrokeColor set');

      globe.polygonsTransitionDuration(300);
      console.log('polygonsTransitionDuration set');

      globe.atmosphereColor('lightskyblue');
      console.log('atmosphereColor set');

      globe.atmosphereAltitude(0.3);
      console.log('atmosphereAltitude set');

      globe.pointOfView({ lat: 1.3521, lng: 103.8198, altitude: 2 });
      console.log('pointOfView set');

      globe.enablePointerInteraction(true);
      console.log('enablePointerInteraction set');

      fetch('data/mapple.geo.json')
        .then(res => res.json())
        .then(data => {
          globe.polygonsData(data.features)
          .polygonCapColor(() => '#90EE90')
          globe.onGlobeClick((coords) => {
            console.log(`Clicked coordinates: ${coords.lat}, ${coords.lng}`);
            const clickedCountry = data.features.find(feature => {
              // Use a geo-utility function to determine if the clicked coordinates are within the feature
              return geoContains(feature.geometry, [coords.lng, coords.lat]);
            });
            
            if (clickedCountry) {
              selectedCountry.current = clickedCountry;
              console.log(clickedCountry.properties.NAME); // Log the country's name
              
              // Update the colors accordingly
              globe.polygonsData().polygonCapColor(feature => {
                return feature === selectedCountry.current ? '#ADD8E6' : '#90EE90';
              });
              
              // Trigger a re-render of the globe to show the new color
              globe.polygonsData(globe.polygonsData());
            }
          });
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
  overflow: hidden; 
}
</style>

