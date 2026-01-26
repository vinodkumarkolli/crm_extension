<template>
  <div v-if="loading" class="flex flex-col items-center justify-center h-screen bg-white">
      <LoadingIndicator class="h-12 w-12 text-gray-900" />
      <span class="mt-4 text-lg">Loading...</span>
  </div>
  <div v-if="!loading" id="map" ref="mapContainer" class="map"></div>
</template>
<script>
export default {
    name: "Bazooka"
}
</script>
<script setup>
import { onMounted, ref, nextTick } from 'vue';
import {useRouter} from 'vue-router'
import L, { map } from 'leaflet';

import 'leaflet-search'
import {LocateControl} from 'leaflet.locatecontrol';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"; 
import "leaflet-search/dist/leaflet-search.src.css"
import "leaflet/dist/leaflet.css";
import { convertPOIPointsToGeoJson,generateHTMLTemplate,getBoundsFromLatLng } from '../data/geo';
import {createListResource, LoadingIndicator} from 'frappe-ui'
import { geography } from '../store/locations';
import {sessionUser} from '@/data/session.js'
const mapContainer = ref(null);
const loading = ref(true);
let mapInstance = null;
const faCircleStyle={
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
const gtCircleStyle={
    radius: 8,
    fillColor: 'blue',
    color: '#000',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
}
const pharmaCircleStyle={
    radius: 8,
    fillColor: 'purple',
    color: '#000',
    weight: 2,
    opacity: 1,
    fillOpacity: 0.5
}
const geo = ref({})
const territory = ref([])
const router = useRouter()
const queryParams = router.currentRoute.value.query
onMounted(() => {
    loading.value = true
    if(queryParams){
        let territory = createListResource({
                doctype: "User Territory Mapping",
                fields:["*"],
                filters:[["user","=",sessionUser()],["docstatus","=",1],["app","=","Bazooka"]],
                pageLength: "None",
                auto: true
        })
        territory.reload().then(response =>{    
            territory.value = response
            const match = territory.value.find(userPerm => userPerm.crm_territory === queryParams.location)
            if(match){
                geo.value = geography.filter(geo => geo.name === queryParams.location)[0]
                initMap(geo.value.lat,geo.value.long,geo.value.districts);
            }
            else{
                loading.value = false
                alert("You are not authorized for this location")
                router.push("/")
            }
        }).catch(() => {
            loading.value = false
        })
    } else {
        loading.value = false
    }
})

function initMap(setlat,setlong,districts) {

    const mapResource = createListResource({
        doctype: "CRM POI",
        fields:["*"],
        filters:[["custom_district","in",districts],["poi_status","=","Active"]],
        pageLength: "None",
    })

    mapResource.reload().then(response => {
        const pois = JSON.parse(JSON.stringify(response))
        const oldGeoJsonFeatureCollection = convertPOIPointsToGeoJson(pois.filter(poi => poi.fieldassist_id === null))
        const newGeoJsonFeatureCollection = convertPOIPointsToGeoJson(pois.filter(poi => poi.fieldassist_id !== null))
        const gtGeoJsonFeatureCollection = convertPOIPointsToGeoJson(pois.filter(poi => poi.fieldassist_id !== null && poi.poi_type === 'GT'))
        const pharmaGeoJsonFeatureCollection = convertPOIPointsToGeoJson(pois.filter(poi => poi.fieldassist_id !== null && poi.poi_type === 'PHARMA'))
        
        loading.value = false
        nextTick(() => {
            if(mapContainer.value){
                mapInstance = L.map('map', { zoomControl: false, attributionControl: false }).setView([setlat, setlong], 12,{animate: true});
                L.control.attribution({ position: 'topright' }).addTo(mapInstance);
                const bounds = getBoundsFromLatLng(setlat,setlong, 30 * 1000); // 30 Km Radius
                //mapInstance.setMaxBounds(bounds);
                // Optionally, fit the map view to these bounds
                mapInstance.fitBounds(bounds);
                const geoLocate = new LocateControl().addTo(mapInstance)
                const zoomControl = L.control.zoom({ position: 'topleft' }).addTo(mapInstance)
                const osmTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                minZoom: 8,
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mapInstance);
                const newGeoJSONLayer = L.geoJson(newGeoJsonFeatureCollection, {
                //add code to convert pointTo Circle
                pointToLayer: function(feature,latlng){
                    return L.circle(latlng,faCircleStyle)
                },
                onEachFeature: function (feature, layer) {
                    let win_url = "https://www.google.com/maps/place/"+feature.geometry.coordinates[1]+','+feature.geometry.coordinates[0]
                    layer.bindPopup(generateHTMLTemplate(feature,win_url))
                }})
                const oldGeoJSONLayer = L.geoJson(oldGeoJsonFeatureCollection, {
                //add code to convert pointTo Circle
                pointToLayer: function(feature,latlng){
                    return L.circle(latlng,fmCircleStyle)
                },
                onEachFeature: function (feature, layer) {
                    let win_url = "https://www.google.com/maps/place/"+feature.geometry.coordinates[1]+','+feature.geometry.coordinates[0]
                    layer.bindPopup(generateHTMLTemplate(feature,win_url))
                }})
                const gtGeoJSONLayer = L.geoJson(gtGeoJsonFeatureCollection, {
                pointToLayer: function(feature,latlng){
                    return L.circle(latlng,gtCircleStyle)
                },
                onEachFeature: function (feature, layer) {
                    let win_url = "https://www.google.com/maps/place/"+feature.geometry.coordinates[1]+','+feature.geometry.coordinates[0]
                    layer.bindPopup(generateHTMLTemplate(feature,win_url))
                }})
                const pharmaGeoJSONLayer = L.geoJson(pharmaGeoJsonFeatureCollection, {
                pointToLayer: function(feature,latlng){
                    return L.circle(latlng,pharmaCircleStyle)
                },
                onEachFeature: function (feature, layer) {
                    let win_url = "https://www.google.com/maps/place/"+feature.geometry.coordinates[1]+','+feature.geometry.coordinates[0]
                    layer.bindPopup(generateHTMLTemplate(feature,win_url))
                }})
                
                const poiSearch = new L.Control.Search({
                    position: 'topleft',
                    layer: L.layerGroup([newGeoJSONLayer,oldGeoJSONLayer, gtGeoJSONLayer, pharmaGeoJSONLayer]),
                    placeholder: 'Search Locations',
                    propertyName: 'location_name',
                    zoomToResult: true,
                    zoom:16
                })
                poiSearch.addTo(mapInstance)
                const baseMaps = {
                    "Classic Map": osmTileLayer,
                    //"Modern Map": bingL
                }
                const overlayMaps = {
                    "Old Fieldmate": oldGeoJSONLayer,
                    "Field Assist": newGeoJSONLayer,
                    "GT": gtGeoJSONLayer,
                    "PHARMA": pharmaGeoJSONLayer
                }
                let layerC = L.control.layers(baseMaps,overlayMaps,{ collapsed: false }).addTo(mapInstance)
            }
            else {
                console.error('Map container not found');
            }
        })
    }).catch(() => {
        loading.value = false
    });
}
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
