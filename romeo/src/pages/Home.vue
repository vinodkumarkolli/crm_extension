<!--Generate code vue code using leaflet.js Openstreet Maps map interface-->
<template>
  <div class=" grid place-items-center px-10 py-10 bg-gray-100 h-screen">  
    <router-view></router-view>
    <div class=" bg-white h-1/2 md:h-quarter w-1/2 rounded-md shadow-md">
      <h1 class="text-white flex flex-col items-center justify-center unique-color-map rounded-md shadow-md text-4xl font-bold mb-4">Bazooka</h1>
      <h4 class="text-gray-500 flex flex-col items-center">Lets find our juliet. First, select the city</h4>
      <div class="flex flex-col items-center">
      <DotLottieVue style="height: 150px; width: 150px" autoplay loop src="https://lottie.host/af681258-e29a-4769-b738-e7c2038fd634/sv9sNIp7cO.lottie" />
    </div>
      <div class="flex flex-row justify-center items-center ">
        <select id="selectedCity" class="px-5 basis-128 rounded-md block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
          <option disabled selected :value="null">Choose City</option>
          <option v-for="option in territories" :key="option.crm_territory" :value="option.crm_territory">
            {{ option.crm_territory }}
          </option>
        </select>
        <button type="button" id="launchMap" @click="launchMapSetting" title="Lets Touchdown" class="text-white unique-color-map hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        <span class="sr-only">Lets Touchdown</span>
        </button>
    </div>
  </div>
  </div>
  
</template>
<script>
export default {
  name: "Bazooka",
  methods: {
    launchMapSetting(){
      let selectedCity =  document.getElementById("selectedCity").value
      if(selectedCity == 'Choose City')
      {
        alert("Select a proper city")
      }
      else{
        const geo = geography.filter(geo => geo.name === selectedCity)[0]
        this.$router.push({path:'/bazooka',query : { lat:geo.lat,long:geo.long,places:JSON.stringify(geo.places) } })
      }
    }
  }
}
</script>
<script setup>
import { geography } from '../data/geo';
import {DotLottieVue} from '@lottiefiles/dotlottie-vue'
import {sessionUser} from '../data/session'
import {createListResource} from 'frappe-ui'
import { ref } from 'vue';

let territories = ref([])
createListResource({
        doctype: "User Territory Mapping",
        fields:["*"],
        filters:[["user","=",sessionUser()],["docstatus","=",1]],
        pageLength: "None",
        auto: true
}).reload().then(response => {
  const liTerr = JSON.parse(JSON.stringify(response))
  for (let i of liTerr){
    territories.value.push(i)
    // console.log(i)
  }
})

</script>
<style scoped>
.unique-color-map{
  background-color: var(--sidebar-bg-color);
}
</style>