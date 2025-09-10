import L from 'leaflet';
import { ref } from 'vue';


 export async function getCRMPOIsInPincode(pincodes){
    
 } 

export function getBoundsFromLatLng(setLat,setLng, radius) {
  const earthRadius = 6378137; // Earth's radius in meters
  
  const lat = Number(setLat);
  const lng = Number(setLng);
  // Convert radius from meters to degrees
  const latOffset = (radius / earthRadius) * (180 / Math.PI);
  const lngOffset = (radius / (earthRadius * Math.cos(Math.PI * lat / 180))) * (180 / Math.PI);

  // Calculate the bounding box coordinates
  const northEast = L.latLng(lat + latOffset, lng + lngOffset);
  const southWest = L.latLng(lat - latOffset, lng - lngOffset);

  // Create a Leaflet LatLngBounds object
  return L.latLngBounds(southWest, northEast);
}
export function generateHTMLTemplate(feature,navigateUrl){
    // const poiUrl = '/romeo/bazooka/'+feature.properties.name+'?location_name='+feature.properties.location_name+'&crm_lead_id='+feature.properties.crm_lead_id+'&fieldassist_id='+feature.properties.fieldassist_id+'&fieldmate_id='+feature.properties.fieldmate_id+'&workmate_id='+feature.properties.workmate_id+'&latitude='+feature.geometry.coordinates[1]+'&longitude='+feature.geometry.coordinates[0]+'&source='+feature.properties.source+'&poi_status='+feature.properties.poi_status;
    const poiUrl = '/romeo/bazooka/'+feature.properties.name+'?source='+feature.properties.source
    const closeUrl = '/romeo/bazooka/'+feature.properties.name+'/close?source='+feature.properties.source
    return L.Util.template(`<table>
      <tr><td><b>Location ID</b></td><td>${feature.properties.name}</td></tr>
      <tr><td><b>Location Name</b></td><td>${feature.properties.location_name}</td></tr>
      <tr><td><b>CRM Lead ID</b></td><td>${feature.properties.crm_lead_id}</td></tr>
      <tr><td><b>Field Assist ID</b></td><td>${feature.properties.fieldassist_id}</td></tr>
      <tr><td><b>Fieldmate ID</b></td><td>${feature.properties.fieldmate_id}</td></tr>
      <tr><td><b>Workmate ID</b></td><td>${feature.properties.workmate_id}</td></tr>
      <tr><td><b>Source</b></td><td>${feature.properties.source}</td></tr>
      <tr><td><b>POI Status</b></td><td>${feature.properties.poi_status}</td></tr>
      </table>
      <table>
      <tr>
        <tr style="border-collapse: collapse;">
          <td style="padding: 10px; margin: 5px;  text-align: center;">
            <a href="${navigateUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 8px 12px; background-color: #f0f0f0; border-radius: 4px;">Google Map</a>
          </td>
          <td style="padding: 10px; margin: 5px; text-align: center;">
            <a href="${poiUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 8px 12px; background-color: #f0f0f0; border-radius: 4px;">Actions</a>
          </td>
          <td style="padding: 10px; margin: 5px; text-align: center;">
            <a href="${closeUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 8px 12px; background-color: #ff0000; border-radius: 4px; color: #000000;">Closure</a>
          </td>
        </tr>
      </table>`)
}
export function convertPOIPointsToGeoJson(pois){
    const geoJson = {
        type: 'FeatureCollection',
        crs: {
          "type": "name",
          "properties": {
              "name": "urn:ogc:def:crs:EPSG::3857"
          }
        },
        features: pois.map(point => {
            //console.log(point)
            return {
            type: 'Feature',
            properties: {
              name: point.name,
              location_name: point.location_name,
              crm_lead_id: point.crm_lead_id || 'NA',
              fieldassist_id: point.fieldassist_id || 'NA',
              fieldmate_id: point.fieldmate_id || 'NA',
              workmate_id: point.workmate_id || 'NA',
              source: ((point.fieldassist_id) ? 'Field Assist' : (point.fieldmate_id) ? 'Old Field Mate' : (point.workmate_id) ? 'Old Work Mate' : 'NA'),
              poi_status: point.poi_status
            },
            geometry: {
              type: 'Point',
              coordinates: [point.longitude || 0, point.latitude || 0]
            }
            };
        })
      };
      return geoJson;
}
export function calculateDistance(fromPoint,toPoint){
    const R = 6371e3; // metres
    const φ1 = fromPoint.latitude * Math.PI/180; // φ, λ in radians
    const φ2 = toPoint.latitude * Math.PI/180;
    const Δφ = (toPoint.latitude-fromPoint.latitude) * Math.PI/180;
    const Δλ = (toPoint.longitude-fromPoint.longitude) * Math.PI/180;
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // in metres
    return d.toFixed(2);
}
