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
      const map = L.map('map').setView([13.009409, 80.151071], 12);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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