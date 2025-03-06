<!--Generate Code to use createListResource from frappe-ui to read doctype CRM POI-->
<template>
    <div  class="space-y-4">
        <div class="flex items-center justify-between"
        v-for="mapPOI in mapPOIs"
        :key="mapPOI.name">
        <div>{{ mapPOI.crm_lead_id }}</div>
        <div>{{ mapPOI.fieldassist_id }}</div>
        <div>{{ mapPOI.fieldmate_id }}</div>
        <div>{{ mapPOI.workmate_id }}</div>
        <div>{{ mapPOI.latitude }}</div>
        <div>{{ mapPOI.longitude }}</div>
    </div>
    </div>
</template>
<script >
// import { pois } from "../data/poi";
import { toRaw } from "vue";
import { createListResource } from 'frappe-ui';
import {computed} from 'vue';

//let mapPOIs = toRaw(pois.data,{deep:true})
let mapPOISResource = createListResource({
    doctype:"CRM POI",
    fields:["*"],
    auto: true
})
const mapPOIs = computed(()=> {
    return JSON.stringify(mapPOISResource.list)
})
console.log(JSON.stringify(mapPOISResource))
</script>