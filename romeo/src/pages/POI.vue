<template>
    <div class="poi-container">
        
        <!-- Generate a Card HTML -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold mb-2">{{ id }}</h3>
            <h3 class="text-xl font-semibold mb-2">{{ location_name }}</h3>
            <div class="grid grid-cols-2 gap-2">
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
                <div class="col-span-2">
                    <p class="text-gray-600">Location:</p>
                    <p>{{ latitude }}, {{ longitude }}</p>
                </div>
            </div>
        </div>
        <!--Generate Card Div to add Action buttons "Merge", "Report Distributor","Raise a Board Request"-->
        <div class="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 class="text-xl font-semibold mb-2">Actions</h3>
            <div class="grid grid-cols-3 gap-2">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Merge
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Distributor
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Raise a Board Request
                </button>
            </div>
        </div>
    </div>
</template>
<script>
//User window.location.search to get the query parameters
const route = window.location.search
//Extract the query parameters from the route
const urlParams = new URLSearchParams(route)
//Get the value of the query parameters
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
            longitude: urlParams.get('longitude')
        }
    }
}
</script>