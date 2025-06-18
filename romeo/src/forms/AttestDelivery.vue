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
        <Card v-if="materialRequest.data.recce_image_1 && dataValidated" title="Recce Report">
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
                    <!-- <p id="det_reccenotes">{{materialRequest.data.recce_notes}} </p> -->
                </div>
            </div>
        </Card>
        <Card v-if="materialRequest.data.quote_price && dataValidated && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" title="Quotation Details">
            <div class="grid grid-cols-4 gap-4">
                <div>
                    <label for="det_quantity" class="block text-gray-700 text-sm font-bold mb-2">
                        Quantity
                    </label>
                    <TextInput id="det_quantity"
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.quantity"
                    />
                </div>
                <div>
                    <label for="det_uom" class="block text-gray-700 text-sm font-bold mb-2">
                        UOM
                    </label>
                    <TextInput id="det_uom"
                        :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.quote_uom"
                    />
                </div>
                <div>
                    <label for="det_rate_uom" class="block text-gray-700 text-sm font-bold mb-2">
                      Rate per UOM
                    </label>
                    <TextInput id="det_rate_uom"
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.quote_rate_per_uom"
                    />
                </div>
                <div>
                    <label for="det_rate_uom" class="block text-gray-700 text-sm font-bold mb-2">
                      Quotation Cost
                    </label>
                    <TextInput id="det_rate_uom"
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.quote_price"
                    />
                </div>
            </div>

        </Card>
        <Card v-if="materialRequest.data.manufacture_quantity && dataValidated && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" title="Installation Details">
            <div class="grid grid-cols-4 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                      Manufactured  Qty
                    </label>
                    <TextInput 
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.manufacture_quantity"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                      Manufactured  UOM
                    </label>
                    <TextInput 
                        :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.quote_uom"
                    />
                </div>
                <div v-if="materialRequest.data.installation_quantity">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                      Installed Qty
                    </label>
                    <TextInput 
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.installation_quantity"
                    />
                </div>
                <div v-if="materialRequest.data.installation_quantity">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                      Installed  UOM
                    </label>
                    <TextInput 
                        :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.quote_uom"
                    />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 py-4">
                <div class="flex flex-col align-top">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Manufacturing Images
                    </label>
                    <ul class="grid grid-cols-2 gap-2">
                        <li v-if="materialRequest.data.manufactured_image_1">
                            <img :src="materialRequest.data.manufactured_image_1" width="100px" height="auto" alt=""/>
                        </li>
                        <li v-if="materialRequest.data.manufactured_image_2">
                            <img :src="materialRequest.data.manufactured_image_2" width="100px" height="auto" alt=""/>
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col align-top">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Installed Images
                    </label>
                    <ul class="grid grid-cols-2 gap-2">
                        <li v-if="materialRequest.data.installation_image_1">
                            <img :src="materialRequest.data.installation_image_1" width="100px" height="auto" alt=""/>
                        </li>
                        <li v-if="materialRequest.data.installation_image_2">
                            <img :src="materialRequest.data.installation_image_2" width="100px" height="auto" alt=""/>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 py-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Manufacturing Notes:
                    </label>
                    <Textarea
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.manufacturing_notes"
                    />
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Installation Notes:
                    </label>
                    <Textarea
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.installation_notes"
                    />
                </div>
            </div>
        </Card>
        <Card v-if="dataValidated" title="Attest Delivery" subtitle="This is the last step in processing. Once attested, delivery is deemed as completed without any issues.">
            <div class="flex flex-col">
                <div class="grid grid-cols-2 gap-4 py-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Attestation Comment:
                    </label>
                    <Textarea
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Enter your notes here..."
                        v-model="attestationNotes"
                    />
                    <label class="block text-gray-700 font-bold mb-2"></label>
                </div>
                <div class="flex flex-row justify-center py-4">
                    <button @click="attestDeliveryRequest" class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Attest & Complete</button>
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
    name:'Request Details',
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
            host:window.location.host,
            dataValidated:false,
            materialRequest: ref([]),
            userVendorDetails:ref([]),
            attestationNotes:''
        }
    },
    methods:{
        containsAny(arr1, arr2) {
            return arr1.some(item1 => arr2.some(item2 => item1.includes(item2)));
        },
        attestDeliveryRequest(){
            if(this.attestationNotes!=''){
                try{
                    let materialRequestFieldUpdater;
                    //Updating First Field
                    materialRequestFieldUpdater = createResource({
                            url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.update_dynamic_field',
                            params:{
                                doctype:'Marketing Material Request',
                                doc:this.materialRequest.data.name,
                                fieldname:'installation_attestation_notes',
                                value:this.attestationNotes
                            }
                        })
                    materialRequestFieldUpdater.fetch();
                    //Updating Second Field
                    materialRequestFieldUpdater = createResource({
                            url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.update_dynamic_field',
                            params:{
                                doctype:'Marketing Material Request',
                                doc:this.materialRequest.data.name,
                                fieldname:'installation_verified_by',
                                value:sessionUser()
                            }
                        })
                    materialRequestFieldUpdater.fetch();
                    // this.materialRequest.setValue.submit({
                    //     installation_attestation_notes: this.attestationNotes,
                    //     installation_verified_by: sessionUser(),
                    //     process_stage:'Attested Completion of Job handled by Vendor'
                    // })
                    const materialRequestStatusUpdater=createResource({
                        url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.change_process_status',
                            params:{
                                doc:this.materialRequest.data.name,
                                process_stage:'Attested Completion of Job handled by Vendor',
                                user: sessionUser()
                            }
                    })
                    materialRequestStatusUpdater.fetch()
                    const markRequestCompleted = createResource({
                        url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.success_completion_request',
                        params:{
                            doc:this.materialRequest.data.name
                        }
                    })
                    markRequestCompleted.fetch()
                }
                catch(err){
                    throw err;
                }
                alert("Successfully attested request.")
                this.$router.go(-1);
            }
            else{
                alert('Please enter some comments before submitting.')
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
                if(this.userVendorDetails.data.vendor && this.containsAny(this.userVendorDetails.data.roles,['Company Evaluator'])){
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
                    
                }
            }
        })
    }
}
</script>
<script setup>
import {TextInput,Textarea} from 'frappe-ui'
</script>