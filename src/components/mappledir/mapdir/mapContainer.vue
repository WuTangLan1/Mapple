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
    const hoveredCountry = ref(null);

    onMounted(async () => {
      await nextTick(); // Ensure the DOM has updated with the globe container

      // Initialize the globe with additional attributes
      const globe = Globe()(globeContainer.value)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg') // Use a night view for a different look
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png') // Add topography
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png') // Add stars in the background
        .polygonsData([])
        .polygonAltitude(0.01)
        .polygonCapColor(country => country === hoveredCountry.value ? 'darkgreen' : '#ffcc00')
        .polygonStrokeColor(() => '#fff')
        .polygonsTransitionDuration(300) // Transition effect for polygons
        .atmosphereColor('lightskyblue') 
.atmosphereAltitude(0.3) // Make the atmosphere thicker for a more dramatic effect
.pointOfView({ lat: 1.3521, lng: 103.8198, altitude: 2 }) // Optional: Set a default point of view
.enablePointerInteraction(true) // Enable pointer interaction for better user experience
.onCountryHover((country) => {
          hoveredCountry.value = country ? country.properties.ISO_A2 : null;
        })
        .onCountryClick((country) => {
          if (country) {
            console.log(country.properties.NAME);
            globe.polygonCapColor(d => d === country ? 'darker color here' : '#ffcc00');
            globe.polygonsData(globe.polygonsData());
          }
        });


  const controls = globe.controls(); 
  controls.autoRotate = true; 
  controls.autoRotateSpeed = 0.5; 
  controls.enableZoom = true;
  controls.zoomSpeed = 0.8; // 
  controls.enableRotate = true; 
  controls.rotateSpeed = 0.8; 

  fetch('data/mapple.geo.json')
    .then(res => res.json())
    .then(data => {
      globe.polygonsData(data.features)
        .polygonCapColor(() => '#ffcc00') 
        .polygonStrokeColor(() => '#ffffff');
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

