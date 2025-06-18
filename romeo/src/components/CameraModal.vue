<template>
<BaseModal :modalActive="modalActive" @close-base-modal="closeModal">
    <div>
        <!--Tutorial https://www.npmjs.com/package/simple-vue-camera-->
        <camera  ref="camera" autoplay :resolution="{ width: 426.66, height: 240 }"></camera>
        <!-- Add other components or elements as needed -->
    </div>
    <div v-if="imageData.length < 2" class="flex justify-end w-full py-2">
        <button class="w-1rem text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="snapshot">Take Snapshot</button>
    </div>
    <div v-if="imageData.length > 0" class="fle flex-col gap-y-2">
        <ul class="flex flex-row justify-start overflow-x-auto space-x-1 py-2">
                <li v-for="(blob, index) in imageData" :key="index">
                    <!-- <img :src="createObjectURL(blob)" alt="Captured Image" /> -->
                    <img :src="blob" alt="Captured Image" />
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
        },
        source:{
            type:String,
            required:true
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
        clearImages(){
            this.imageData=[];
        },
        savePhotos(){
            this.$emit('save-photos',{urls:this.imageData,source:this.source})
            this.clearImages();
        },
    },
    emits:['close-camera-modal','save-photos'],
    setup(props, { emit }) {
        // Get a reference of the component
        const camera = ref<InstanceType<typeof Camera>>();
        const imageData=ref<string[]>([])
        // Define closeModal function within setup
        const closeModal = () => {
            imageData.value = [];
            emit('close-camera-modal');
        };
        // Check source and close modal if needed
        if(props.source === 'none'){
            // console.log('No Source');
            closeModal();
        }
    
        // const modalActive=ref(true)
        // Use camera reference to call functions
        const compressImageBlob = async(imageUrl: string , targetSizeKB = 10, latitude?: number, longitude?: number): Promise<Blob> => {
            return new Promise<Blob>((resolve, reject) => {
                // const imageUrl = URL.createObjectURL(imageBlob);
                const img = new Image();
                
                img.onload = async () => {
                    let width = img.width;
                    let height = img.height;

                    // Calculate new dimensions while maintaining aspect ratio
                    // if (width > maxWidth) {
                    //     height *= maxWidth / width;
                    //     width = maxWidth;
                    // }
                    // if (height > maxHeight) {
                    //     width *= maxHeight / height;
                    //     height = maxHeight;
                    // }
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    //Add timestamp to the image
                    const now = new Date().toLocaleString();
                    if(ctx){
                        const padding = 10; // Padding from edges
                        const lineHeight = 12; // Approximate line height for spacing (font is 16px)
                        ctx.font = '10px Arial';
                        ctx.fillStyle = 'white';
                        ctx.textAlign = 'right';
                        ctx.textBaseline = 'bottom';
                        if (latitude !== undefined && longitude !== undefined) {
                            const latStr = latitude.toFixed(4);
                            const lonStr = longitude.toFixed(4);

                            // Draw location at bottom-right
                            ctx.fillText(`Lat: ${latStr}, Lon: ${lonStr}`, canvas.width - padding, canvas.height - padding);
                            // Draw timestamp above location
                            ctx.fillText(now, canvas.width - padding, canvas.height - padding - lineHeight);
                        } 
                        else {
                            
                            ctx.fillText("Location: N/A", canvas.width - padding, canvas.height - padding);
                            ctx.fillText(now, canvas.width - padding, canvas.height - padding - lineHeight);
                        }
                    }
                    
                    let quality = 0.7;
                    let compressedBlob: Blob | null = null;
                    
                    // Function to compress and check size
                    const compressAndCheckSize = (): Promise<number> => {
                        return new Promise((resolve) => {
                            canvas.toBlob(
                                (blob) => {
                                    if (blob) {
                                        compressedBlob = blob;
                                        resolve(blob.size / 1024); // Convert size to KB
                                    } else {
                                        // Handle the case where blob is null
                                        reject(new Error("Failed to convert image to blob"));
                                    }
                                },
                                'image/jpeg',
                                quality
                            );
                        });
                    };
                    let sizeKB: number = await compressAndCheckSize();
                    // Adjust quality to meet the target size
                    while (sizeKB > targetSizeKB && quality > 0.1) {
                        quality -= 0.05; // Decrease quality
                        sizeKB = await compressAndCheckSize();
                    }

                    URL.revokeObjectURL(imageUrl); // Clean up the URL
                    if (compressedBlob) {
                        resolve(compressedBlob);
                    } else {
                        reject(new Error("Failed to compress image"));
                    }
                };
                img.onerror = (error) => {
                    URL.revokeObjectURL(imageUrl);
                    reject(error);
                };
                img.src = imageUrl;
            });
        }
        const snapshot = async () => {
            try {
                const blob = await camera.value?.snapshot();
                if (blob) {
                    // To show the screenshot with an image tag, create a url
                    const url = URL.createObjectURL(blob);
                    // Get geolocation
                    let coords: { latitude: number; longitude: number } | null = null;
                    try {
                        coords = await new Promise((resolve, reject) => {
                            if (!navigator.geolocation) {
                                console.warn("Geolocation is not supported by this browser.");
                                resolve(null); // Resolve with null if not supported
                                return;
                            }
                            navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    resolve({
                                        latitude: position.coords.latitude,
                                        longitude: position.coords.longitude,
                                    });
                                },
                                (error) => {
                                    console.warn("Error getting geolocation:", error.message);
                                    resolve(null); // Resolve with null on error (e.g., permission denied)
                                }
                            );
                        });
                    } catch (geoError) {
                        console.warn("Geolocation promise was not fulfilled:", geoError);
                        // coords remains null, image processing will continue without location
                    }
                    // Compress the image before adding it to the array
                    const compressedBlob = await compressImageBlob(url,10,coords?.latitude, coords?.longitude);
                    // Now compressedBlob is properly typed as Blob
                    const compressedImageUrl = URL.createObjectURL(compressedBlob);
                    // Create a URL for the compressed blob and add it to the array
                    imageData.value.push(compressedImageUrl);
                }
            } catch (error) {
                console.error("Error taking or processing snapshot:", error);
                // You could add user-facing error handling here if needed
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
            createObjectURL,
            closeModal
        }
    }
});
</script>