<template>
  <div id="map" ref="mapContainer" class="map"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import {createListResource} from 'frappe-ui'

const mapContainer = ref(null);

onMounted(() => {
    initMap();
})
function initMap() {
    const mapResource = createListResource({
        doctype: "CRM POI",
        fields:["*"],
        pageLength: "None",
    })

    mapResource.reload().then(response => {
        //pois = JSON.parse(JSON.stringify(response))
        const pois = JSON.parse(JSON.stringify(response))
        console.log(pois)
    });
    if(mapContainer.value){
        mapContainer.value = L.map('map').setView([13.009409, 80.151071], 12);
        L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
      }).addTo(mapContainer.value);
    }
    else {
        console.error('Map container not found');
    }
}
</script>
<style scoped>
.map{
    width: "100%";
    height: 100vh;
}
</style>
