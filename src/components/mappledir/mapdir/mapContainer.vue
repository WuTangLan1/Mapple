<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->
<template>
  <div class="map-container">
    <div id="chartdiv" class="map-container"></div>
    <div class="info-container">
      <div class="high-score-container" v-if="isAuthenticated && highScore > 0">
      HS: {{ highScore }}
    </div>
      <div class="score-display">CS: {{ score }}</div>
      <div class="guesses-display">Rem: {{ guessesRemaining }}</div>
      <button :class="{ 'flash-red': flashRed, 'disabled-button': !selectedCountry || guessesRemaining === 0 }"
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
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useCountryStore } from '@/stores/useCountryStore';
import { useAuthStore } from '@/stores/useAuthStore'; 

export default {
  name: 'MapContainer',
  emits: ['correctGuess', 'gameOver', 'refreshData'],
  setup(props, { emit }) {  
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.user !== null);
    const highScore = computed(() => isAuthenticated.value ? authStore.user.highscore : 0);

    const countryStore = useCountryStore();
    let root, chart, polygonSeries, graticuleSeries;
    const selectedCountry = ref(null); 
    const score = ref(0);
    const guessesRemaining = ref(3);
    const flashRed = ref(false);
    const flashColor = ref(false);

    onMounted(() => {
      try {
        root = am5.Root.new("chartdiv");
        root.setThemes([am5themes_Animated.new(root)]);

        chart = root.container.children.push(am5map.MapChart.new(root, {
          panX: "rotateX",
          panY: "rotateY",
          background: am5.Rectangle.new(root, { fill: am5.color(0xADD8E6) }),
          projection: am5map.geoOrthographic(),
          paddingBottom: 10,
          paddingTop: 10,
          paddingLeft: 10,
          paddingRight: 10
        }));

        chart.events.on("zoomlevelchanged", function(ev) {
          const level = ev.target.zoomLevel;
          const panFactor = 0.1 + (1 - level) * 0.9;
          chart.set("panXSpeed", panFactor);
          chart.set("panYSpeed", panFactor);
        });

        chart.set("background", am5.Rectangle.new(root, { fill: am5.color(0x8AADB8) }));
      

        let zoomControl = am5map.ZoomControl.new(root, {
          slider: {
            step: 0.15
          }
        });
        chart.set("zoomControl", zoomControl);

        graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
              stroke: am5.color(0xffffff, 0.3)
            }));

            if (window.innerWidth <= 768) {
          root.setThemes([]);
        } else {
          root.setThemes([am5themes_Animated.new(root)]);
        }


        polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          fill: am5.color(0x38761d), 
          stroke: am5.color(0x1A1A1A),
          strokeWidth: 0.5,
          nonScalingStroke: true,
        }));

      chart.seriesContainer.dragWhilePressing = true;
      chart.seriesContainer.events.on("pointerdown", (e) => {
        e.originalEvent.preventDefault(); 
      });

      chart.seriesContainer.set("interactive", true);
      chart.seriesContainer.set("touchChildren", true);

        // eslint-disable-next-line no-unused-vars
        let hoverState = polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(0xFF9E5E)
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
          item.set("active", false); 
        });
        

        let polygon = ev.target;
        polygon.set("active", true);

        selectedCountry.value = polygon.dataItem.dataContext.name;
        if (navigator.vibrate) {
          navigator.vibrate(50); 
        }
      });
    }
     catch (error) {
        console.error("An error occurred while creating the chart:", error);
      }
    });


  function submitGuess() {
    console.log(selectedCountry.value,'submited as a guess')
      if (selectedCountry.value === countryStore.currentCountry.c_name && guessesRemaining.value > 0) {
        score.value += 1;
        flashColor.value = true; 
        emit('correctGuess', countryStore.currentCountry); 
        setTimeout(() => { flashColor.value = false; }, 3000);
        selectedCountry.value = "";
        resetMap();
      } 
      else {
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
        polygon.set("active", false); 
      });
      chart.goHome(); 
      selectedCountry.value = null; 
    }

    return { selectedCountry, guessesRemaining, score, submitGuess, flashRed, flashColor, resetMap, graticuleSeries, highScore, isAuthenticated };
  }
};
</script>


<style scoped>
#chartdiv {
  height: 43.5vh; 
  width: 100%;
}
.map-container {
  width: 100%;
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

.high-score-container {
  font-size: 1em; 
  background-color: #2d8d61;
  color: white;
  padding: 9px;
  border-radius: 5px;
  width: 25%;
  text-align: center;
}

.score-display, .guesses-display, .submit-button {
  font-size: 1em; 
  color: white;
  padding: 9px;
  border-radius: 5px;
  width: 25%;
  text-align: center;
}

.score-display {
  background-color: rgb(119, 80, 121);
}

.guesses-display {
  background-color: rgb(69, 115, 134);
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
  width: 25%;
}

.disabled-button {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6; 
}

.flash-purple {
  animation: flashPurple 1s 3; 
}

@keyframes flashPurple {
  0%, 100% { background-color: #4CAF50; }
  50% { background-color: purple; }
}

.flash-red {
  animation: flashRed 1s 3;
}
@keyframes flashRed {
  0%, 100% { background-color: #4CAF50; }
  50% { background-color: red; }
}
</style>
