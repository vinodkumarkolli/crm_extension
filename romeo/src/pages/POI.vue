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
                <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Merge
                </button>
                <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Add Distributor
                </button>
                <button type="button" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
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
