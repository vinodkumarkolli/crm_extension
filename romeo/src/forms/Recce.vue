<template>
<div> 
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
        <Card title="Upload Store Requirement" subtitle="Fill up the form" class="max-width">
            <div class="flex flex-col">
                <div class="grid grid-cols-2 gap-4 py-4">
                    <!-- <p><b>Store Images: </b></p> -->
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Store Images:
                    </label>
                    <button v-if="imageData.stores.length == 0" type="button" id="storeImageBtn" @click="openModal('stores')" class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload Image</button>
                    <button v-if="imageData.stores.length>0" @click="clearImages('stores')" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Clear Images</button>
                </div>
                <div v-if="imageData.stores?.length>0" class="flex flex-row justify-center items-center py-4">
                    <ul v-if="imageData.stores" class="grid grid-cols-2 gap-4 items-center">
                        <li v-for="(store,index) in imageData.stores" :key="index">
                            <img :src="createObjectURL(store.imageBlob)" width="100px" height="auto" alt="Captured Image" />
                        </li>
                    </ul>
                </div>
                <div class="grid grid-cols-2 gap-4 py-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Customer Authorisation:
                    </label>
                    <!-- <p><b>Customer Authorisation: </b></p> -->
                    <button v-if="imageData.quotation.length == 0" type="button" @click="openModal('quotation')" class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload Image</button>
                    <button v-if="imageData.quotation.length>0" @click="clearImages('quotation')" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Clear Images</button>
                </div>
                <div v-if="imageData.quotation?.length>0" class="flex flex-col justify-center items-center py-4">
                    <ul v-if="imageData.quotation" class="grid grid-cols-2 gap-4 items-center">
                        <li v-for="(authorisation,index) in imageData.quotation" :key="index">
                            <img :src="createObjectURL(authorisation.imageBlob)" width="100px" height="auto" alt="Captured Image" />
                        </li>
                    </ul>
                </div>
                <div class="grid grid-cols-2 gap-4 py-4">
                    <!-- <p><b>Recce Notes: </b></p> -->
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Recce Notes:
                    </label>
                    <Textarea
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Enter your notes here..."
                        v-model="recceNotes"
                    />
                    <!-- <textarea rows="4" cols="50" placeholder="Enter your notes here..." v-model="recceNotes"></textarea> -->
                </div>
                <!-- <div class="flex flex-col justify-center items-center">
                    
                    
                </div> -->
            </div>
            <div class="flex flex-row justify-center py-4">
                <button @click="saveRecceChanges" class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit Recce Form</button>
                <button @click="$router.go(-1)" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
            </div>
        </Card>
        <CameraModal :modalActive="modalActive" :source="cameraModalSource" @close-camera-modal="closeModal" @save-photos="savePhotos">
        </CameraModal>
        
    </div>
</div>
</template>
<script setup>
import {Card,TextInput,Textarea} from 'frappe-ui'
</script>
<script>
import { ref } from 'vue';
import {createResource,createDocumentResource} from 'frappe-ui';
import {sessionUser} from '@/data/session';
import CameraModal from '../components/CameraModal.vue';
// import FileReader from "file-reader";

export default {
    name:"Recce",
    components:{CameraModal},
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
            userVendorDetails:ref([]),
            materialRequest:ref([]),
            materialRequestStatusUpdater:ref([]),
            materialRequestFieldUpdater:ref([]),
            imageData:ref({stores:[],quotation:[],uploadedImageURLS:[]}),
            modalActive:ref(false),
            // fileUploader:ref([]),
            recceNotes:'',
            cameraModalSource:ref('none')
        }
    },
    methods:{
        closeModal(){
            this.cameraModalSource='none';
            this.modalActive=false;
        },
        openModal(source){
            this.cameraModalSource=source;
            this.modalActive=true;
            // this.modalActive=!this.modalActive;
        },
        clearImages(source){
            if(source==='stores'){
                this.imageData.stores=[];
            }
            else if(source==='quotation'){
                this.imageData.quotation=[];
            }
            else{
                throw Error("Invalid Source")
            }
        },
        savePhotos(dump){
            const photos=dump.urls;
            photos.forEach(photo=>{
                this.urlToBlob(photo).then((blob)=>{
                    if(dump.source === 'stores'){
                        this.imageData.stores.push({imageBlob:blob})
                    }
                    else if(dump.source === 'quotation'){
                        this.imageData.quotation.push({imageBlob:blob})
                    }
                    else{
                        throw Error("Invalid Source")
                    }
                });
            })
            this.closeModal();
        },
        createObjectURL(blob) {
            return URL.createObjectURL(blob);
        },
        async blobToBase64(blob){
            return new Promise((resolve,reject)=>{
                const reader=new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend=()=>{
                    resolve(reader.result);
                };
                reader.onerror=(err)=>reject(err);
            })
        },
        
        async urlToBlob(url){
            const response = await fetch(url);
            const blob = await response.blob();
            return blob;
        },
        async saveRecceChanges(){
            
            if(this.imageData.stores.length > 0 && this.imageData.quotation.length > 0 && this.recceNotes !== ''){
                try{
                    for (const [index,store] of this.imageData.stores.entries()) {
                        let url = '';
                        if(index == 0){
                            // this.materialRequest.setValue.submit({recce_image_1:url})
                            url = await this.uploadImageToServer(store.imageBlob,"recce_image_1");
                            this.materialRequestFieldUpdater = createResource({
                                url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.update_dynamic_field',
                                params:{
                                    doctype:'Marketing Material Request',
                                    doc:this.materialRequest.data.name,
                                    fieldname:'recce_image_1',
                                    value:url
                                }
                            })
                            this.materialRequestFieldUpdater.fetch();
                            //Updating Second Field
                            this.materialRequestFieldUpdater = createResource({
                                url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.update_dynamic_field',
                                params:{
                                    doctype:'Marketing Material Request',
                                    doc:this.materialRequest.data.name,
                                    fieldname:'recce_done_by',
                                    value:sessionUser()
                                }
                            })
                            this.materialRequestFieldUpdater.fetch();
                            //Updating Third Field
                            this.materialRequestFieldUpdater = createResource({
                                url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.update_dynamic_field',
                                params:{
                                    doctype:'Marketing Material Request',
                                    doc:this.materialRequest.data.name,
                                    fieldname:'recce_notes',
                                    value:this.recceNotes
                                }
                            })
                            this.materialRequestFieldUpdater.fetch();                
                            //this.materialRequest.setValue.submit({recce_image_1:url,recce_done_by:sessionUser(),recce_notes:this.recceNotes})
                        }
                        if(index ==1){
                            // this.materialRequest.setValue.submit({recce_image_2:url})
                            url = await this.uploadImageToServer(store.imageBlob,"recce_image_2");
                            //Updating Fourth Field
                            this.materialRequestFieldUpdater = createResource({
                                url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.update_dynamic_field',
                                params:{
                                    doctype:'Marketing Material Request',
                                    doc:this.materialRequest.data.name,
                                    fieldname:'recce_image_2',
                                    value:url
                                }
                            })
                            this.materialRequestFieldUpdater.fetch();
                            //this.materialRequest.setValue.submit({recce_image_2:url,recce_done_by:sessionUser()})
                        }
                    }
                    for(const [index,authorisation] of this.imageData.quotation.entries()){
                        let url ='';
                        // console.log(authorisation.imageBlob);
                        if(index==0){
                            url = await this.uploadImageToServer(authorisation.imageBlob,"customer_authorisation_image_1");
                            //Updating Sixth Field
                            this.materialRequestFieldUpdater = createResource({
                                url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.update_dynamic_field',
                                params:{
                                    doctype:'Marketing Material Request',
                                    doc:this.materialRequest.data.name,
                                    fieldname:'customer_authorisation_image_1',
                                    value:url
                                }
                            })
                            this.materialRequestFieldUpdater.fetch();
                            //this.materialRequest.setValue.submit({customer_authorisation_image_1:url})
                        }
                        if(index==1){
                            url = await this.uploadImageToServer(authorisation.imageBlob,"customer_authorisation_image_2");
                            //Updating Seventh Field
                            this.materialRequestFieldUpdater = createResource({
                                url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.update_dynamic_field',
                                params:{
                                    doctype:'Marketing Material Request',
                                    doc:this.materialRequest.data.name,
                                    fieldname:'customer_authorisation_image_2',
                                    value:this.url
                                }
                            })
                            this.materialRequestFieldUpdater.fetch();
                            //this.materialRequest.setValue.submit({customer_authorisation_image_2:url})
                        }
                    }
                    // this.materialRequest.setValue.submit({process_stage:'Evaluating POI Exact Requirements'});
                    this.materialRequestStatusUpdater = createResource({
                        url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.change_process_status',
                        params:{
                            doc:this.materialRequest.data.name,
                            process_stage:'Evaluating POI Exact Requirements',
                            user: sessionUser()
                        }
                    })
                    this.materialRequestStatusUpdater.fetch();
                }
                catch(error){
                    throw error;
                }
                this.$router.go(-1);
            }
            else{
                alert('Please upload Images of Stores and Customer Authorization Letter with the specifications in Recce Notes');
                return;
            }
        },
        async uploadImageToServer(imageBlob,df){
            const base64String= await this.blobToBase64(imageBlob);
            //Instantiate File Uploader URL
            const fileUploader = createResource({
                    url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.upload_images_to_folder',
                    method:'POST',
                    params:{
                        image:base64String,
                        df:df,
                        doctype:'Marketing Material Request',
                        docname:this.materialRequest.data.name,
                        folder:"Home/recce-images"
                    }
            })
            const url = await fileUploader.fetch();
            return url;
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
            // console.log(this.userVendorDetails.data)
            if(this.userVendorDetails.data.roles.length > 0){
                if(this.userVendorDetails.data.vendor){
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