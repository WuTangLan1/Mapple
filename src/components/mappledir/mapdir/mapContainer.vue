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
        paddingRight: 20
      }));

      let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        fill: am5.color(0x84BFA4),
        stroke: am5.color(0x767676),
        strokeWidth: 0.5
      }));

      chart.set("backgroundSeries", am5map.MapPolygonSeries.new(root, {
        fill: am5.color(0xCCEEFF) // Adjusted for clarity
      }));

      polygonSeries.mapPolygons.template.setAll({
        interactive: true,
        templateField: "settings",
        crisp : true
      });

      // eslint-disable-next-line no-unused-vars
      let activeState = polygonSeries.mapPolygons.template.states.create("active", {
        properties: {
          fill: am5.color(0xCC0000), // Color for active (selected) country
        }
      });

      polygonSeries.mapPolygons.template.events.on("click", function(ev) {
        const countryInfo = ev.target.dataItem.dataContext;
        console.log(countryInfo.name); // Logs the country name

        // Deselect previously selected polygon
        if (polygonSeries.mapPolygons.template.get("active")) {
          polygonSeries.mapPolygons.template.get("active").set("active", true);
        }

        // Activate the clicked polygon
        ev.target.set("active", !ev.target.get("active"));
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
  height: 350px;
  width: 100%;
}
.map-container {
  width: 100%;
  background-color:rgb(72, 97, 148)a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
