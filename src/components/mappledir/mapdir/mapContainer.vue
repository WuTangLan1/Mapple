<!-- This is the code for the src\components\mappledir\mapdir\mapContainer.vue -->

<template>
  <div id="globeDiv" class="map-container"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
  name: 'MapContainer',
  mounted() {
    let root = am5.Root.new("globeDiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

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
      geoJSON: am5geodata_worldLow
    }));

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true
    });

    polygonSeries.mapPolygons.template.events.on("active", function(active, target) {
      if (target.get("active")) {
        console.log("Clicked on", target.dataItem.get("dataContext").name);
        var centroid = target.geoCentroid();
        if (centroid) {
          chart.animate({ key: "rotationX", to: -centroid.longitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
          chart.animate({ key: "rotationY", to: -centroid.latitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
        }
      }
    });

    // Keep a reference to clean up when the component unmounts
    this.chart = chart;
    this.root = root;
  },
  beforeUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }
}
</script>

<style scoped>
.map-container {
  height: 50%; /* Adjust based on your needs */
  width: 100%;
  background-color: #f2f2f2;
}
</style>
