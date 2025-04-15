<template>
<div> 
    <!-- Page Content-->
    <Card v-if="!dataValidated || !materialRequest.data">
        <h1>You are not authorized to view this page.</h1>
    </Card>
    <div v-if="dataValidated && materialRequest.data">
        <Card :title="materialRequest.data.name" :subtitle="materialRequest.data.poi_name">
            <div class="grid grid-cols-3 gap-4">
                <div>
                    <p><b>Batch: </b> {{batchId}}</p>
                    <p><b>Vendor: </b> {{materialRequest.data.vendor_name}}</p>
                    <p><b>Material: </b> {{ materialRequest.data.request_material }}</p>
                    <p><b>Stage: </b> {{ materialRequest.data.process_stage }}</p>
                    
                </div>
                <div>
                    <p><b>Request Notes: </b> {{ materialRequest.data.request_notes }}</p>
                    <p><b>Approval Comment: </b> {{ materialRequest.data.approval_comment }} </p>
                </div>
                <div class="flex justify-center items-center items-center">
                    <a :href="'https://www.google.com/maps/place/'+materialRequest.data.latitude+'%2C'+materialRequest.data.longitude"  target="_blank" rel="noopener noreferrer" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Map</a>
                </div>
            </div>
        </Card>    
        <Card title="Upload Store Requirement" subtitle="Fill up the form" class="max-width">
            <div class="grid grid-cols-2 gap-4">
                <main>
                    <div class="grid grid-cols-2 gap-4">
                        <p><b>Store Images: </b></p>
                        <button type="button" id="storeImageBtn" @click="toggleModal" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Upload Image</button>
                        
                    </div>
                    <div class="flex flex-row justify-center">
                        <button @click="saveRecceChanges">Submit Recce Form</button>
                        <button @click="$router.go(-1)">Cancel</button>
                    </div>    
                </main>
                <div class="flex flex-col justify-center items-center">
                    <ul v-if="imageData.stores">
                        <li v-for="(store,index) in imageData.stores" :key="index">{{ store.imageBlob }}</li>
                    </ul>
                </div>
            </div>
        </Card>
        <CameraModal :modalActive="modalActive" @close-camera-modal="toggleModal" @save-photos="savePhotos">
        </CameraModal>
        
    </div>
</div>
</template>
<script>
import { ref } from 'vue';
import {createResource,createDocumentResource, Card} from 'frappe-ui';
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
            imageData:ref({stores:[],quotation:[],uploadedImageURLS:[]}),
            modalActive:ref(false),
            fileUploader:ref([])
        }
    },
    methods:{
        toggleModal(event){
            this.modalActive=!this.modalActive;
        },
        savePhotos(photos){
            // console.log("Saving Photos",photos);
            photos.forEach(photo=>{
                this.imageData.stores.push({imageBlob:photo})
                //console.log(photo);
        })
        //console.log(this.imageData);
            this.toggleModal();
        },
        async urlToBlob(url){
            const response = await fetch(url);
            return await response.blob();
        },
        saveRecceChanges(){
            console.log(this.materialRequest.data)
            if(this.imageData.stores.length > 0){
                this.imageData.stores.forEach(store=>{
                    this.uploadImageToServer(store.imageBlob);
                })
            }
            else{
                alert('Please upload at least one image');
                return;
            }
        },
        uploadImageToServer(imageBlob){
            //Convert Blob to Base64 string and send it to server
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob); // Read the blob as a base64 encoded string
            reader.onloadend = () => {
              const base64String = reader.result; // This is your base64-encoded string
              console.log(base64String);
              //Instantiate File Uploader URL
              this.fileUploader = createResource({
                        url:'/api/method/crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.upload_images_to_folder',
                        method:'POST',
                        params:{
                            images:[base64String],
                            doctype:'Marketing Material Request',
                            docname:this.materialRequest.data.name,

                        }
                })
                this.fileUploader.fetch().then(res=>{console.log(res)})
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