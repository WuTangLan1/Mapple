<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->
<template>
  <div class="map-container">
    <div id="chartdiv" class="map-container"></div>
    <button 
      :disabled="!selectedCountry" 
      @click="logSelectedCountry"
      class="submit-button">
      Submit
    </button>
  </div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { onMounted, onBeforeUnmount, ref } from 'vue';

export default {
  name: 'MapContainer',
  setup() {
    let root;
    const selectedCountry = ref(null); // Reactive variable to track selected country

    onMounted(() => {
      root = am5.Root.new("chartdiv");

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundSeries: am5map.MapPolygonSeries.new(root, { fill: am5.color(0xADD8E6) })
      }));

      let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        fill: am5.color(0x84BFA4),
        stroke: am5.color(0x767676),
        strokeWidth: 0.5
      }));

      polygonSeries.mapPolygons.template.setAll({
        toggleKey: "active",
        interactive: true,
        fill: am5.color(0x84BFA4),
        stroke: am5.color(0x767676),
        strokeWidth: 0.5,
        tooltipText: "{name}"
      });

      polygonSeries.mapPolygons.template.states.create("active", {
        fill: am5.color(0xFFA07A)
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

    onBeforeUnmount(() => {
      if (root) {
        root.dispose();
      }
    });

    function logSelectedCountry() {
      if (selectedCountry.value) {
        console.log(`Success, country name: ${selectedCountry.value}`);
      }
    }

    return { selectedCountry, logSelectedCountry };
  }
};
</script>

<style scoped>
#chartdiv {
  height: 330px;
  width: 100%;
}
.map-container {
  width: 100%;
  background-color: rgb(173, 216, 230);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
}
.submit-button {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 10px 20px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
</style>
