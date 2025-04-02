<template>
    <div class="poi-container">
        <!-- Generate a Card HTML -->
        <div v-if="poi_details.doc" class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold mb-2">{{ id }}</h3>
            <h3 class="text-xl font-semibold mb-2">{{ poi_details.doc.location_name }}</h3>
            <div class="grid grid-cols-3 gap-2">
                <div>
                    <!-- <p class="text-gray-600">CRM Lead ID:</p> -->
                    <label for="det_crm_lead_id" class="block text-gray-700 text-sm font-bold mb-2">
                    CRM Lead ID:
                    </label>
                    <TextInput id="det_crm_lead_id"
                        :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Placeholder"
                        :disabled="true"
                        v-model="poi_details.doc.crm_lead_id"
                    />
                    <!-- <p>{{ poi_details.doc.crm_lead_id }}</p> -->
                </div>
                <div>
                    <!-- <p class="text-gray-600">FieldAssist ID:</p> -->
                    <label for="det_fieldassist_id" class="block text-gray-700 text-sm font-bold mb-2">
                    FieldAssist ID:
                    </label>
                    <TextInput id="det_fieldassist_id"
                        :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="Placeholder"
                        :disabled="true"
                        v-model="poi_details.doc.fieldassist_id"
                    />
                    <!-- <p>{{ poi_details.doc.fieldassist_id }}</p> -->
                </div>
                <div>
                    <label for="det_fieldmate_id" class="block text-gray-700 text-sm font-bold mb-2">
                    Fieldmate ID:
                    </label>
                    <TextInput id="det_fieldmate_id"
                        :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="poi_details.doc.fieldmate_id"
                    />
                    <!-- <p class="text-gray-600">FieldMate ID:</p>
                    <p>{{ poi_details.doc.fieldmate_id }}</p> -->
                </div>
                <div>
                    <label for="det_workmate_id" class="block text-gray-700 text-sm font-bold mb-2">
                    Workmate ID:
                    </label>
                    <TextInput id="det_workmate_id"
                        :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="poi_details.doc.workmate_id"
                    />
                    <!-- <p class="text-gray-600">WorkMate ID:</p>
                    <p>{{ poi_details.doc.workmate_id }}</p> -->
                </div>
                <!-- <div>
                    <p class="text-gray-600">Location:</p>
                    <p>{{ latitude }}, {{ longitude }}</p>
                </div> -->
                <div>
                    <label for="det_poi_status" class="block text-gray-700 text-sm font-bold mb-2">
                    POI Status:
                    </label>
                    <TextInput id="det_poi_status"
                        :type="'text'"
                        :ref_for="true"
                        size="sm"
                        variant="subtle"
                        placeholder="NA"
                        :disabled="true"
                        v-model="poi_details.doc.poi_status"
                    />
                    <!-- <p class="text-gray-600">POI Status:</p>
                    <p>{{ poi_details.doc.poi_status }}</p> -->
                </div>
                <!--Generate Rubber Stamp effect-->
                <span class="stamp is-approved col-span-2" v-if="source == 'Field Assist'">{{ source }}</span>
                <span class="stamp is-nope col-span-2" v-else>{{ source }}</span>
            </div>
        </div>
        <!--Generate Tab Control for Merge, Link Distributor, Raise a Board Request Forms-->
        <div v-if="poi_details.doc" class="flex justify-center space-x-4">
            <button @click="toggleGlobeActivity" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Globe
            </button>
            <button  @click="toggleMergeForm" v-if="(poi_details.doc.poi_status=='Active')&&(pois.items?.length>0)" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Merge Request
            </button>
            <button @click="toggleDistributorForm" v-if="(poi_details.doc.poi_status=='Active')&&(source == 'Field Assist')" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Link Distributor
            </button>
            <button @click="toggleBoardForm" v-if="(poi_details.doc.poi_status=='Active')&&(source == 'Field Assist')" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Raise a Board Request
            </button>
        </div>
        <!--Generate Merge Form-->
        <div v-if="showMergeForm" class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold flex justify-center mb-2">Merge Request</h3>
                <!-- <label for="toPOISelecteor" class="text-gray-600">Select a POI:</label> -->
                <Autocomplete :options="pois.items" v-model="merge_to_location" placeholder="Select a POI" id="toPOISelecteor"/>
                <div v-if="merge_to_location" class="grid grid-cols-2 gap-2">
                    <div>
                        <label for="merge_locationId" class="block text-gray-700 text-sm font-bold mb-2">
                            Location ID:
                        </label>
                        <TextInput id="merge_locationId"
                            :type="'text'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true"
                            v-model="merge_to_location.value"
                        />
                        <!-- <label for="toLocName" class="text-gray-600">Location ID:</label>
                        <h3 id="toLocName" class="text-xl font-semibold mb-2">{{ merge_to_location.value }}</h3> -->
                    </div>
                    <div>
                        <label for="merge_storename" class="block text-gray-700 text-sm font-bold mb-2">
                            Store Name:
                        </label>
                        <TextInput id="merge_storename"
                            :type="'text'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true"
                            v-model="merge_to_location.label"
                        />
                        <!-- <label for="toLocStoreName" class="text-gray-600">Store Name:</label>
                        <h3 id="toLocStoreName" class="text-xl font-semibold mb-2"> {{ merge_to_location.label }}</h3> -->
                    </div>
                    <div>
                        <label for="merge_fieldassistId" class="block text-gray-700 text-sm font-bold mb-2">
                        FieldAssist ID:
                        </label>
                        <TextInput id="merge_fieldassistId"
                            :type="'text'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true"
                            v-model="merge_to_location.fieldassistId"
                        />
                        <!-- <p class="text-gray-600">FieldAssist ID:</p>
                        <p id="toLocFieldAssistID" > {{ merge_to_location.fieldassistId }}</p> -->
                    </div>
                    <div>
                        <label for="merge_radialDistance" class="block text-gray-700 text-sm font-bold mb-2">
                        Distance:
                        </label>
                        <TextInput id="merge_radialDistance"
                            :type="'text'"
                            :ref_for="true"
                            size="sm"
                            variant="subtle"
                            placeholder="NA"
                            :disabled="true" v-model="merge_to_location.description"/>
                        <!-- <p class="text-gray-600">Distance:</p>
                        <p id="toLocDistance" > {{ merge_to_location.radialDistance }} mts away</p> -->
                    </div>
                    <!-- <div class="text-gray-600">
                        <label class="required">Notes:</label>
                        <input class="rounded-lg" v-model="mergeNotes" required/>
                    </div> -->
                    <div class="col-span-2">
                        <label for="merge_comment" class="block text-gray-700 text-sm font-bold mb-2">
                        Comments:
                        </label>
                        <Textarea id="merge_comment"
                            :variant="'subtle'"
                            :ref_for="true"
                            size="sm"
                            placeholder="Observations or Notes"
                            :disabled="false"
                            v-model="mergeNotes"
                            required="true"/>
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
        <!--Generate Raise a Marketing Material Request Form-->
        <div v-if="showBoardForm" class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold flex justify-center mb-2">Raise a Marketing Material Request</h3>
            <Autocomplete :options="marketingMaterialOptions.options" v-model="selectedMarketingMaterial" placeholder="Select a Marketing Material"/>
        </div>
        <!--Generate Code for Showing Activities in List Form-->
        <div v-if="showGlobeActivity" class="bg-white shadow-md rounded-lg p-4 mb-4">
            
            <!-- <h3 class="flex justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><mark class="px-2 text-white bg-blue-600 rounded-sm dark:bg-blue-500">Globe</mark> Activity</h3> -->
             <h3 class="flex justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Activity</h3>
            <ol>
                <li v-for="request in rejectedMergeRequests.items" :key="request.name" class="bg-white shadow-md rounded-lg p-4 mb-4">
                    <p>Request ID: <strong>{{ request.name }}</strong> is in <strong> {{ request.request_status }} </strong> 
                        stage that tried merging present location with <strong>{{ request.to_poi_location_name }}</strong> which is at <strong>{{ request.radial_difference_in_mtrs }}</strong> mts away.</p><br/>
                        <div v-if="request.admin_comments">
                            <p><strong>Admin Comments:</strong> {{ request.admin_comments }}</p>
                        </div>
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
import {createResource,createDocumentResource,createListResource } from 'frappe-ui';
const route = window.location.search
import { calculateDistance } from '../data/geo';
import {sessionUser} from '@/data/session';
if(sessionUser==null){window.location.href="/login"}
//Extract the query parameters from the route
const urlParams = new URLSearchParams(route)
//Get the value of the query parameters
import { ref } from 'vue'

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
            // location_name: urlParams.get('location_name'),
            // crm_lead_id: urlParams.get('crm_lead_id'),
            // fieldassist_id: urlParams.get('fieldassist_id'),
            // fieldmate_id: urlParams.get('fieldmate_id'),
            // workmate_id: urlParams.get('workmate_id'),
            // latitude: urlParams.get('latitude'),
            // longitude: urlParams.get('longitude'),
            // poi_status: urlParams.get('poi_status'),
            poi_details: ref({}),
            showMergeForm : false,
            showBoardForm : false,
            showDistributorForm : false,
            showGlobeActivity:true,
            source: urlParams.get('source'),
            pois: ref([]),
            mergeRequests:ref([]),
            rejectedMergeRequests:ref([]),   
            merge_to_location:null,
            mergeNotes:null,
            marketingMaterialOptions:ref([]),
            selectedMarketingMaterial:null
        }
    },
    mounted(){
        this.poi_details= createResource({
            url:'frappe.client.get',
            params:{
                doctype:"CRM POI",
                name: this.id,
                fields:['*']
            },
        }).fetch().then(response => {
            // console.log(response);
            this.poi_details.doc = response;
            // console.log(this.poi_details.doc);
        })
        this.marketingMaterialOptions=createResource({
            url:'crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.get_doctype_meta',
            params:{
                doctype:"Marketing Material Request"
            }
        }).fetch().then(response => {
            this.marketingMaterialOptions.options = response.fields.find(docField => docField.fieldname==="request_material").options.split("\n");
        })
        this.pois = createListResource({
            doctype: "CRM POI",
            fields:["name","location_name","latitude","longitude","fieldassist_id"],
            filters:[["poi_status","=","Active"],["fieldassist_id","!=",""]],
            pageLength: "None",
        })
        this.pois.reload().then(response => {
            const items = [];
            for(let i of response){
                const radialDistance = calculateDistance({latitude:Number(this.poi_details.doc.latitude),longitude:Number(this.poi_details.doc.longitude)},{latitude:i.latitude,longitude:i.longitude})
                //console.log(radialDistance,' mts away from present location')
                if(radialDistance < 500 && radialDistance > 0){
                    items.push({
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
            this.pois.items=items;
        })
        this.mergeRequests = createListResource({
            doctype:'POI Merge Request',
            fields:["*"],
            filters:[['from_poi','=',this.id],['docstatus','=',1]]
        })
        this.mergeRequests.reload().then(response => {
            this.mergeRequests.items = response; 
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
            // Access the input element's value
            if (!this.mergeNotes || this.mergeNotes.trim() === '') {
                alert('Please enter notes before submitting the request.');
                return;
            }
            else{
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
                        window.location.reload();
                    }
                    ).catch((error)=>{
                        alert(`Error occured while submitting merge request`,error.message)
                    })
                }
            }
        }
    }
}
</script>
<script setup>
import {Autocomplete, Textarea, TextInput} from 'frappe-ui'

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