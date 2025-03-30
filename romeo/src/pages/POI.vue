<template>
    <div class="poi-container">
        
        <!-- Generate a Card HTML -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold mb-2">{{ id }}</h3>
            <h3 class="text-xl font-semibold mb-2">{{ location_name }}</h3>
            <div class="grid grid-cols-3 gap-2">
                <div>
                    <p class="text-gray-600">CRM Lead ID:</p>
                    <p>{{ crm_lead_id }}</p>
                </div>
                <div>
                    <p class="text-gray-600">FieldAssist ID:</p>
                    <p>{{ fieldassist_id }}</p>
                </div>
                <div>
                    <p class="text-gray-600">FieldMate ID:</p>
                    <p>{{ fieldmate_id }}</p>
                </div>
                <div>
                    <p class="text-gray-600">WorkMate ID:</p>
                    <p>{{ workmate_id }}</p>
                </div>
                <!-- <div>
                    <p class="text-gray-600">Location:</p>
                    <p>{{ latitude }}, {{ longitude }}</p>
                </div> -->
                <div>
                    <p class="text-gray-600">POI Status:</p>
                    <p>{{ poi_status }}</p>
                </div>
                <!--Generate Rubber Stamp effect-->
                <span class="stamp is-approved col-span-2" v-if="source == 'Field Assist'">{{ source }}</span>
                <span class="stamp is-nope col-span-2" v-else>{{ source }}</span>
            </div>
        </div>
        <!--Generate Tab Control for Merge, Link Distributor, Raise a Board Request Forms-->
        <div class="flex justify-center space-x-4">
            <button  @click="toggleMergeForm" v-if="(poi_status=='Active')&&(pois.length>0)&&(mergeRequests.items.length===0)" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Merge Request
            </button>
            <button @click="toggleDistributorForm" v-if="source == 'Field Assist'" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Link Distributor
            </button>
            <button @click="toggleBoardForm" v-if="source == 'Field Assist'" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Raise a Board Request
            </button>
            <button @click="toggleGlobeActivity" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Globe
            </button>
        </div>
        <!--Generate Merge Form-->
        <div v-if="showMergeForm" class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold flex justify-center mb-2">Merge Request</h3>
                <label for="toPOISelecteor" class="text-gray-600">Select a POI:</label>
                <Autocomplete :options="pois" v-model="merge_to_location" id="toPOISelecteor"/>
                <div v-if="merge_to_location" class="grid grid-cols-2 gap-2">
                    <div>
                        <label for="toLocName" class="text-gray-600">Location ID:</label>
                        <h3 id="toLocName" class="text-xl font-semibold mb-2">{{ merge_to_location.value }}</h3>
                    </div>
                    <div>
                        <label for="toLocStoreName" class="text-gray-600">Store Name:</label>
                        <h3 id="toLocStoreName" class="text-xl font-semibold mb-2"> {{ merge_to_location.label }}</h3>
                    </div>
                    <div>
                        <p class="text-gray-600">FieldAssist ID:</p>
                        <p id="toLocFieldAssistID" > {{ merge_to_location.fieldassistId }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">Distance:</p>
                        <p id="toLocDistance" > {{ merge_to_location.radialDistance }} mts away</p>
                    </div>
                    <div class="text-gray-600">
                        <label class="required">Notes:</label>
                        <input v-model="mergeNotes" required/>
                    </div>
                    <!-- <div>
                        <p class="text-gray-600">Location:</p>
                        <p id="toLocLocation" > {{ merge_to_location.latitude }}, {{ merge_to_location.longitude }}</p>
                    </div> -->
                    <div v-if="merge_to_location" class="col-span-2 flex justify-center ">
                        <button type="submit" @click="submitMergeRequest" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                           Submit Request
                        </button>
                        <button type="button" @click="closeAllForms" class="text-white
                        bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Cancel
                        </button>
                    </div>
                </div>
        </div>
        <!--Generate Link Distributor Form-->
        <div v-if="showDistributorForm" class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold mb-2">Link Distributor</h3>
            <form>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label for="distributor_name" class="text-gray-600">Distributor Name:</label>
                        <label id="distributor_name" name="distributor_name" class="border border-gray-300 rounded-md p-2 w-full" required>{{ to_location_name }}</label>
                    </div>
                    <div>
                        <label for="distributor_email" class="text-gray-600">Distributor Email:</label>
                        <input type="email" id="distributor_email" name="distributor_email" class="border border-gray-300 rounded-md p-2 w-full" required>
                    </div>
                    <div>
                        <label for="distributor_phone" class="text-gray-600">Distributor Phone:</label>
                        <input type="tel" id="distributor_phone" name="distributor_phone" class="border border-gray-300 rounded-md p-2 w-full" required>
                    </div>
                    <div>
                        <label for="distributor_address" class="text-gray-600">Distributor Address:</label>
                        <input type="text" id="distributor_address" name="distributor_address" class="border border-gray-300 rounded-md p-2 w-full" required>
                    </div>
                    <div class="col-span-2 flex justify-center ">
                        <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Submit
                        </button>
                        <button type="button" @click="closeAllForms" class="text-white
                        bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <!--Generate Raise a Board Request Form-->
        <div v-if="showBoardForm" class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold mb-2">Raise a Board Request</h3>
            <form>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <label for="board_name" class="text-gray-600">Board Name:</label>
                        <input type="text" id="board_name" name="board_name" class="border border-gray-300 rounded-md p-2 w-full" required>
                    </div>
                    <div>
                        <label for="board_description" class="text-gray-600">Board Description:</label>
                        <textarea id="board_description" name="board_description" class="border border-gray-300 rounded-md p-2 w-full" required></textarea>
                    </div>
                    <div class="col-span-2 flex justify-center ">
                        <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Submit
                        </button>
                        <button type="button" @click="closeAllForms" class="text-white
                        bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <!--Generate Code for Showing Activities in List Form-->
        <div v-if="showGlobeActivity" class="bg-white shadow-md rounded-lg p-4 mb-4">
            
            <h3 class="flex justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><mark class="px-2 text-white bg-blue-600 rounded-sm dark:bg-blue-500">Globe</mark> Activity</h3>
            <ol>
                <li v-for="request in rejectedMergeRequests.items" :key="request.name" class="bg-white shadow-md rounded-lg p-4 mb-4">
                    <p>Request ID: <strong>{{ request.name }}</strong> is in <strong> {{ request.request_status }} </strong> 
                        stage that tried merging present location with <strong>{{ request.to_poi_location_name }}</strong> which is at <strong>{{ request.radial_difference_in_mtrs }}</strong> mts away</p>
                </li>
                <li v-for="request in mergeRequests.items" :key="request.name" class="bg-white shadow-md rounded-lg p-4 mb-4">
                    <p>Request ID: <strong>{{ request.name }}</strong> is in <strong> {{ request.request_status }} </strong> 
                        stage that merges present location with <strong>{{ request.to_poi_location_name }}</strong> which is at <strong>{{ request.radial_difference_in_mtrs }}</strong> mts away.</p> <div v-if="request.admin_comments">
                            <p><strong>Admin Comments:</strong> {{ request.admin_comments }}</p>
                        </div>
                </li>
            </ol>
        </div>
    </div>
</template>
<script>
//User window.location.search to get the query parameters
import {createResource,createListResource } from 'frappe-ui';
const route = window.location.search
import { calculateDistance } from '../data/geo';
import {sessionUser} from '@/data/session';
if(sessionUser==null){window.location.href="/login"}
else{console.log(sessionUser)}
//Extract the query parameters from the route
const urlParams = new URLSearchParams(route)
//Get the value of the query parameters
import { ref } from 'vue'

const pois = ref([])

createListResource({
    doctype: "CRM POI",
    fields:["name","location_name","latitude","longitude","fieldassist_id"],
    //filters:[["poi_status","=","Active"]],
    filters:[["poi_status","=","Active"],["fieldassist_id","!=",""]],
    pageLength: "None",
}).reload().then(response => {
    for(let i of response){
        const radialDistance = calculateDistance({latitude:Number(urlParams.get('latitude')),longitude:Number(urlParams.get('longitude'))},{latitude:i.latitude,longitude:i.longitude})
        // console.log(radialDistance,' mts away from present location')
        if(radialDistance < 500 && radialDistance > 0){
            pois.value.push({
                label:i.location_name,
                value:i.name,
                description:radialDistance+' mts away',
                radialDistance:Number(radialDistance),
                latitude:i.latitude,
                longitude:i.longitude,
                fieldassistId:i.fieldassist_id
            })
        }
    }
})

export default {
    name: "POI",
    props:{
        id:{
            type: String,
            required: true
        }
    },
    
    data(){
        return {
            location_name: urlParams.get('location_name'),
            crm_lead_id: urlParams.get('crm_lead_id'),
            fieldassist_id: urlParams.get('fieldassist_id'),
            fieldmate_id: urlParams.get('fieldmate_id'),
            workmate_id: urlParams.get('workmate_id'),
            latitude: urlParams.get('latitude'),
            longitude: urlParams.get('longitude'),
            poi_status: urlParams.get('poi_status'),
            showMergeForm : false,
            showBoardForm : false,
            showDistributorForm : false,
            showGlobeActivity:true,
            source: urlParams.get('source'),
            pois: pois,
            mergeRequests:ref([]),
            rejectedMergeRequests:ref([]),   
            mergeNotes:"",
            merge_to_location:null
        }
    },
    mounted(){
        this.mergeRequests = createListResource({
            doctype:'POI Merge Request',
            fields:["*"],
            filters:[['from_poi','=',this.id],['docstatus','=',1]]
        })
        this.mergeRequests.reload().then(response => {
            this.mergeRequests.items = response; // Assuming response contains the items
            }).catch(error => {
            console.error("Failed to load merge requests:", error);
        });
        this.rejectedMergeRequests = createListResource({
            doctype:'POI Merge Request',
            fields:["*"],
            filters:[['from_poi','=',this.id],['docstatus','=',2]]  
        })
        this.rejectedMergeRequests.reload().then(response => {
            this.rejectedMergeRequests.items = response; // Assuming response contains the items
            }).catch(error => {
            console.error("Failed to load rejected merge requests:", error);
        });
    },
    methods: {
        toggleMergeForm() {
            this.showMergeForm = !this.showMergeForm;
            this.showDistributorForm = false;
            this.showBoardForm = false;
            this.showGlobeActivity=false;
        },
        toggleDistributorForm() {
            this.showDistributorForm = !this.showDistributorForm;
            this.showMergeForm = false;
            this.showBoardForm = false;
            this.showGlobeActivity=false;
        },
        toggleBoardForm() {
            this.showBoardForm = !this.showBoardForm;
            this.showMergeForm = false;
            this.showDistributorForm = false;
            this.showGlobeActivity=false;
        },
        toggleGlobeActivity(){
            this.showGlobeActivity=!this.showGlobeActivity;
            this.showBoardForm = false;
            this.showMergeForm = false;
            this.showDistributorForm = false;
            // console.log()
        },
        closeAllForms() {
            this.showMergeForm = false;
            this.merge_to_location = null;
            this.showDistributorForm = false;
            this.showBoardForm = false;
        },
        locationSelected(event){
            createResource({
                doctype: "CRM POI",
                fields:["*"],
                name: event.target.value,
            }).read().then(response => {
                console.log(response)
            })
        },
        submitMergeRequest(){
            if(this.merge_to_location.value!=this.id){
                 this.mergeRequests.insert.submit({
                 from_poi:this.id,
                 to_poi:this.merge_to_location.value,
                 radial_difference_in_mtrs: this.merge_to_location.radialDistance,
                 merge_notes:this.mergeNotes,
                 requested_by:sessionUser(),
                 docstatus:1
                 }).then((response) =>{
                     alert(`Successfully submitted merge request ${response.name}`)
                     this.closeAllForms();
                 }
                 ).catch((error)=>{
                     alert(`Error occured while submitting merge request`)
                 })
            }
        }
    }
}
</script>
<script setup>
import {Autocomplete} from 'frappe-ui'

</script>
<style scoped>
.stamp {
    transform: rotate(12deg);
	color: #555;
	font-size: 3rem;
	font-weight: 700;
	border: 0.25rem solid #555;
	display: inline-block;
	padding: 0.25rem 1rem;
	text-transform: uppercase;
	border-radius: 1rem;
	font-family: 'Courier';
    -webkit-mask-image: url('@/assets/grunge.png');
    mask-image: url('@/assets/grunge.png');
    -webkit-mask-size: 500px 350px;
    mask-size: 500px 350px;
    mix-blend-mode: multiply;
}
.is-approved {
	color: #0A9928;
	border: 0.5rem solid #0A9928;
	-webkit-mask-position: 13rem 6rem;
    mask-position: 13rem 6rem;
	transform: rotate(-14deg);
  border-radius: 0;
}
.is-nope {
  color: #D23;
  border: 0.5rem double #D23;
  transform: rotate(3deg);
	-webkit-mask-position: 2rem 3rem;
    mask-position: 2rem 3rem;
  font-size: 2rem;  
}
.required:after {
    content:" *";
    color: red;
  }
</style>