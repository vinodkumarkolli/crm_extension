<template>
  <div>
    <Card v-if="dataValidated" title="Vendor Details" class="mb-10">
      <div class="grid grid-cols-3 gap-2">
        <div>
          <label for="det_vendor_name" class="block text-gray-700 text-sm font-bold mb-2">
            Vendor Name
          </label>
          <TextInput id="det_vendor_name"
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="NA"
            :disabled="true"
            v-model="userVendorDetails.data.vendor.vendor_name"
          />
        </div>
        <div>
          <label for="det_material_handled" class="block text-gray-700 text-sm font-bold mb-2">
            Material Handled
          </label>
          <TextInput id="det_material_handled"
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="NA"
            :disabled="true"
            v-model="userVendorDetails.data.vendor.marketing_material_type"
          />
        </div>
        <div>
          <label for="det_address" class="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <TextInput id="det_address"
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="NA"
            :disabled="true"
            v-model="userVendorDetails.data.vendor.address"
          />
        </div>
        <div>
          <label for="det_territory" class="block text-gray-700 text-sm font-bold mb-2">
            Territory
          </label>
          <TextInput id="det_territory"
            :type="'text'"
            :ref_for="true"
            size="sm"
            variant="subtle"
            placeholder="NA"
            :disabled="true"
            v-model="userVendorDetails.data.vendor.territory"
          />
        </div>
      </div>
    </Card>
    <!-- Using tabs feature from https://www.creative-tim.com/david-ui/docs/html/tabs -->
     <Card title="Vendor Actions" subtitle="Select requests and perform actions" class="mb-10">
      <div class="tab-group flex mt-10 w-6/12" data-dui-orientation="vertical">
        <div role="tablist" class="relative bg-stone-100 rounded-lg flex flex-col p-1 w-10/12">
          <div class="absolute top-0 left-0 right-0 mx-1 w-auto bg-lime-400 rounded-md shadow-sm transition-all duration-300 transform scale-x-0 translate-x-0 tab-indicator z-0"></div>
          <a href="#" class="tab-link flex items-center text-sm active px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-recce-requests">
            <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  class="mr-2 h-4 w-4 feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
             Start Recce 
          </a>
          <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-quotation-requests">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-book"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
             Quotations </a>
          <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-manufacture-attestation">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-tool"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
             Attest Manufacture </a>
          <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-delivery-requests">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
             Delivery </a>
          <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-delivery-attestation">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
             Attest Delivery </a>
          <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-service-requests">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-battery-charging"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline></svg>
             Service Requests </a>
          <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-service-attestation">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
             Attest Servicing </a>
        </div>
        <div id="tab-recce-requests" class="tab-content w-full text-stone-500 text-sm block p-4">
          <div v-if="dataValidated">Recce Requests</div>
        </div>
        <div id="tab-quotation-requests" class="tab-content w-full text-stone-500 text-sm hidden p-4">
          <div v-if="dataValidated">Quotation Requests</div>
        </div>
        <div id="tab-manufacture-attestation" class="tab-content w-full text-stone-500 text-sm hidden p-4">
          <div v-if="dataValidated">Manufacture Attestation</div>
        </div>
        <div id="tab-delivery-requests" class="tab-content w-full text-stone-500 text-sm hidden p-4">
          <div v-if="dataValidated">Delivery Requests</div>
        </div>
        <div id="tab-delivery-attestation" class="tab-content w-full text-stone-500 text-sm hidden p-4">
          <div v-if="dataValidated">Delivery Attestation</div>
        </div>
        <div id="tab-service-requests" class="tab-content w-full text-stone-500 text-sm hidden p-4">
          <div v-if="dataValidated">Service Requests</div>
        </div>
        <div id="tab-service-attestation" class="tab-content w-full text-stone-500 text-sm hidden p-4">
          <div v-if="dataValidated">Service Attestation</div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { ref } from 'vue'
import { initTabs } from 'david-ai';
import { createResource } from 'frappe-ui'
import {sessionUser} from '@/data/session'

export default {
  props:{
    vendorId:{
      type:String,
      required:true
    }
  },
  data(){
    return{
      userVendorDetails:ref([]),
      dataValidated:ref(false),
      recceRequests:ref([]),
      quotationRequests:ref([]),
      manufactureAttestation:ref([]),
      deliveryRequests:ref([]),
      deliveryAttestation:ref([]),
      serviceRequests:ref([]),
      serviceAttestation:ref([])
    }
  },
  methods:{
    async getRecceRequests(){
    }
  },
  mounted(){
    // console.log(this.vendorId)
    initTabs();
    this.userVendorDetails = createResource({
      url:'/api/method/crm_extension.crm_extension.doctype.vendor.vendor.evaluate_user_for_vendor',
      params:{
        vendor:this.vendorId,
        user: sessionUser()
      }
    })
    this.userVendorDetails.fetch().then((res)=>{
      this.userVendorDetails.data = res
      // console.log(this.userVendorDetails.data.vendor)
      if(this.userVendorDetails.data.vendor && (this.userVendorDetails.data.roles.length > 0)){
        this.dataValidated=true;
        
      }
    })
  }
}
</script>
<script setup>
import {Card,TextInput,Textarea} from "frappe-ui"
</script>