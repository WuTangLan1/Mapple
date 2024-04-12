<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->
<template>
  <div class="map-container">
    <div id="chartdiv" class="map-container"></div>
    <div class="info-container">
      <div class="score-display">Score: {{ score }}</div>
      <button :class="{ 'flash-red': flashRed }" 
              :disabled="!selectedCountry || guessesRemaining === 0" 
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
  emits: ['correctGuess', 'gameOver', 'refreshData'],
  setup(props, { emit }) {  // Access emit from the setup context
    const countryStore = useCountryStore();
    let root, chart, polygonSeries;
    const selectedCountry = ref(null); 
    const score = ref(0);
    const guessesRemaining = ref(3);
    const flashRed = ref(false);
    const flashColor = ref(false);

    onMounted(() => {
  root = am5.Root.new("chartdiv");
  root.setThemes([am5themes_Animated.new(root)]);

  let chart = root.container.children.push(am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    background: am5.Rectangle.new(root, { fill: am5.color(0xADD8E6) }) ,
    backgroundSeries: am5map.MapPolygonSeries.new(root, {
      fill: am5.color(0xDEF2FA)
    })
  }));

  let zoomControl = am5map.ZoomControl.new(root, {
    slider: {
      step: 0.15  // Adjust step directly at creation
    }
  });

  chart.set("zoomControl", zoomControl); 

  let backgroundSeries = am5map.MapPolygonSeries.new(root, {
      fill: am5.color(0x0000FF), // A different shade of blue for the ocean on the globe
    });
    chart.series.push(backgroundSeries);

  let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    fill: am5.color(0x38761d),
    stroke: am5.color(0x1A1A1A),
    strokeWidth: 0.5,
    nonScalingStroke: true,
  }));

  chart.seriesContainer.dragWhilePressing = true;
  chart.seriesContainer.events.on("pointerdown", (e) => {
    e.originalEvent.preventDefault(); // Prevent scrolling on touch devices
  });

  chart.seriesContainer.set("interactive", true);
  chart.seriesContainer.set("touchChildren", true);

  // eslint-disable-next-line no-unused-vars
  let hoverState = polygonSeries.mapPolygons.template.states.create("hover", {
    fill: am5.color(0xFBE5A2)
  });

  polygonSeries.mapPolygons.template.states.create("active", {
    fill: am5.color(0xFFCCAA)
  });

  polygonSeries.mapPolygons.template.setAll({
    toggleKey: "active",
    interactive: true,
    cursorOverStyle: "pointer"
  });

  polygonSeries.mapPolygons.template.events.on("pointerdown", function(ev) {
    polygonSeries.mapPolygons.each(function(item) {
      item.set("active", false); // Reset all polygons to inactive state
    });

    let polygon = ev.target;
    polygon.set("active", true);

    selectedCountry.value = polygon.dataItem.dataContext.name;
    if (navigator.vibrate) {
      navigator.vibrate(50); // Vibrate for tactile feedback on selection
    }
  });
});

    function submitGuess() {
        if (selectedCountry.value === countryStore.currentCountry.c_name && guessesRemaining.value > 0) {
          score.value += 1;
          flashColor.value = true; // Flash purple for correct guess
          emit('correctGuess'); // Correct usage of emit
          emit('refreshData');
          setTimeout(() => { flashColor.value = false; }, 3000); // Turn off flash after 1 second
        } else {
          guessesRemaining.value -= 1;
          flashRed.value = true;
          setTimeout(() => { flashRed.value = false; }, 3000);
          if (guessesRemaining.value === 0) {
            emit('gameOver', score.value);
          }
        }
      }


    onBeforeUnmount(() => {
      if (root) {
        root.dispose();
      }
    });

    function resetMap() {
      polygonSeries.mapPolygons.each(polygon => {
        polygon.set("active", false); // Deactivate all polygons
      });
      chart.goHome(); // Reset zoom and position to initial state
      selectedCountry.value = null; // Clear selected country
    }

    return { selectedCountry, guessesRemaining, score, submitGuess, flashRed, flashColor, resetMap };
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
  background-color: #F0F8FF;
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
  color: black;
  background-color: #b9c07f;
  padding: 5px;
  border-radius: 5px;
}

.am5zoomcontrol .am5button-group {
  filter: drop-shadow(0px 0px 3px rgba(0,0,0,0.6)); 
}
.submit-button {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px 20px;
  animation: flashColor 1s 1; 
  border: none;
}

.flash-purple {
  animation: flashPurple 1s 3; /* Flash purple when correct */
}

@keyframes flashPurple {
  0%, 100% { background-color: #4CAF50; } /* original green */
  50% { background-color: purple; }
}

.flash-red {
  animation: flashRed 1s 3; /* Run the animation 3 times */
}
@keyframes flashRed {
  0%, 100% { background-color: #4CAF50; }
  50% { background-color: red; }
}
</style>
