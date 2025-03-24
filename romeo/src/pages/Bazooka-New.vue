<template>
<div style="width:100%;height:100vh">
    <l-map ref="map" :minZoom=10 v-model:zoom="zoom" :center="[router.currentRoute.value.query.lat, router.currentRoute.value.query.long]" :bounds="bounds" :maxBounds="bounds" class="map">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
      <LLocateControl></LLocateControl>
    </l-map>
  </div>
</template>
<script>
import { LMap, LTileLayer,LCircleMarker,LControl,LGeoJson } from "@vue-leaflet/vue-leaflet";
import {Button} from 'frappe-ui';
import LLocateControl from '@/components/LLocateControl.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    LCircleMarker
  },
  data() {
    return {
      zoom: 10,
    };
  },
};
</script>
<script setup>
import { useRouter } from 'vue-router';
import { createListResource} from 'frappe-ui';
import { getBoundsFromLatLng } from '../data/geo';
import {ref} from 'vue';

const router = useRouter();
const setLat = Number(router.currentRoute.value.query.lat);
const setLong = Number(router.currentRoute.value.query.long);
const bounds = getBoundsFromLatLng(setLat,setLong, 30 * 1000);
const pois = ref([]);
const crmPOIProxy = createListResource({
      doctype: "CRM POI",
      fields:["*"],
      filters:[["pincode","in",JSON.parse(router.currentRoute.value.query.places)]],
      pageLength: "None",
    }).reload().then(response => {
    console.log(JSON.parse(JSON.stringify(response)))
    });
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
