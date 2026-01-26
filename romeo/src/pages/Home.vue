<!--Generate code vue code using leaflet.js Openstreet Maps map interface-->
<template>
  <div v-if="hasAccess" class=" grid place-items-center px-10 py-10 bg-gray-100 h-screen">  
    <router-view></router-view>
    <!-- Source for Card Component https://www.youtube.com/watch?v=djpXDquzrvQ & https://github.com/frappe/frappe-ui/blob/main/src/components/Card.vue -->
    <Card title="Bazooka" subtitle="Lets Find Juliet!"  class="flex flex-col items-center">
      <div class="flex flex-col items-center">
        <DotLottieVue style="height: 150px; width: 150px" autoplay loop src="https://lottie.host/af681258-e29a-4769-b738-e7c2038fd634/sv9sNIp7cO.lottie" />
      </div>
      <div class="flex flex-row justify-center items-center ">
        <Autocomplete
          :options="territories"
          v-model="selectedLocation"
          placeholder="Select Place"
        />
        <button type="button" id="launchMap" @click="launchMapSetting" title="Lets Touchdown" class="text-white unique-color-map hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        <span class="sr-only">Lets Touchdown</span>
        </button>
      </div>
    </Card>
  </div>
  <div v-else class="flex h-screen items-center justify-center bg-gray-100">
      <div class="text-xl font-bold text-red-500">Restricted Access</div>
  </div>
</template>
<script>
import { geography } from '../store/locations';
export default {
  name: "Bazooka",
  data(){
    return{
      territories:geography.map(location =>{
                    return {label:location.name,value:location.name,pincodes:location.places,districts:location.districts}
                  }),
      selectedLocation:null
    }
  },
  methods: {
    launchMapSetting(){
      if(!this.selectedLocation || !this.selectedLocation.label)
      {
        alert('Please Select a Location');
        return;
      }
      else{
        this.$router.push({path:'/bazooka',query :{location:this.selectedLocation.value}})
      }
      // if(selectedCity == 'Choose City')
      // {
      //   alert("Select a proper city")
      // }
      // else{
      //   const geo = geography.filter(geo => geo.name === selectedCity)[0]
      //   this.$router.push({path:'/bazooka',query : { lat:geo.lat,long:geo.long,places:JSON.stringify(geo.places) } })
      // }
    }
  }
}
</script>
<script setup>
import { computed } from 'vue';
import {DotLottieVue} from '@lottiefiles/dotlottie-vue'
import {sessionUser} from '../data/session'
import {createListResource,Autocomplete,Card, createResource} from 'frappe-ui'
import { ref } from 'vue';

const userRes = createResource({
    url: 'frappe.auth.get_logged_user',
    auto: true
})

const hasAccess = computed(() => {
    const data = userRes.data || {}
    const roles = (data.roles || data.message?.roles || []).map(r => r.trim().toLowerCase());
    return roles.some(r => ["bazooka user", "romeo admin", "system manager", "administrator"].includes(r));
});

// let territories = ref([])
// createListResource({
//         doctype: "User Territory Mapping",
//         fields:["*"],
//         filters:[["user","=",sessionUser()],["docstatus","=",1],["app","=","Bazooka"]],
//         pageLength: "None",
//         auto: true
// }).reload().then(response => {
//   const liTerr = JSON.parse(JSON.stringify(response))
//   for (let i of liTerr){
//     territories.value.push(i)
//     // console.log(i)
//   }
// })

</script>
<style scoped>
.unique-color-map{
  background-color: var(--sidebar-bg-color);
}
</style>