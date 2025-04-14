<template>
  <div>
    <router-view></router-view>
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
     <Card title="Select Batch" subtitle="Navigate to Batch profile" class="mb-10">
      <div class="flex flex-row items-start justify-between">
        <Autocomplete
          label="Batch"
          placeholder="Search Batch..."
          :options="batchOptions"
          v-model="selectedBatch"
        />
        <button type="submit" @click="navigateBatchProfile" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          View Batch Profile
        </button>
      </div>
    </Card>
  </div>
</template>
<script>
import { ref } from 'vue'

import { createResource } from 'frappe-ui'
import {sessionUser} from '@/data/session'

export default {
  name:'Vendor',
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
      batchSectionValidated:ref(false),
      batchOptions:ref([]),
      selectedBatch:''
    }
  },
  methods:{
    navigateBatchProfile(){
      if(this.selectedBatch){
        this.$router.push({name:"Batch",params:{batchId:this.selectedBatch.value}})
      }else{
        alert('Please select a batch')
      }
    }
  },
  mounted(){
    this.userVendorDetails = createResource({
      url:'/api/method/crm_extension.crm_extension.doctype.vendor.vendor.evaluate_user_for_vendor',
      params:{
        vendor:this.vendorId,
        user: sessionUser()
      }
    })
    this.userVendorDetails.fetch().then((res)=>{
      this.userVendorDetails.data = res
      if(this.userVendorDetails.data.roles.length > 0){
        if(this.userVendorDetails.data.vendor){
        this.dataValidated=true;
        }
        if(this.userVendorDetails.data.batches){
          this.batchSectionValidated=true;
          this.batchOptions=this.userVendorDetails.data.batches.map(batch=>{return {'value':batch.name,'label':batch.batch_identifier,'description':'Created On: '+batch.creation_date+'  Batch Status: '+batch.batch_state}})
        }
      }
      
    })
  }
}
</script>
<script setup>
import {Card,TextInput, Autocomplete} from "frappe-ui"
</script>