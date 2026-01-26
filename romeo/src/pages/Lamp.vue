<template>
  <div v-if="hasAccess" class=" grid place-items-center px-10 py-10 bg-gray-100 h-screen">
    <router-view></router-view>
    <!-- Source for Card Component https://www.youtube.com/watch?v=djpXDquzrvQ & https://github.com/frappe/frappe-ui/blob/main/src/components/Card.vue -->
    <Card title="Lamp" subtitle="A guiding app for Vendors" class="flex flex-col items-center">
      <div class="flex flex-col items-center">
        <DotLottieVue style="height: 150px; width: 150px" autoplay loop src="https://lottie.host/e42df8d1-452a-4f40-b859-a4c0c5c89327/3km4ioB8r3.lottie" />
      </div>
      <div class="flex flex-row justify-center items-center ">
        <Autocomplete variant="subtle" v-model="selectedVendor" :options="vendors.items" placeholder="Select Vendor"  />
        <button type="button" @click="launchVendorDashboard" title="Launch Vendor Dashboard" class="text-white unique-color-map hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        <span class="sr-only">Launch Vendor Dashboard</span>
        </button>
        <!-- <button type="">Click me</button> -->
      </div>
    </Card>
  </div>
  <div v-else class="flex h-screen items-center justify-center bg-gray-100">
      <div class="text-xl font-bold text-red-500">Restricted Access</div>
  </div>
</template>
<script>
import {sessionUser} from '@/data/session'
import {ref} from 'vue'
import { createResource } from 'frappe-ui'
export default {
  data() {
    return {
        vendors:ref([]),
        selectedVendor:null,
    }
  },
  computed: {},
  methods: {
    launchVendorDashboard(){
      // alert(this.selectedVendor.value)
      if(!this.selectedVendor){
        alert('Please select a vendor')
        return;
      }
      else{
        this.$router.push('/lamp/'+this.selectedVendor.value)
        // alert(this.selectedVendor.value)
      }
    }
  },
  mounted() {
    this.vendors = createResource({
      url:'/api/method/crm_extension.crm_extension.doctype.vendor.vendor.get_vendors_for_session_user',
      params:{
        user:sessionUser()
      }
    })
    this.vendors.fetch().then((res)=>{
      this.vendors.items = res.map(item =>({
          label:item.vendor_name,
          value:item.name,
          description:item.marketing_material_type
      }))
    })
  }
}
</script>
<script setup>
import { computed } from 'vue';
import { Autocomplete,Card, createResource } from 'frappe-ui'
import {DotLottieVue} from '@lottiefiles/dotlottie-vue'
import { sessionUser } from '@/data/session';

const userRes = createResource({
    url: 'frappe.auth.get_logged_user',
    auto: true
})

const hasAccess = computed(() => {
    const data = userRes.data || {}
    const roles = (data.roles || data.message?.roles || []).map(r => r.trim().toLowerCase());
    return roles.some(r => ["lamp user", "romeo admin", "system manager", "administrator"].includes(r));
});
</script>
<style scoped>
.unique-color-map{
  background-color: var(--sidebar-bg-color);
}
</style>