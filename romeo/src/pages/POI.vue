<template>
    <div class="poi-container">
        <!-- Generate a Card HTML -->
        <div v-if="poi_details.doc" class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold mb-2">{{ id }}</h3>
            <h3 class="text-xl font-semibold mb-2">{{ poi_details.doc.location_name }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                        placeholder="NA"
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
                        placeholder="NA"
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
        <div v-if="poi_details.doc" class="flex flex-wrap justify-center gap-2">
            <button @click="toggleGlobeActivity" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Activity
            </button>
            <button  @click="toggleMergeForm" v-if="(poi_details.doc.poi_status=='Active')&&(pois.items?.length>0)" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Merge
            </button>
            <button @click="toggleSurveyForm" v-if="(poi_details.doc.poi_status=='Active')&&(source == 'Field Assist')" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Survey
            </button>
            <button @click="toggleBoardForm" v-if="(poi_details.doc.poi_status=='Active')&&(source == 'Field Assist')" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Marketing
            </button>
        </div>
        <!--Generate Merge Form-->
        <div v-if="showMergeForm" class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold flex justify-center mb-2">Merge Request</h3>
                <!-- <label for="toPOISelecteor" class="text-gray-600">Select a POI:</label> -->
                <Autocomplete :options="pois.items" v-model="mergeToLocation" placeholder="Select a POI" id="toPOISelecteor"/>
                <div v-if="mergeToLocation" class="grid grid-cols-1 md:grid-cols-2 gap-2 py-4">
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
                            v-model="mergeToLocation.value"
                        />
                        <!-- <label for="toLocName" class="text-gray-600">Location ID:</label>
                        <h3 id="toLocName" class="text-xl font-semibold mb-2">{{ mergeToLocation.value }}</h3> -->
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
                            v-model="mergeToLocation.label"
                        />
                        <!-- <label for="toLocStoreName" class="text-gray-600">Store Name:</label>
                        <h3 id="toLocStoreName" class="text-xl font-semibold mb-2"> {{ mergeToLocation.label }}</h3> -->
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
                            v-model="mergeToLocation.fieldassistId"
                        />
                        <!-- <p class="text-gray-600">FieldAssist ID:</p>
                        <p id="toLocFieldAssistID" > {{ mergeToLocation.fieldassistId }}</p> -->
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
                            :disabled="true" v-model="mergeToLocation.description"/>
                        <!-- <p class="text-gray-600">Distance:</p>
                        <p id="toLocDistance" > {{ mergeToLocation.radialDistance }} mts away</p> -->
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
                        <p id="toLocLocation" > {{ mergeToLocation.latitude }}, {{ mergeToLocation.longitude }}</p>
                    </div> -->
                    <div v-if="mergeToLocation" class="col-span-2 flex justify-center py-4">
                        <button type="submit" @click="submitMergeRequest" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                           Submit Request
                        </button>
                        <button type="button" @click="closeAllForms" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                            Cancel
                        </button>
                    </div>
                </div>
        </div>
        <!--Survey Form-->
        <div v-if="showSurveyForm" class="bg-white shadow-md rounded-lg p-4 mb-4">
            
            <div v-if="!currentSurvey">
                <h3 class="text-xl font-semibold mb-2">Select a Survey</h3>
                <div v-for="survey in surveys.items" :key="survey.name" class="flex items-center mb-2">
                    <input type="checkbox" :id="'survey-' + survey.name" :value="survey.name" v-model="selectedSurveys" class="mr-2">
                    <label :for="'survey-' + survey.name" class="text-gray-700">{{ survey.survey_name }}</label>
                </div>
                <button @click="startSurvey" :disabled="selectedSurveys.length === 0" class="mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed">
                    Start Survey
                </button>
            </div>
            <!-- Survey questions will be displayed here -->
            <div v-else>
                <div v-if="surveyQuestions.length > 0">
                    <h3 class="text-xl font-semibold mb-2">{{ getCurrentQuestion().question_heading }}</h3>
                    <h5 class="text-gray-800 font-semibold mb-2">{{ getCurrentQuestion().main_question }}</h5>
                    <p v-if="getCurrentQuestion().main_question_description" class="text-gray-600 mb-4"> ({{ getCurrentQuestion().main_question_description }})</p>
                    <!-- Render question based on type -->
                    <div v-if="getCurrentQuestion().main_question_type === 'Select'">
                        <div v-for="(option, index) in getQuestionOptions(getCurrentQuestion())" :key="index" class="flex items-center mb-2">
                            <input type="radio" :id="'option-' + index" :value="option" v-model="surveyAnswers[getCurrentQuestion().name]" class="mr-2">
                            <label :for="'option-' + index" class="text-gray-700">{{ option }}</label>
                        </div>
                    </div>
                    
                    <div v-else-if="getCurrentQuestion().main_question_type === 'Multi Select'">
                        <div v-for="(option, index) in getQuestionOptions(getCurrentQuestion())" :key="index" class="flex items-center mb-2">
                            <input type="checkbox" :id="'multi-option-' + index" :value="option" v-model="surveyAnswers[getCurrentQuestion().name]" class="mr-2">
                            <label :for="'multi-option-' + index" class="text-gray-700">{{ option }}</label>
                        </div>
                    </div>
                    
                    <div v-else-if="getCurrentQuestion().main_question_type === 'Data'">
                        <TextInput
                            :type="'text'"
                            size="sm"
                            variant="subtle"
                            :placeholder="getCurrentQuestion().main_question"
                            v-model="surveyAnswers[getCurrentQuestion().name]"
                        />
                    </div>
                    
                    <div v-else-if="getCurrentQuestion().main_question_type === 'Rating'">
                        <div class="flex items-center">
                            <span v-for="star in 5" :key="star" @click="setRating(getCurrentQuestion().name, star)"
                                class="cursor-pointer text-2xl"
                                :class="{'text-yellow-500': getRating(getCurrentQuestion().name) >= star, 'text-gray-300': getRating(getCurrentQuestion().name) < star}">
                                ★
                            </span>
                        </div>
                    </div>
                    
                    <!-- Navigation buttons -->
                    <div class="flex justify-between mt-6">
                        <button v-if="currentQuestionIndex > 0" @click="previousQuestion" class="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Previous
                        </button>
                        <button v-if="currentQuestionIndex < surveyQuestions.length - 1" @click="nextQuestion" :disabled="!isCurrentQuestionValid()" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                        <button v-else @click="submitSurvey" :disabled="!isCurrentQuestionValid()" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed">
                            Submit
                        </button>
                    </div>
                </div>
                <div v-else>
                    <p>No questions found in this survey.</p>
                </div>
            </div>
        </div>
        <!--Generate Raise a Marketing Material Request Form-->
        <div v-if="showBoardForm" class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold flex justify-center mb-2">Raise a Marketing Material Request</h3>
            <Autocomplete :options="marketingMaterialOptions.options" v-model="selectedMarketingMaterial" placeholder="Select a Marketing Material"/>
            <div v-if="selectedMarketingMaterial" class="py-4">
                <div>
                    <label for="material_comment" class="block text-gray-700 text-sm font-bold mb-2">
                        Comment:
                    </label>
                    <Textarea v-if="selectedMarketingMaterial" id="material_comment"
                            :variant="'subtle'"
                            :ref_for="true"
                            size="sm"
                            placeholder="Observations or Notes"
                            :disabled="false"
                            v-model="materialNotes"
                            required="true"/>
                </div>
            </div>
            <div v-if="selectedMarketingMaterial" class="col-span-2 flex justify-center py-4">
                <button type="submit" @click="submitMarketingMaterialRequest" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Submit Request
                </button>
                <button type="button" @click="closeAllForms" class="text-white
                bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Cancel
                </button>
            </div>
        </div>
        <!--Generate Code for Showing Activities in List Form-->
        <div v-if="showGlobeActivity" class="bg-white shadow-md rounded-lg p-4 mb-4">
            
            <!-- <h3 class="flex justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><mark class="px-2 text-white bg-blue-600 rounded-sm dark:bg-blue-500">Globe</mark> Activity</h3> -->
             <h3 class="flex justify-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Activity</h3>
            <ol v-if="hasActivity">
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
                <li v-for="request in marketingRequests.items" :key="request.name" class="bg-white shadow-md rounded-lg p-4 mb-4">
                    <p>
                        Request ID: <strong>{{ request.name }}</strong> is in <strong> {{ request.request_status }}</strong> stage that has requested <strong>{{ request.request_material }}</strong>.
                    </p>
                    <p v-if="request.approval_comment && request.request_status === 'Shortlisted'"><strong>Approval Comments:</strong> {{ request.approval_comment  }}</p>
                    <p v-if="request.hold_comment && request.request_status === 'On Hold'"><strong>Held Comments:</strong> {{ request.hold_comment  }}</p>
                </li>
                <li v-for="item in surveyItems.items" :key="item.name" class="bg-white shadow-md rounded-lg p-4 mb-4">
                    <p>
                        Survey <strong>{{ item.survey_master }}</strong> was submitted on <strong>{{ new Date(item.notification_time).toLocaleString() }}</strong> by <strong>{{ item.notified_by }}</strong>.
                    </p>
                    <!-- <div v-if="item.notification_detail">
                        <p><strong>Details:</strong></p>
                        <pre class="whitespace-pre-wrap">{{ item.notification_detail }}</pre>
                    </div> -->
                </li>
            </ol>
            <div v-else class="text-center text-gray-500 py-4">
                No Activity found
            </div>
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
                poi_details: {},
                showMergeForm : false,
                showBoardForm : false,
                showSurveyForm : false,
                showGlobeActivity:true,
                source: urlParams.get('source'),
                pois: ref([]),
                mergeRequests:ref([]),
                rejectedMergeRequests:ref([]),
                marketingRequests:ref([]),
                surveyItems:ref([]),
                mergeToLocation:null,
                mergeNotes:null,
                marketingMaterialOptions:ref([]),
                selectedMarketingMaterial:null,
                materialNotes:null,
                // Survey related data
                surveys: ref([]),
                selectedSurveys: ref([]),
                surveyQuestions: ref([]),
                currentSurvey: null,
                currentQuestionIndex: 0,
                surveyAnswers: ref({})
            }
        },
    computed: {
        hasActivity() {
            const r1 = this.rejectedMergeRequests.items || [];
            const r2 = this.mergeRequests.items || [];
            const r3 = this.marketingRequests.items || [];
            const r4 = this.surveyItems.items || [];
            return r1.length > 0 || r2.length > 0 || r3.length > 0 || r4.length > 0;
        }
    },
    mounted(){
        createResource({
            url:'frappe.client.get',
            params:{
                doctype:"CRM POI",
                name: this.id,
                fields:['*']
            },
        }).fetch().then(response => {
            this.poi_details.doc = response;
        })
        // this.marketingMaterialOptions=createResource({
        //     url:'crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.get_doctype_meta',
        //     params:{
        //         doctype:"Marketing Material Request"
        //     }
        // }).fetch().then(response => {
        //     this.marketingMaterialOptions.options = response.fields.find(docField => docField.fieldname==="request_material").options.split("\n");
        // })
        this.marketingMaterialOptions= createListResource({
            doctype:'Marketing Material Type',
            fields:['name'],
            pageLength: "None",
        })
        this.marketingMaterialOptions.reload().then(response => {
            //console.log(response['name']);
            this.marketingMaterialOptions.options = response.map(item => ({value:item.name,label:item.name}));
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
        this.marketingRequests = createListResource({
            doctype:'Marketing Material Request',
            fields:["*"],
            filters:[['poi_id','=',this.id]]
        })
        this.marketingRequests.reload().then(response => {
            this.marketingRequests.items=response;
            //loop through this.marketingRequests.items
            for (let item of this.marketingRequests.items) {
                
            }
        }).catch(error => {
            console.error("Failed to load marketing requests:", error);
        });
        
        // Load survey items (CRM POI Notify with notification_type = 'Survey')
                this.surveyItems = createListResource({
                    doctype: 'CRM POI Notify',
                    fields: ['*'],
                    filters: [['crm_poi', '=', this.id], ['notification_type', '=', 'Survey']],
                    pageLength: "None",
                })
                this.surveyItems.reload().then(response => {
                    this.surveyItems.items = response;
                }).catch(error => {
                    console.error("Failed to load survey items:", error);
                });
                
                // Load active surveys
                this.surveys = createListResource({
                    doctype: 'CRM POI Survey Master',
                    fields: ['name', 'survey_name'],
                    filters: [['is_active', '=', 1]],
                    pageLength: "None",
                })
                this.surveys.reload().then(response => {
                    this.surveys.items = response;
                }).catch(error => {
                    console.error("Failed to load surveys:", error);
                });
    },
    methods: {
        toggleMergeForm() {
            this.showMergeForm = !this.showMergeForm;
            this.showSurveyForm = false;
            this.showBoardForm = false;
            this.showGlobeActivity=false;
        },
        toggleSurveyForm() {
            this.showSurveyForm = !this.showSurveyForm;
            this.showMergeForm = false;
            this.showBoardForm = false;
            this.showGlobeActivity=false;
        },
        toggleBoardForm() {
            this.showBoardForm = !this.showBoardForm;
            this.showMergeForm = false;
            this.showSurveyForm = false;
            this.showGlobeActivity=false;
        },
        toggleGlobeActivity(){
            this.showGlobeActivity=!this.showGlobeActivity;
            this.showBoardForm = false;
            this.showMergeForm = false;
            this.showSurveyForm = false;
            // console.log()
        },
        closeAllForms() {
            this.showMergeForm = false;
            this.mergeToLocation = null;
            this.selectedMarketingMaterial =null;
            this.materialNotes=null;
            this.mergeNotes=null;
            this.showSurveyForm = false;
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
                if(this.mergeToLocation.value!=this.id){
                    this.mergeRequests.insert.submit({
                    from_poi:this.id,
                    to_poi:this.mergeToLocation.value,
                    radial_difference_in_mtrs: this.mergeToLocation.radialDistance,
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
        },
        startSurvey() {
            if (this.selectedSurveys.length === 0) return;
            
            // For now, we'll use the first selected survey
            // In the future, we might want to handle multiple surveys
            this.currentSurvey = this.selectedSurveys[0];
            
            // Load survey questions
            createResource({
                url: 'frappe.client.get',
                params: {
                    doctype: "CRM POI Survey Master",
                    name: this.currentSurvey,
                    fields: ['*']
                },
            }).fetch().then(response => {
                // Load the child table data (survey questions)
                this.surveyQuestions = response.table_rwyu || [];
                this.currentQuestionIndex = 0;
                this.surveyAnswers = {};
            }).catch(error => {
                console.error("Failed to load survey:", error);
                alert("Failed to load survey. Please try again.");
            });
        },
        getCurrentQuestion() {
            const question = this.surveyQuestions[this.currentQuestionIndex];
            
            // Initialize surveyAnswers for Multi Select questions as an array
            if (question.main_question_type === 'Multi Select' && !Array.isArray(this.surveyAnswers[question.name])) {
                this.surveyAnswers[question.name] = [];
            }
            
            return question;
        },
        getQuestionOptions(question) {
            if (question.main_question_options) {
                return question.main_question_options.split('\n').filter(option => option.trim() !== '');
            }
            return [];
        },
        setRating(questionName, rating) {
            this.surveyAnswers[questionName] = rating;
        },
        getRating(questionName) {
            return this.surveyAnswers[questionName] || 0;
        },
        isCurrentQuestionValid() {
            const currentQuestion = this.getCurrentQuestion();
            if (!currentQuestion.mandatory_answer) {
                return true;
            }
            
            const answer = this.surveyAnswers[currentQuestion.name];
            
            // For Select, check if an option is selected (answer is a string)
            if (currentQuestion.main_question_type === 'Select') {
                return answer !== undefined && answer !== null && answer !== '';
            }
            
            // For Multi Select, check if at least one option is selected (answer is an array)
            if (currentQuestion.main_question_type === 'Multi Select') {
                return answer && Array.isArray(answer) && answer.length > 0;
            }
            
            // For Data and Rating, check if answer exists
            if (currentQuestion.main_question_type === 'Data' || currentQuestion.main_question_type === 'Rating') {
                return answer !== undefined && answer !== null && answer !== '';
            }
            
            return false;
        },
        nextQuestion() {
            if (this.isCurrentQuestionValid() && this.currentQuestionIndex < this.surveyQuestions.length - 1) {
                this.currentQuestionIndex++;
            }
        },
        previousQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
            }
        },
        submitSurvey() {
            if (!this.isCurrentQuestionValid()) {
                alert("Please provide an answer for the mandatory question.");
                return;
            }
            
            // Format survey details as requested
            let surveyDetails = "";
            this.surveyQuestions.forEach((question, index) => {
                if (index > 0) {
                    surveyDetails += "\n-------\n";
                }
                
                surveyDetails += "Q) " + question.main_question + "\n";
                
                const answer = this.surveyAnswers[question.name];
                if (answer !== undefined && answer !== null) {
                    if (Array.isArray(answer)) {
                        // For multi-select answers
                        surveyDetails += "A) " + answer.join(", ");
                    } else {
                        // For single answers
                        surveyDetails += "A) " + answer;
                    }
                } else {
                    surveyDetails += "A) No answer provided";
                }
            });
            
            // Create a new CRM POI Notify with notification_type = 'Survey'
            createResource({
                url: 'frappe.client.insert',
                params: {
                    doc: {
                        doctype: "CRM POI Notify",
                        docstatus: 1,
                        notification_type: "Survey",
                        crm_poi: this.id,
                        poi_name: this.poi_details.doc.location_name,
                        survey_master: this.currentSurvey,
                        notification_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                        notified_by: sessionUser(),
                        notification_detail: surveyDetails
                    }
                },
                onSuccess: (data) => {
                    alert('Survey submitted successfully!');
                    
                    // Reset survey state
                    this.currentSurvey = null;
                    this.surveyQuestions = [];
                    this.currentQuestionIndex = 0;
                    this.surveyAnswers = {};
                    this.selectedSurveys = [];
                    window.location.reload();
                },
                onError: (error) => {
                    console.error('Error submitting survey:', error);
                    alert('Error submitting survey. Please try again.');
                }
            }).submit();
        },
        submitMarketingMaterialRequest(){
            if (!this.materialNotes || this.materialNotes.trim() === '') {
                alert('Please enter notes before submitting the request.');
                return;
            }
            else{
                // alert(JSON.stringify(this.selectedMarketingMaterial))
                
                let marketing = {
                    poi_id:this.id,
                    poi_name:this.poi_details.doc.location_name,
                    request_material:this.selectedMarketingMaterial.value,
                    request_raised_by:sessionUser(),
                    // request_status: 'Submitted',
                    // installation_status: 'Not Shortlisted',
                    // require_proofs: 1,
                    crm_lead_id: this.poi_details.doc.crm_lead_id,
                    latitude: this.poi_details.doc.latitude,
                    longitude: this.poi_details.doc.longitude,
                    request_notes: this.materialNotes,
                    fieldassist_id: this.poi_details.doc.fieldassist_id,
                    docstatus:1
                }
                //console.log(JSON.stringify(marketing));
                this.marketingRequests.insert.submit(marketing).then((response) =>{
                    alert(`Successfully submitted marketing material request ${response.name}`)
                    this.closeAllForms();
                    window.location.reload();
                }
                ).catch((error)=>{
                    alert(`Error occured while submitting marketing material request`,error.message)
                })
                
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