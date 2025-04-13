<template>
  <div>
    Vendor Page
  </div>
</template>
<script>
import { ref } from 'vue'
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
      userVendorDetails:ref([])
    }
  },
  mounted(){
    // console.log(this.vendorId)
    this.userVendorDetails = createResource({
      url:'/api/method/crm_extension.crm_extension.doctype.vendor.vendor.evaluate_user_for_vendor',
      params:{
        vendor:this.vendorId,
        user: sessionUser()
      }
    })
    this.userVendorDetails.fetch().then((res)=>{
      console.log(res)
    })
  }
}
</script>