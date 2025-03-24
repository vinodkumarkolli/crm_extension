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
export function generateHTMLTemplate(feature,win_url){
    return L.Util.template(`<table><tr><td><b>Location ID</b></td><td>${feature.properties.name}</td></tr><tr><td><b>Location Name</b></td><td>${feature.properties.location_name}</td></tr><tr><td><b>CRM Lead ID</b></td><td>${feature.properties.crm_lead_id}</td></tr><tr><td><b>Field Assist ID</b></td><td>${feature.properties.fieldassist_id}</td></tr><tr><td><b>Fieldmate ID</b></td><td>${feature.properties.fieldmate_id}</td></tr><tr><td><b>Workmate ID</b></td><td>${feature.properties.workmate_id}</td></tr><tr><td><a href="${win_url}" target="_blank" rel="noopener noreferrer">Navigate</a></td></tr></table>`)
}
export const geography =[
    {name:'Chennai', lat:13.009409, long: 80.151071, 
    places:['600001','600002','600003','600004','600005','600006','600007','600008','600010','600011','600012','600013','600014','600015','600016','600017','600018','600019','600020','600021','600022','600023','600024','600025','600026','600027','600028','600029','600030','600031','600032','600033','600034','600035','600036','600037','600038','600039','600040','600041','600042','600043','600044','600045','600046','600047','600048','600049','600050','600051','600052','600053','600054','600055','600056','600057','600058','600059','600060','600061','600062','600063','600064','600066','600067','600069','600070','600071','600072','600073','600074','600075','600076','600077','600078','600079','600081','600082','600083','600084','600085','600086','600087','600088','600089','600090','600091','600092','600093','600094','600095','600096','600097','600098','600099','600100','600101','600102','600103','600106','600107','600110','600112','600113','600115','600116','600117','600118','600119','600120','600122','600123','600124','600125','600126','600127','600128','600129','600130','600132','601101','601102','601103','601201','601202','601203','601204','601205','601206','601301','602001','602002','602021','602023','602024','602026','602105','602117','603001','603004','603103','603112','603202','603203','603204','603209','603210','603211','603406']},{name:'Coimbatore',lat:11.014743, long:76.967599}]