<template>
<div id="map" ref="mapContainer" class="map"></div>
</template>
<script>
import { onMounted, ref } from 'vue';
import {useRouter} from 'vue-router'
import L, { map } from 'leaflet';
import 'leaflet-search'
import {LocateControl} from 'leaflet.locatecontrol';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"; 
import "leaflet-search/dist/leaflet-search.src.css"
import "leaflet/dist/leaflet.css";
import bingLayer from 'leaflet-bing-layer'
import { generateHTMLTemplate,getBoundsFromLatLng } from '../data/geo';
import {createListResource,createResource} from 'frappe-ui'

export default {
  data() {
    const faCircleStyle= {
        radius: 8,
        fillColor: 'green',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5
    }
    const fmCircleStyle={
        radius: 8,
        fillColor: 'red',
        color: '#000',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5
    }

    return {
        faCircleStyle, fmCircleStyle
    };
  },
  async setup(){
    const pois = ref(null)
    pois.value = await createListResource({
        doctype: "CRM POI",
        fields:["*"],
        pageLength: "None",
    }).reload()
    console.log("Im near step 2")
  },
  mounted() {
    // Access and use data here
    // console.log(this.poi)
    console.log(pois.value)
  },
};
</script>
<style scoped>
.map{
    width: 100%;
    height: 100vh;
}
.leaflet-popup-content-wrapper {
    background: #e0e0e0;
    color: #234c5e;
}
</style>
