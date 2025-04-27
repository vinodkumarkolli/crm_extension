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
        <Card title="Item Specifications">
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Quantity:
                    </label>
                    <TextInput
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
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        UOM:
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
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Rate per UOM:
                    </label>
                    <TextInput
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="materialRequest.data.quote_rate_per_uom"
                    />
                </div>
            </div>
        </Card>
        <Card>
            <div class="flex flex-col">
                <div class="grid grid-cols-2 gap-4 py-4">
                    <!-- <p><b>Store Images: </b></p> -->
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Delivery Images:
                    </label>
                    <button v-if="imageData.delivery.length == 0" type="button" @click="openModal('delivery')" class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload Image</button>
                    <button v-if="imageData.delivery.length>0" @click="clearImages('delivery')" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Clear Images</button>
                </div>
                <div v-if="imageData.delivery?.length>0" class="flex flex-row justify-center items-center py-4">
                    <ul v-if="imageData.delivery" class="grid grid-cols-2 gap-4 items-center">
                        <li v-for="(delivery,index) in imageData.delivery" :key="index">
                            <img :src="createObjectURL(delivery.imageBlob)" width="100px" height="auto" alt="Captured Image" />
                        </li>
                    </ul>
                </div>
                <div class="grid grid-cols-2 gap-4 py-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Customer Signed Letter:
                    </label>
                    <!-- <p><b>Customer Authorisation: </b></p> -->
                    <button v-if="imageData.authorisation.length == 0" type="button" @click="openModal('authorisation')" class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload Image</button>
                    <button v-if="imageData.authorisation.length>0" @click="clearImages('authorisation')" type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Clear Images</button>
                </div>
                <div v-if="imageData.authorisation?.length>0" class="flex flex-col justify-center items-center py-4">
                    <ul v-if="imageData.authorisation" class="grid grid-cols-2 gap-4 items-center">
                        <li v-for="(authorisation,index) in imageData.authorisation" :key="index">
                            <img :src="createObjectURL(authorisation.imageBlob)" width="100px" height="auto" alt="Captured Image" />
                        </li>
                    </ul>
                </div>
                <div class="grid grid-cols-2 gap-4 py-4">
                    <!-- <p><b>Recce Notes: </b></p> -->
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Delivered Qty:
                    </label>
                    <TextInput
                        :type="'number'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Qty of UOM delivered"
                        v-model="deliveredQty"
                    />
                    <!-- <textarea rows="4" cols="50" placeholder="Enter your notes here..." v-model="recceNotes"></textarea> -->
                </div>
                <div class="grid grid-cols-2 gap-4 py-4">
                    <!-- <p><b>Recce Notes: </b></p> -->
                    <label class="block text-gray-700 text-sm font-bold mb-2">
                        Delivery Notes:
                    </label>
                    <Textarea
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Enter your notes here..."
                        v-model="deliveryNotes"
                    />
                    <!-- <textarea rows="4" cols="50" placeholder="Enter your notes here..." v-model="recceNotes"></textarea> -->
                </div>
                <div class="flex flex-row justify-center py-4">
                    <button @click="saveDeliveryDetails" class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload Delivery</button>
                    <button @click="$router.go(-1)" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
                </div>
            </div>
        </Card>
        <CameraModal :modalActive="modalActive" :source="cameraModalSource" @close-camera-modal="closeModal" @save-photos="savePhotos">
        </CameraModal>
    </div>
</template>
<script>
import { ref } from 'vue';
import {createResource,createDocumentResource,Card,TextInput,Textarea} from 'frappe-ui'
import {sessionUser} from '@/data/session';
import CameraModal from '../components/CameraModal.vue';
export default {
    name:"Delivery",
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
            modalActive:ref(false),
            cameraModalSource:ref('none'),
            imageData:ref({delivery:[],authorisation:[]}),
            deliveryNotes:'',
            deliveredQty:'',
        }
    },
    methods:{
        containsAny(arr1, arr2) {
            return arr1.some(item1 => arr2.some(item2 => item1.includes(item2)));
        },
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
            if(source==='delivery'){
                this.imageData.delivery=[];
            }
            else if(source==='authorisation'){
                this.imageData.authorisation=[];
            }
            else{
                throw Error("Invalid Source")
            }
        },
        createObjectURL(blob) {
            return URL.createObjectURL(blob);
        },
        savePhotos(dump){
            const photos=dump.urls;
            photos.forEach(photo=>{
                this.urlToBlob(photo).then((blob)=>{
                    if(dump.source === 'delivery'){
                        this.imageData.delivery.push({imageBlob:blob})
                    }
                    else if(source==='authorisation'){
                        this.imageData.authorisation.push({imageBlob:blob});
                    }
                    else{
                        throw Error("Invalid Source")
                    }
                });
            })
            this.closeModal();
        },
        async urlToBlob(url){
            const response = await fetch(url);
            const blob = await response.blob();
            return blob;
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
                        folder:"Home/delivery-images"
                    }
            })
            const url = await fileUploader.fetch();
            return url;
        },
        async saveDeliveryDetails(){
            if(this.imageData.delivery.length > 0 && this.imageData.authorisation.length > 0 && this.deliveryNotes !== ''){
                try{
                    for (const [index,delivery] of this.imageData.delivery.entries()) {
                        let url = '';
                        if(index == 0){
                            // this.materialRequest.setValue.submit({recce_image_1:url})
                            url = await this.uploadImageToServer(delivery.imageBlob,"installation_image_1");
                            // console.log(url);
                            this.materialRequest.setValue.submit({installation_image_1:url})
                            this.materialRequest.setValue.submit({installed_by:sessionUser()})
                            this.materialRequest.setValue.submit({installation_notes:this.deliveryNotes})
                            this.materialRequest.setValue.submit({installation_quantity: this.deliveredQty})
                            // this.materialRequest.setValue.submit({manufacture_verified_on:new Date()})
                        }
                        if(index ==1){
                            // this.materialRequest.setValue.submit({recce_image_2:url})
                            url = await this.uploadImageToServer(delivery.imageBlob,"installation_image_2");
                            this.materialRequest.setValue.submit({installation_image_2:url})
                        }
                    }
                    for(const [index,authorisation] of this.imageData.authorisation.entries()){
                        let url ='';
                        // console.log(authorisation.imageBlob);
                        if(index==0){
                            url = await this.uploadImageToServer(authorisation.imageBlob,"custom_signed_image_1");
                            this.materialRequest.setValue.submit({custom_signed_image_1:url})
                        }
                        if(index==1){
                            url = await this.uploadImageToServer(authorisation.imageBlob,"custom_signed_image_2");
                            this.materialRequest.setValue.submit({custom_signed_image_2:url})
                        }
                    }
                    this.materialRequest.setValue.submit({process_stage:'Delivered the Goods by Vendor'});
                    const materialRequestDocCommentHandler = createResource({
                        url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.custom_comment',
                        params:{
                            doc:this.materialRequest.data.name,
                            process_stage:'Delivered the Goods by Vendor',
                            user: sessionUser()
                        }
                    })
                    materialRequestDocCommentHandler.fetch();
                }
                catch(error){
                    throw error;
                }
                this.$router.go(-1);
            }
            else{
                alert('Please fill all the details before submitting');
                return;
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
                }
            }
        })
    }
}
</script>
<script setup>
import {TextInput,Textarea} from 'frappe-ui'
</script>