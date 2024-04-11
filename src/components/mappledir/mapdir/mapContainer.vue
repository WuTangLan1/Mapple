<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->

<template>
  <div id="chartdiv" class="map-container"></div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'MapContainer',
  setup() {
    let root;

    onMounted(() => {
      root = am5.Root.new("chartdiv");

      if (!root) {
        console.error("Failed to initialize amCharts root.");
        return;
      }

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundSeries: am5map.MapPolygonSeries.new(root, { fill: am5.color(0xADD8E6) }) // Set sea color to light blue
      }));

      let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        fill: am5.color(0x84BFA4),
        stroke: am5.color(0x767676),
        strokeWidth: 0.5
      }));

      let activeStateColor = am5.color(0xFFA07A); // Pastel orange color

      polygonSeries.mapPolygons.template.setAll({
        toggleKey: "active",
        interactive: true,
        fill: am5.color(0x84BFA4), // Default color
        stroke: am5.color(0x767676),
        strokeWidth: 0.5,
        tooltipText: "{name}"
      });

      // Set up active state for polygons
      polygonSeries.mapPolygons.template.states.create("active", {
        fill: activeStateColor
      });

      polygonSeries.mapPolygons.template.events.on("click", function(ev) {
        let polygon = ev.target;
        let alreadyActive = polygon.get("active");

        polygonSeries.mapPolygons.each(function(item) {
          item.set("active", false);
        });

        if (!alreadyActive) {
          polygon.set("active", true);
        }

        const countryInfo = ev.target.dataItem.dataContext;
        console.log('active country:', countryInfo.name); 
      });

    });

    onBeforeUnmount(() => {
      if (root) {
        root.dispose();
      }
    });
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
  background-color: rgb(173, 216, 230); /* Light blue color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
