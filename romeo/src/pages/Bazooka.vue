<template>
<div id="map" ref="mapContainer" class="map"></div>
</template>
<script>
export default {
    name: "Bazooka"
}
</script>
<script setup>
import { onMounted, ref } from 'vue';
import {useRouter} from 'vue-router'
import L, { map } from 'leaflet';

import 'leaflet-search'
import {LocateControl} from 'leaflet.locatecontrol';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"; 
import "leaflet-search/dist/leaflet-search.src.css"
import "leaflet/dist/leaflet.css";
import bingLayer from 'leaflet-bing-layer'
import { convertPOIPointsToGeoJson,generateHTMLTemplate,getBoundsFromLatLng } from '../data/geo';
import {createListResource,createResource} from 'frappe-ui'
import { geography } from '../store/locations';
import {sessionUser} from '@/data/session.js'
const mapContainer = ref(null);
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
const geo = ref({})
const territory = ref([])
const router = useRouter()
const queryParams = router.currentRoute.value.query
onMounted(() => {
    
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
                alert("You are not authorized for this location")
                router.push("/")
            }
        })
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
        if(mapContainer.value){
            mapContainer.value = L.map('map', { zoomControl: false }).setView([setlat, setlong], 12,{animate: true});
            const bounds = getBoundsFromLatLng(setlat,setlong, 30 * 1000); // 30 Km Radius
            //mapContainer.value.setMaxBounds(bounds);
            // Optionally, fit the map view to these bounds
            mapContainer.value.fitBounds(bounds);
            const geoLocate = new LocateControl().addTo(mapContainer.value)
            const zoomControl = L.control.zoom({ position: 'topleft' }).addTo(mapContainer.value)
            const osmTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 8,
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapContainer.value);
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
            
            const poiSearch = new L.Control.Search({
                position: 'topleft',
                layer: L.layerGroup([newGeoJSONLayer,oldGeoJSONLayer]),
                placeholder: 'Search Locations',
                propertyName: 'location_name',
                zoomToResult: true,
                zoom:16
            })
            poiSearch.addTo(mapContainer.value)
            const baseMaps = {
                "Classic Map": osmTileLayer,
                //"Modern Map": bingL
            }
            const overlayMaps = {
                "Field Assist": newGeoJSONLayer,
                "Old Fieldmate": oldGeoJSONLayer
            }
            let layerC = L.control.layers(baseMaps,overlayMaps,{ collapsed: false }).addTo(mapContainer.value)
            createResource({
                url:'frappe.client.get',
                params:{
                    doctype:'Bing Maps Settings'
                }
            }).fetch().then(result => {
                const bingL = L.tileLayer.bing({
                bingMapsKey: result.api_key,
                imagerySet: result.imagery_set,
                culture: result.map_culture,
                type: 'AerialWithLabels',
                //style: 'wt|fc:28fa3c;lbc:a0a1a1;loc:111505_ar|fc:474747_trs|fc:222527;lbc:a0a1a1;loc:000505;sc:0_g|lc:2f3133;srv:0;lbc:a0a1a1;loc:000505'
            })
            layerC.addBaseLayer(bingL,"Modern Map")
            })
        }
        else {
            console.error('Map container not found');
        }
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
