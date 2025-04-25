<template>
    <!-- Page Content-->
    <Card v-if="!dataValidated || !materialRequest.data">
        <h1>You are not authorized to view this page.</h1>
    </Card>
    <div v-if="dataValidated && materialRequest.data" class="flex flex-col w-full h-[calc(100vh_-_9rem)] overflow-y-auto">
        <Card :title="materialRequest.data.name" :subtitle="materialRequest.data.poi_name">
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Batch:
                        </label>
                        <TextInput
                            :type="'text'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true"
                            v-model="materialRequest.data.batch_id"
                        />
                    <!-- <p id="det_reccenotes">{{batchId}} </p> -->
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Vendor:
                        </label>
                        <TextInput
                            :type="'text'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true"
                            v-model="materialRequest.data.vendor_name"
                        />
                    <!-- <p id="det_reccenotes">{{batchId}} </p> -->
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Material:
                        </label>
                        <TextInput
                            :type="'text'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true"
                            v-model="materialRequest.data.request_material"
                        />
                    <!-- <p id="det_reccenotes">{{batchId}} </p> -->
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Stage:
                        </label>
                        <TextInput
                            :type="'text'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true"
                            v-model="materialRequest.data.process_stage"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Request Notes:
                        </label>
                        <Textarea
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true"
                            v-model="materialRequest.data.request_notes"
                        />
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Approval Comment:
                        </label>
                        <Textarea
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true"
                            v-model="materialRequest.data.approval_comment"
                        />
                    </div>
                </div>
                <div class="flex justify-center items-center items-center">
                    <a :href="'https://www.google.com/maps/place/'+materialRequest.data.latitude+'%2C'+materialRequest.data.longitude"  target="_blank" rel="noopener noreferrer" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Map</a>
                </div>
            </div>
        </Card>
        <Card v-if="materialRequest.data.recce_image_1 && dataValidated" title="Recce Report" subtitle="Analyse for raising Quotation">
            <div class="grid grid-cols-3 gap-4">
                <div class="flex flex-col align-top">
                    <label for="det_storeimages" class="block text-gray-700 text-sm font-bold mb-2">
                        Store Images
                    </label>
                    <ul id="det_storeimages" class="grid grid-cols-2 gap-2">
                        <li v-if="materialRequest.data.recce_image_1">
                            <img :src="materialRequest.data.recce_image_1" width="100px" height="auto" alt=""/>
                        </li>
                        <li v-if="materialRequest.data.recce_image_2">
                            <img :src="materialRequest.data.recce_image_2" width="100px" height="auto" alt=""/>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col align-top">
                    <label for="det_authimages" class="block text-gray-700 text-sm font-bold mb-2">
                        Authorisation Images
                    </label>
                    <ul id="det_authimages" class="grid grid-cols-2 gap-2">
                        <li v-if="materialRequest.data.customer_authorisation_image_1">
                            <img :src="materialRequest.data.customer_authorisation_image_1" width="100px" height="auto" alt=""/>
                        </li>
                        <li v-if="materialRequest.data.customer_authorisation_image_2">
                            <img :src="materialRequest.data.customer_authorisation_image_2" width="100px" height="auto" alt=""/>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col align-top items-center">
                    <label for="det_reccenotes" class="block text-gray-700 text-sm font-bold mb-2">
                        Recce Notes
                    </label>
                    <TextInput id="det_reccenotes"
                        :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.recce_notes"
                    />
                </div>
            </div>
        </Card>
        <Card v-if="dataValidated" title="Raise Quotation" subtitle="Create a quotation based on the recce report and customer authorisations.">
            <div class="flex flex-col">
                <div>
                    <label for="uom" class="block text-gray-700 font-bold mb-2">Quote UOM:</label>
                    <Autocomplete variant="subtle" id="uom" v-model="selectedUOM" :options="requestDict.quoteUoms" placeholder="Select a UOM"  class="py-4"/>
                </div>
                <div>
                    <label for="quantity" class="block text-gray-700 font-bold mb-2">Quantity:</label>
                    <TextInput id="quantity"
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Quantity"
                        :disabled="false"
                        v-model="quantity" class="py-4"
                    />
                </div>
                <div>
                    <label for="rate_per_uom" class="block text-gray-700 font-bold mb-2">Rate Per UOM:</label>
                    <TextInput id="rate_per_uom"
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Rate per UOM"
                        :disabled="false"
                        v-model="ratePerUOM" class="py-4"
                    />
                </div>
                <div class="flex flex-row justify-center py-4">
                    <button @click="uploadQuotation" class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit Quotation</button>
                    <button @click="$router.go(-1)" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
import { ref } from 'vue';
import {createResource,createDocumentResource,Card} from 'frappe-ui'
import {sessionUser} from '@/data/session';
export default {
    name:'Quotation',
    props:{
        batchId:{
        type:String,
        required:true
        },
        vendorId:{
        type:String,
        required:true
        },
        requestId:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            dataValidated:false,
            materialRequest: ref([]),
            userVendorDetails:ref([]),
            requestDict: ref([]),
            selectedUOM:'',
            quantity:'',
            ratePerUOM:''
        }
        
    },
    methods:{
        containsAny(arr1, arr2) {
            return arr1.some(item1 => arr2.some(item2 => item1.includes(item2)));
        },
        uploadQuotation(){
            if(this.selectedUOM != '' && Number(this.quantity)>0 && Number(this.ratePerUOM)>0){
                try{
                    this.materialRequest.setValue.submit({
                    quantity: Number(this.quantity),
                    quote_uom: this.selectedUOM.value,
                    quote_rate_per_uom:Number(this.ratePerUOM),
                    quotation_price: Number(this.quantity)*Number(this.ratePerUOM),
                    process_stage:'Submitted Quotation for Requirements'
                })
                const commentHandler=createResource({
                    url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.custom_comment',
                        params:{
                            doc:this.materialRequest.data.name,
                            process_stage:'Submitted Quotation for Requirements',
                            user: sessionUser()
                        }
                })
                commentHandler.fetch()
                }
                catch(err){
                    throw err
                }
                this.$router.go(-1);
            }
            else{
                alert('Please fill all the details')
            }
        }
    },
    mounted(){
        // console.log(this.host)
        this.userVendorDetails = createResource({
            url:'/api/method/crm_extension.crm_extension.doctype.vendor.vendor.evaluate_user_for_vendor',
            params:{
                vendor:this.vendorId,
                user: sessionUser()
            }
        })
        this.userVendorDetails.fetch().then((res)=>{
            this.userVendorDetails.data = res
            // console.log(this.userVendorDetails.data)
            if(this.userVendorDetails.data.roles.length > 0){
                if(this.userVendorDetails.data.vendor && this.containsAny(this.userVendorDetails.data.roles,['Vendor Admin','Company Evaluator'])){
                    this.dataValidated=true;
                    this.materialRequest = createDocumentResource({
                        doctype:'Marketing Material Request',
                        name:this.requestId,
                        fields:['*']
                    })
                    this.materialRequest.reload().then((res)=>{
                        this.materialRequest.data = res
                        // console.log(this.materialRequest.data)
                    })
                    this.requestDict = createResource({
                        url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.get_doctype_meta',
                        params:{
                            doctype:'Marketing Material Request'
                        }
                    })
                    this.requestDict.fetch().then((res)=>{
                        this.requestDict.quoteUoms = res.fields.filter(field => field.fieldname ==='quote_uom')[0].options.split('\n').map(option => {return { label: option.trim(), value: option.trim() }});
                        // console.log(this.requestDict.quoteUoms)
                    })
                    
                }
            }
        })
    }
}
</script>
<script setup>
import { Autocomplete,TextInput,Textarea } from 'frappe-ui'
</script>
<style scoped>
.rounded-input {
  border-radius: 8px; /* Adjust the value for more or less rounding */
  border: 1px solid #ccc; /* Optional: Add a border */
  padding: 8px; /* Optional: Add some padding */
  outline: none; /* Remove default outline */
  transition: border-color 0.3s; /* Optional: Add transition for focus effect */
}

.rounded-input:focus {
  border-color: #007bff; /* Optional: Change border color on focus */
}
</style>