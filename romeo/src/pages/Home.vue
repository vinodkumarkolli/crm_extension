<!--Generate code vue code using leaflet.js Openstreet Maps map interface-->
<template>
  <div id="map" class="map"></div>
</template>

<script>
import L from 'leaflet';

export default {
  name: 'Home',
  mounted() {
    this.initMap();
  },
  methods:
  {
    initMap()
    {
      const map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
      }).addTo(map);
    }
  }
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>