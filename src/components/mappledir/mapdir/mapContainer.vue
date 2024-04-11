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
    let root; // Define root here to make it accessible in both onMounted and onBeforeUnmount

    const suppressResizeObserverError = (e) => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'ResizeObserver loop completed with undelivered notifications') {
        e.stopImmediatePropagation();
      }
    };
    onMounted(() => {
      root = am5.Root.new("chartdiv");

      if (!root) {
        console.error("Failed to initialize amCharts root.");
        return;
      }

      root.setThemes([am5themes_Animated.new(root)]);
      console.log("amCharts themes set.");

      let chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
      }));

      if (!chart) {
        console.error("Failed to initialize amCharts MapChart.");
        return;
      }
      console.log("amCharts MapChart initialized.");

    // Set the chart background to an off-white color
    chart.chartContainer.set("background", am5.Rectangle.new(root, {
      fill: am5.color(0xF0F0F0), // Off-white background
      fillOpacity: 1
    }));

    // Set a darker color for the land to contrast with the ocean and off-white background
      let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow,
      fill: am5.color(0x84BFA4), // Green land color
      stroke: am5.color(0x767676), // Border color for countries
      strokeWidth: 0.5 // Border line width
    }));

    // Set a blue color for the ocean
    chart.set("backgroundSeries", am5map.MapPolygonSeries.new(root, {
      fill: am5.color(0xAAD3DF) // Blue ocean color
    }));

    // Set a color for the ocean that is lighter than the land but darker than the background
    chart.set("backgroundSeries", am5map.MapPolygonSeries.new(root, {
      fill: am5.color(0xCCEEFF) // Ocean color, lighter than the land
    }));


      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true,
        templateField: "settings"
      });

      polygonSeries.mapPolygons.template.events.on("click", function(ev) {
        const countryInfo = ev.target.dataItem.dataContext;
        console.log(countryInfo.name); // Logs the country name
      });

    });

    onBeforeUnmount(() => {
      window.removeEventListener('error', suppressResizeObserverError);

      if (root) {
        root.dispose();
      }
    });
  }
};
</script>


<style scoped>
#chartdiv {
  height: 200px; /* Instead of 100%, you can set a fixed height */
  width: 100%;
}
.map-container {
  width: 100%;
  background-color: #ddedea; /* A light gray that should contrast better with the map */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add some shadow for depth */
  border-radius: 8px; /* Optional: rounded corners for a modern look */
}
</style>
