<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->

<template>
  <div class="map-container" ref="globeContainer"></div>
</template>

<script>
import Globe from 'globe.gl';
import { onMounted, ref, reactive } from 'vue';
import { geoContains } from 'd3-geo';

export default {
  name: 'MapContainer',
  setup() {
    const globeContainer = ref(null);
    const selectedCountry = reactive({ current: null });

    onMounted(() => {
      fetch('/data/mapple.geo.json')
        .then(res => res.json())
        .then(data => {
          const globe = Globe()(globeContainer.value)
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            .polygonsData(data.features)
            .polygonAltitude(0.01)
            .polygonCapColor(() => '#90EE90')
            .polygonStrokeColor(() => '#fff')
            .polygonsTransitionDuration(300)
            .atmosphereColor('lightskyblue')
            .atmosphereAltitude(0.3)
            .pointOfView({ lat: 1.3521, lng: 103.8198, altitude: 2 })
            .enablePointerInteraction(true);

          globe.onGlobeClick((coords) => {
            const clickedCountry = data.features.find(feature => geoContains(feature.geometry, [coords.lng, coords.lat]));
            if (clickedCountry) {
              console.log('Country clicked:', clickedCountry.properties.sovereignt);
              selectedCountry.current = clickedCountry;
              // Refresh the globe to reflect changes
              globe.polygonsData(data.features.map(feature => {
                if (feature === clickedCountry) {
                  return { ...feature, polygonCapColor: '#ADD8E6' }; // Attempt to set clicked country color
                }
                return feature;
              }));
            }
          });
        })
        .catch(error => {
          console.error('Error fetching GeoJSON data:', error);
        });
    });

    return { globeContainer };
  },
};
</script>

<style scoped>
.map-container {
  height: 50%; /* Adjusted to your needs */
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
}
</style>
