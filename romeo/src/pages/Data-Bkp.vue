<!--Generate Code to use createListResource from frappe-ui to read doctype CRM POI-->
<template>
    <pre>{{JSON.stringify(mapPoi)}}</pre>
</template>
<script setup>
import { pois } from '../data/poi';
const mapPoi = await pois.fetch()
console.log(mapPoi)
</script>