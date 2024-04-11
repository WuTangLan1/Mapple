<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->
<template>
  <div class="map-container">
    <div id="chartdiv" class="map-container"></div>
    <div class="info-container">
      <div class="score-display">Score: {{ score }}</div>
      <button :disabled="!selectedCountry || guessesRemaining === 0" 
              @click="submitGuess"
              class="submit-button">
        Submit
      </button>
    </div>
  </div>
</template>


<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { useCountryStore } from '@/stores/useCountryStore';

export default {
  name: 'MapContainer',
  setup() {
    const countryStore = useCountryStore();
    let root;
    const selectedCountry = ref(null); 
    const score = ref(0);
    const guessesRemaining = ref(3);

    onMounted(() => {
      root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      // Create a MapChart instance with enhanced padding and a more defined background color
      let chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(), // Orthographic projection for a globe-like appearance
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundSeries: am5map.MapPolygonSeries.new(root, {
          fill: am5.color(0xDEF2FA) // A softer blue for the ocean background
        })
      }));

      // Create a MapPolygonSeries instance with more visible and aesthetic borders
      let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        fill: am5.color(0xAAD3C1), // A lighter shade for land areas, for better contrast
        stroke: am5.color(0x1A1A1A), // A nearly black color for contrast with the land areas
        strokeWidth: 1.2, // Slightly thicker borders for better visibility
        nonScalingStroke: true, // Ensures the stroke width remains consistent when the map is zoomed
      }));

      // eslint-disable-next-line no-unused-vars
      let hoverState = polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0xFBE5A2) // A pleasant hover color
      });

      polygonSeries.mapPolygons.template.states.create("active", {
          fill: am5.color(0xFFCCAA) // A distinct color for active (selected) countries
        });

        // Enhance interactivity with the polygons
        polygonSeries.mapPolygons.template.setAll({
          toggleKey: "active",
          interactive: true,
          cursorOverStyle: "pointer" // Change cursor to pointer on hover to indicate interactivity
        });

      polygonSeries.mapPolygons.template.events.on("click", function(ev) {
        polygonSeries.mapPolygons.each(function(item) {
          item.set("active", false);
        });

        let polygon = ev.target;
        polygon.set("active", true);

        selectedCountry.value = polygon.dataItem.dataContext.name; // Store the selected country
      });

    });

    function submitGuess() {
        if (selectedCountry.value === countryStore.currentCountry.c_name && guessesRemaining.value > 0) {
          score.value += 1; // Increase score
          console.log("Correct guess! Your score: " + score.value);
        } else {
          guessesRemaining.value -= 1; // Decrease guesses remaining
          if (guessesRemaining.value === 0) {
            console.log("Game failed");
          } else {
            console.log("Try again. Guesses remaining: " + guessesRemaining.value);
          }
        }
      }


    onBeforeUnmount(() => {
      if (root) {
        root.dispose();
      }
    });


    return { selectedCountry, guessesRemaining, score, submitGuess };
  }
};
</script>

<style scoped>
#chartdiv {
  height: 260px;
  width: 100%;
}
.map-container {
  width: 100%;
  background-color: rgb(173, 216, 230);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.info-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.score-display {
  color: white;
  background-color: #4CAF50;
  padding: 5px;
  border-radius: 5px;
}
.submit-button {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
}
</style>
