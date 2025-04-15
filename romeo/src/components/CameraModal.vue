<template>
<BaseModal :modalActive="modalActive" @close-base-modal="toggleModal">
    <div>
        <!--Tutorial https://www.npmjs.com/package/simple-vue-camera-->
        <camera  ref="camera" autoplay></camera>
        <!-- Add other components or elements as needed -->
    </div>
    <div v-if="imageData.length < 2" class="flex justify-end w-full py-2">
        <button class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="snapshot">Take Snapshot</button>
    </div>
    <div v-if="imageData.length > 0" class="fle flex-col gap-y-2">
        <ul class="flex flex-row justify-start overflow-x-auto space-x-1 py-2">
                <li v-for="(blob, index) in imageData" :key="index">
                    <img :src="createObjectURL(blob)" alt="Captured Image" />
                </li>
        </ul>
        <div class="flex flex-row justify-center mt-2 gap-x-3">
            <button type="submit" @click="savePhotos" class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save Photos</button>
            <button type="button" @click="clearImages" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Clear Photos</button>
        </div>
    </div>
</BaseModal>
</template>
<script lang="ts">
import Camera from "simple-vue-camera";
import {defineComponent, ref} from 'vue';
import BaseModal from "./BaseModal.vue";
export default defineComponent({
    name:'CameraModal',
    props:{
        modalActive:{
            type:Boolean,
            default:false
        }
    },
    components:{
        Camera,
        BaseModal
    },
    watch:{
        modalActive(val){
            if(!val){
                this.$refs.camera.stop();
            }
        }
    },
    methods:{
        toggleModal(event){
            this.imageData=[]
            this.$emit('close-camera-modal',event)
        },
        clearImages(){
            this.imageData=[];
        },
        savePhotos(){
            this.$emit('save-photos',this.imageData)
        }
    },
    emits:['close-camera-modal','save-photos'],
    setup() {
        // Get a reference of the component
        const camera = ref<InstanceType<typeof Camera>>();
        const imageData=ref<Blob[]>([])
        // const modalActive=ref(true)
        // Use camera reference to call functions
        const snapshot = async () => {
            const blob = await camera.value?.snapshot();
            if(blob){
                // To show the screenshot with an image tag, create a url
                //const url = URL.createObjectURL(blob);
                imageData.value.push(blob)
            }
            
        }
        // Helper function to create object URLs
        const createObjectURL = (blob: Blob): string => {
            return URL.createObjectURL(blob);
        }

        return {
            camera,
            snapshot,
            imageData,
            createObjectURL
        }
    }
});
</script>