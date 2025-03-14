<template>
  <div id="map" ref="mapContainer" class="map"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import L, { map } from 'leaflet';
import {createListResource} from 'frappe-ui'
import leafletSearch from 'leaflet-search/src/leaflet-search';

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
        const pois = JSON.parse(JSON.stringify(response))
        const oldPOIs = pois.filter(poi => poi.fieldassist_id === null)
        const newPOIs = pois.filter(poi => poi.fieldassist_id !== null)
        //convert pois variable to geoJSON
        let newGeoJsonFeatureCollection = {
            type: "FeatureCollection",
            crs: {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::3857"
                }
            },
            features: []
        }
        let oldGeoJsonFeatureCollection = {
            type: "FeatureCollection",
            crs: {
                "type": "name",
                "properties": {
                    "name": "urn:ogc:def:crs:EPSG::3857"
                }
            },
            features: []
        }
        //loop through newpois to add features to geoJSON
        for (let poi of newPOIs) {
            newGeoJsonFeatureCollection.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [poi.longitude, poi.latitude]
                },
                properties: poi
            })
            // console.log(poi)
        }
        for (let poi of oldPOIs) {
            oldGeoJsonFeatureCollection.features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [poi.longitude, poi.latitude]
                },
                properties: poi
            })
            // console.log(poi)
        }
        //console.log(geoJsonFeatureCollection)
        if(mapContainer.value){
            mapContainer.value = L.map('map', { zoomControl: false }).setView([13.009409, 80.151071], 12);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapContainer.value);
            L.control.zoom({ position: 'bottomright' }).addTo(mapContainer.value);
            const newGeoJSONLayer = L.geoJson(newGeoJsonFeatureCollection, {
            //add code to convert pointTo Circle
            pointToLayer: function(feature,latlng){
                return L.circle(latlng,{
                    radius: 8,
                fillColor: 'green',
                color: '#000',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.5
                })
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(L.Util.template(`<b>${feature.properties.name}</b><br /> ${feature.properties.crm_lead_id}<br /> ${feature.properties.fieldassist_id}<br /> ${feature.properties.fieldmate_id}<br /> ${feature.properties.workmate_id}`));
            }})
            const oldGeoJSONLayer = L.geoJson(oldGeoJsonFeatureCollection, {
            //add code to convert pointTo Circle
            pointToLayer: function(feature,latlng){
                return L.circle(latlng,{
                    radius: 8,
                fillColor: 'red',
                color: '#000',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.5
                })
            },
            onEachFeature: function (feature, layer) {
                layer.bindTooltip(L.Util.template(`<b>${feature.properties.name}</b><br /> ${feature.properties.crm_lead_id}<br /> ${feature.properties.fieldassist_id}<br /> ${feature.properties.fieldmate_id}<br /> ${feature.properties.workmate_id}`));
            }})
            
            // L.control.leafletSearch({
            //     position: 'topleft',
            //     layer: newGeoJSONLayer,
            //     placeholder: 'Search by name or crm_lead_id',
            //     propertyName: 'name',
            //     zoomToResult: true,
            // }).addTo(newGeoJSONLayer)
            // L.control.leafletSearch({
            //     position: 'topleft',
            //     layer: oldGeoJSONLayer,
            //     placeholder: 'Search by name or crm_lead_id',
            //     propertyName: 'name',
            //     zoomToResult: true,
            // }).addTo(oldGeoJSONLayer)
            const baseMaps = {
                "Field Assist": newGeoJSONLayer,
                "Old Fieldmate": oldGeoJSONLayer
            }
            L.control.layers(baseMaps).addTo(mapContainer.value)
            //newGeoJSONLayer.addTo(mapContainer.value)
            //oldGeoJSONLayer.addTo(mapContainer.value)
        }
        else {
            console.error('Map container not found');
        }
    });
}
</script>
<style scoped>
.map{
    width: "100%";
    height: 100vh;
}
</style>
