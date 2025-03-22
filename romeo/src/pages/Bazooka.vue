<template>
  <div id="map" ref="mapContainer" class="map"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import L, { map } from 'leaflet';
import {createListResource,createResource} from 'frappe-ui'
import 'leaflet-search'
import {LocateControl} from 'leaflet.locatecontrol';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css"; 
//import "leaflet-search/dist/leaflet-search.src.css"
import bingLayer from 'leaflet-bing-layer'
import {useRoute} from 'vue-router'
const mapContainer = ref(null);
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const queryParams = JSON.parse(JSON.stringify(Object.fromEntries(params)));
//console.log(JSON.parse(queryParams.places))
onMounted(() => {
    if(queryParams){
        initMap(queryParams.lat,queryParams.long,JSON.parse(queryParams.places));
    }
})

function getBoundsFromLatLng(latlng, radius) {
    const earthRadius = 6378137; // Earth's radius in meters
  const lat = latlng.lat;
  const lng = latlng.lng;

  // Convert radius from meters to degrees
  const latOffset = (radius / earthRadius) * (180 / Math.PI);
  const lngOffset = (radius / (earthRadius * Math.cos(Math.PI * lat / 180))) * (180 / Math.PI);

  // Calculate the bounding box coordinates
  const northEast = L.latLng(lat + latOffset, lng + lngOffset);
  const southWest = L.latLng(lat - latOffset, lng - lngOffset);

  // Create a Leaflet LatLngBounds object
  return L.latLngBounds(southWest, northEast);
}
function generateHTMLTemplate(feature,win_url){
    return L.Util.template(`<table><tr><td><b>Location ID</b></td><td>${feature.properties.name}</td></tr><tr><td><b>Location Name</b></td><td>${feature.properties.location_name}</td></tr><tr><td><b>CRM Lead ID</b></td><td>${feature.properties.crm_lead_id}</td></tr><tr><td><b>Field Assist ID</b></td><td>${feature.properties.fieldassist_id}</td></tr><tr><td><b>Fieldmate ID</b></td><td>${feature.properties.fieldmate_id}</td></tr><tr><td><b>Workmate ID</b></td><td>${feature.properties.workmate_id}</td></tr><tr><td><a href="${win_url}" target="_blank" rel="noopener noreferrer">Navigate</a></td></tr></table>`)
}
function initMap(setlat,setlong,pincodes) {
    //console.log(pincodes)
    const mapResource = createListResource({
        doctype: "CRM POI",
        fields:["*"],
        filters:[["pincode","in",pincodes]],
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
        }
        if(mapContainer.value){
            const centerLatLng = L.latLng(setlat, setlong);
            mapContainer.value = L.map('map', { zoomControl: false }).setView([setlat, setlong], 12);
            const bounds = getBoundsFromLatLng(centerLatLng, 30 * 1000); // 80 km in meters
            //console.log(bounds)
            mapContainer.value.setMaxBounds(bounds);
            // Optionally, fit the map view to these bounds
            mapContainer.value.fitBounds(bounds);
            const geoLocate = new LocateControl().addTo(mapContainer.value)
            const zoomControl = L.control.zoom({ position: 'topleft' }).addTo(mapContainer.value)
            const osmTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapContainer.value);
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
                let win_url = "https://www.google.com/maps/place/"+feature.geometry.coordinates[1]+','+feature.geometry.coordinates[0]
                layer.bindPopup(generateHTMLTemplate(feature,win_url))
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
                let win_url = "https://www.google.com/maps/place/"+feature.geometry.coordinates[1]+','+feature.geometry.coordinates[0]
                layer.bindPopup(generateHTMLTemplate(feature,win_url))
            }})
            
            const newPOISearch = new L.Control.Search({
                position: 'topleft',
                layer: L.layerGroup([newGeoJSONLayer,oldGeoJSONLayer]),
                placeholder: 'Search Locations',
                propertyName: 'location_name',
                zoomToResult: true,
            })
            newPOISearch.addTo(mapContainer.value)
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
            }).fetch().then(result => {const bingL = L.tileLayer.bing({
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
    width: "100%";
    height: 100vh;
}
.leaflet-popup-content-wrapper {
    background: #e0e0e0;
    color: #234c5e;
}
</style>
