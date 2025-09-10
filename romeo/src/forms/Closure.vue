<template>
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
    <div v-if="poi_details.doc && poi_details.doc.poi_status =='Active'" class="flex justify-center space-x-4">
        <button @click="toggleClosureForm" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Report Permanently Closed
        </button>
    </div>
    <div v-if="showClosureForm" class="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 class="text-xl font-semibold flex justify-center mb-2">Closure Form</h3>
        <div class="grid grid-cols-2 gap-4 py-4">
            <label for="closure_comment" class="block text-gray-700 text-sm font-bold mb-2">
                Comment:
            </label>
            <Textarea v-if="showClosureForm" id="closure_comment"
                    :variant="'subtle'"
                    :ref_for="true"
                    size="sm"
                    placeholder="Observations or Notes"
                    :disabled="false"
                    v-model="closureNotes"
                    required="true"/>
            </div>
            <div v-if="showClosureForm" class="col-span-2 flex justify-center py-4">
                <button type="submit" @click="submitClosureRequest" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Submit Request
                </button>
                <button type="button" @click="toggleClosureForm" class="text-white
                bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                    Cancel
                </button>
            </div>
    </div>
</template>
<script>
import { createResource } from 'frappe-ui'
import { ref } from 'vue'
import {sessionUser} from '@/data/session';

const route = window.location.search
const urlParams = new URLSearchParams(route)

export default {
    name: "Closure",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            poi_details: {},
            source: urlParams.get('source'),
            showClosureForm: false,
            closureNotes:ref('')
        }
    },
    methods:{
        toggleClosureForm(){
            this.showClosureForm = !this.showClosureForm
        },
        submitClosureRequest(){
            if (!this.closureNotes || this.closureNotes.trim() === '') {
                alert('Please enter notes before submitting the request.');
                return;
            }
            else{
                //Create a new CRM POI Notify with notification_type = 'Closure', crm_poi = this.id, notification_time = now(), notified_by - sessionUser()
                createResource({
                    url: 'frappe.client.insert',
                    params: {
                        doc: {
                            doctype: "CRM POI Notify",
                            docstatus: 1,
                            notification_type: "Closure",
                            crm_poi: this.id,
                            notification_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
                            notified_by: sessionUser(),
                            detail: [
                                {
                                    notification_heading: "Closure Comment",
                                    notification_content: this.closureNotes
                                }
                            ]
                        }
                    },
                    onSuccess: (data) => {
                        //Modify poidetails.doc.poi_status = 'Closure Requested'
                        this.poi_details.doc.poi_status = 'Closure Requested';
                        createResource({
                            url: 'frappe.client.set_value',
                            params: {
                                doctype: "CRM POI",
                                name: this.id,
                                fieldname: 'poi_status',
                                value: 'Closure Requested'
                            },
                            onSuccess: () => {
                                alert('Closure request submitted successfully!');
                                this.closureNotes = '';
                                this.showClosureForm = false;
                            },
                            onError: (error) => {
                                console.error('Error updating POI status:', error);
                                alert('Closure request submitted but failed to update POI status.');
                                this.closureNotes = '';
                                this.showClosureForm = false;
                            }
                        }).submit();
                    },
                    onError: (error) => {
                        console.error('Error submitting closure request:', error);
                        alert('Error submitting closure request. Please try again.');
                    }
                }).submit();
            }
        }
    },
    mounted() {
        createResource({
            url: 'frappe.client.get',
            params: {
                doctype: "CRM POI",
                name: this.id,
                fields: ['*']
            },
        }).fetch().then(response => {
            this.poi_details.doc = response;
        })
    }
}
</script>
<script setup>
import { TextInput,Textarea } from 'frappe-ui'
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
</style>