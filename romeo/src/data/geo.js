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
    const poiUrl = '/romeo/bazooka/'+feature.properties.name+'?location_name='+feature.properties.location_name+'&crm_lead_id='+feature.properties.crm_lead_id+'&fieldassist_id='+feature.properties.fieldassist_id+'&fieldmate_id='+feature.properties.fieldmate_id+'&workmate_id='+feature.properties.workmate_id+'&latitude='+feature.geometry.coordinates[1]+'&longitude='+feature.geometry.coordinates[0]+'&source='+feature.properties.source+'&poi_status='+feature.properties.poi_status;
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
            <a href="${poiUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; padding: 8px 12px; background-color: #f0f0f0; border-radius: 4px;">Report</a>
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
export const geography =[
    {name:'Chennai', lat:13.009409, long: 80.151071, 
    places:['600001','600002','600003','600004','600005','600006','600007','600008','600010','600011','600012','600013','600014','600015','600016','600017','600018','600019','600020','600021','600022','600023','600024','600025','600026','600027','600028','600029','600030','600031','600032','600033','600034','600035','600036','600037','600038','600039','600040','600041','600042','600043','600044','600045','600046','600047','600048','600049','600050','600051','600052','600053','600054','600055','600056','600057','600058','600059','600060','600061','600062','600063','600064','600066','600067','600069','600070','600071','600072','600073','600074','600075','600076','600077','600078','600079','600081','600082','600083','600084','600085','600086','600087','600088','600089','600090','600091','600092','600093','600094','600095','600096','600097','600098','600099','600100','600101','600102','600103','600106','600107','600110','600112','600113','600115','600116','600117','600118','600119','600120','600122','600123','600124','600125','600126','600127','600128','600129','600130','600132','601101','601102','601103','601201','601202','601203','601204','601205','601206','601301','602001','602002','602021','602023','602024','602026','602105','602117','603001','603004','603103','603112','603202','603203','603204','603209','603210','603211','603406']},{name:'Coimbatore',lat:11.014743, long:76.967599}]