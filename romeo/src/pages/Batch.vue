<template>
    <router-view></router-view>
    <Card :title="batchId" :subtitle="presentBatch.batch_state+ ' | '+presentBatch.creation_date" class="bg-red-100">
        <div class="grid grid-cols-4 gap-4 my-4">
            <div class="border border-black bg-gray-200 flex flex-col justify-center items-center rounded">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Total Requests
                </label>
                <p class="text-sm">
                    {{presentBatchAnalytics.allocated_requests}} Nos
                </p>
            </div>
            <div class="border border-black bg-gray-200 flex flex-col justify-center items-center rounded">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Recce Requests
                </label>
                <p class="text-sm">
                    {{presentBatchAnalytics.recce_requests}} Nos
                </p>
            </div>
            <div class="border border-black bg-gray-200 flex flex-col justify-center items-center rounded">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Quotation Requests
                </label>
                <p class="text-sm">
                    {{presentBatchAnalytics.quotation_requests}} Nos
                </p>
            </div>
            <div class="border border-black bg-gray-200 flex flex-col justify-center items-center rounded">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Under Process - Quotations
                </label>
                <p class="text-sm">
                    {{presentBatchAnalytics.under_review_quotations}} Nos
                </p>
            </div>
            <div class="border border-black bg-gray-200 flex flex-col justify-center items-center rounded">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Manufacturing Requests
                </label>
                <p class="text-sm">
                    {{presentBatchAnalytics.manufacturing_requests}} Nos
                </p>
            </div>
            <div class="border border-black bg-gray-200 flex flex-col justify-center items-center rounded">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Delivering Requests
                </label>
                <p class="text-sm">
                    {{presentBatchAnalytics.delivery_requests}} Nos
                </p>
            </div>
            <div class="border border-black bg-gray-200 flex flex-col justify-center items-center rounded">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Delivered - Pending Attestation Requests
                </label>
                <p class="text-sm">
                    {{presentBatchAnalytics.delivered_attestation}} Nos
                </p>
            </div>
            <div class="border border-black bg-gray-200 flex flex-col justify-center items-center rounded">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    Completed Requests
                </label>
                <p class="text-sm">
                    {{presentBatchAnalytics.completed_requests}} Nos
                </p>
            </div>
        </div>
    </Card>
    <div class="tab-group flex mt-10 max-width" data-dui-orientation="vertical">
        <div role="tablist" class="relative bg-stone-100 rounded-lg flex flex-col p-1 w-2/12">
          <div class="absolute top-0 left-0 right-0 mx-1 w-auto bg-lime-400 rounded-md shadow-sm transition-all duration-300 transform scale-x-0 translate-x-0 tab-indicator z-0"></div>
            <a href="#" class="tab-link flex items-center text-sm active px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-recce-requests">
                <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  class="mr-2 h-4 w-4 feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                Start Recce 
            </a>
            <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-quotation-requests">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-book"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                Quotations </a>
            <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-underreview-quotations">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-book"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> -->
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Under Review </a>
            <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-manufacture-attestation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-tool"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                Attest Manufacture </a>
            <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-delivery-requests">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                Delivery </a>
            <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-delivery-attestation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-award"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                Attest Delivery </a>
            <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-service-requests">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-battery-charging"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline></svg>
                Service Requests </a>
            <a href="#" class="tab-link flex items-center text-sm px-4 py-2 text-gray-700 relative" data-dui-tab-target="tab-service-attestation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4 feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                Attest Servicing </a>
          </div>
            <div id="tab-recce-requests" class="tab-content w-full text-stone-500 text-sm block p-4 max-width">
                <div v-if="materialRequests.recce?materialRequests.recce.length===0:false " class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.recce?materialRequests.recce.length >0:false " class="flex flex-col">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width">Recce Requests</h4>
                    <ul class="flex flex-col max-width py-2 scrollbar-y-scroll scrollbar-x-hidden" >
                        <li class="flex flex-row justify-between mb-2 rounded-md border-2 border-black py-2 border-solid " v-for="(request,index) in materialRequests.recce" :key="index">
                            <div class="w-3/12 flex flex-col justify-between">
                                <header><h2>{{ request.name }}</h2></header>
                                <header><h4> {{ request.poi_name }} </h4></header>
                            </div>
                            <div class="flex flex-col justify-between w-6/12 border-black border-solid">
                                <p><b>Material: </b>{{ request.request_material }}</p>
                                <p><b>Process Stage: </b>{{ request.process_stage }}</p>
                                <p><b>Approved Date: </b>{{ request.approved_declined_hold_date }}</p>
                                <p><b>Request Notes:</b> {{ request.request_notes }}</p>
                                <p><b>Distance from Vendor: </b> {{ request.distance_bw_poi_and_vendor }} KMS</p>
                            </div>
                            <div class="flex flex-col justify-between w-3/12">
                                <!-- <a :href="'https://www.google.com/maps/place/'+request.latitude+'%2C'+request.longitude"  target="_blank" rel="noopener noreferrer" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Map</a> -->
                                <button v-if="request.request_status==='Shortlisted'" @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Request Details</button>
                                <button v-if="request.process_stage==='Batch id Allocated' && request.request_status==='Shortlisted'" @click="handleRecceFormClick(request,index)" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload Recce Details</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="tab-quotation-requests" class="tab-content w-full text-stone-500 text-sm hidden p-4">
                <div v-if="materialRequests.quotation?materialRequests.quotation.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.quotation?materialRequests.quotation.length >0:false " class="flex flex-col">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width">Quotation Requests</h4>
                    <ul class="flex flex-col max-width py-2 scrollbar-y-scroll scrollbar-x-hidden" >
                        <li class="flex flex-row justify-between mb-2 rounded-md border-2 border-black py-2 border-solid " v-for="(request,index) in materialRequests.quotation" :key="index">
                            <div class="w-3/12 flex flex-col justify-between">
                                <header><h2>{{ request.name }}</h2></header>
                                <header><h4> {{ request.poi_name }} </h4></header>
                            </div>
                            <div class="flex flex-col justify-between w-6/12 border-black border-solid">
                                <p><b>Material: </b>{{ request.request_material }}</p>
                                <p><b>Process Stage: </b>{{ request.process_stage }}</p>
                                <p><b>Approved Date: </b>{{ request.approved_declined_hold_date }}</p>
                                <p><b>Request Notes:</b> {{ request.request_notes }}</p>
                                <p><b>Distance from Vendor: </b> {{ request.distance_bw_poi_and_vendor }} KMS</p>
                                <p><b>Recce Notes: </b> {{ request.recce_notes }}</p>
                            </div>
                            <div class="flex flex-col justify-between w-3/12">
                                <!-- <a :href="'https://www.google.com/maps/place/'+request.latitude+'%2C'+request.longitude"  target="_blank" rel="noopener noreferrer" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Map</a> -->
                                <button v-if="request.request_status==='Shortlisted'" @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Request Details</button>
                                <button v-if="request.process_stage==='Evaluating POI Exact Requirements' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" @click="handleRecceFormClick(request,index)" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Resubmit Recce Details</button>
                                <button v-if="request.process_stage==='Evaluating POI Exact Requirements' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" @click="handleUploadQuotation(request,index)" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload Quotation</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="tab-underreview-quotations" class="tab-content w-full text-stone-500 text-sm hidden p-4">
                <!-- <div v-if="!dataValidated || materialRequests.quotation_submitted?materialRequests.quotation_submitted.length ===0:false " class="flex flex-col justify-center items-center"> -->
                <div v-if="materialRequests.quotation_submitted?materialRequests.quotation_submitted.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.quotation_submitted?materialRequests.quotation_submitted.length >0:false " class="flex flex-col">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width">Under Review Quotations</h4>
                    <ul class="flex flex-col max-width py-2 scrollbar-y-scroll scrollbar-x-hidden" >
                        <li class="flex flex-row justify-between mb-2 rounded-md border-2 border-black py-2 border-solid " v-for="(request,index) in materialRequests.quotation_submitted" :key="index">
                            <div class="w-3/12 flex flex-col justify-between">
                                <header><h2>{{ request.name }}</h2></header>
                                <header><h4> {{ request.poi_name }} </h4></header>
                            </div>
                            <div class="flex flex-col justify-between w-6/12 border-black border-solid">
                                <p><b>Material: </b>{{ request.request_material }}</p>
                                <p><b>Process Stage: </b>{{ request.process_stage }}</p>
                                <p><b>Approved Date: </b>{{ request.approved_declined_hold_date }}</p>
                                <p><b>Request Notes:</b> {{ request.request_notes }}</p>
                                <p><b>Recce Notes: </b> {{ request.recce_notes }}</p>
                                <p><b>Quotation Cost: </b>{{ request.quotation_price }}</p>
                            </div>
                            <div class="flex flex-col justify-between w-3/12">
                                <!-- <a :href="'https://www.google.com/maps/place/'+request.latitude+'%2C'+request.longitude"  target="_blank" rel="noopener noreferrer" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Map</a> -->
                                <button v-if="request.request_status==='Shortlisted'" @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Request Details</button>
                                <!-- <button v-if="request.process_stage==='Evaluating POI Exact Requirements' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" @click="handleRecceFormClick(request,index)" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Resubmit Recce Details</button>
                                <button v-if="request.process_stage==='Evaluating POI Exact Requirements' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" @click="handleUploadQuotation(request,index)" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Upload Quotation</button> -->
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="tab-manufacture-attestation" class="tab-content w-full text-stone-500 text-sm hidden p-4">
                <!-- <div v-if="!dataValidated || materialRequests.manufacturing?materialRequests.manufacturing.length ===0:false " class="flex flex-col justify-center items-center"> -->
                <div v-if="materialRequests.manufacturing?materialRequests.manufacturing.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.manufacturing?materialRequests.manufacturing.length >0:false ">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width">Manufacturing Requests</h4>
                    <ul class="flex flex-col max-width py-2 scrollbar-y-scroll scrollbar-x-hidden" >
                        <li class="flex flex-row justify-between mb-2 rounded-md border-2 border-black py-2 border-solid " v-for="(request,index) in materialRequests.manufacturing" :key="index">
                            <div class="w-3/12 flex flex-col justify-between">
                                <header><h2>{{ request.name }}</h2></header>
                                <header><h4> {{ request.poi_name }} </h4></header>
                            </div>
                            <div class="flex flex-col justify-between w-6/12 border-black border-solid">
                                <!-- <p><b>Process Stage: </b>{{ request.process_stage }}</p> -->
                                <!-- <p><b>Approved Date: </b>{{ request.approved_declined_hold_date }}</p> -->
                                <p><b>Request Notes:</b> {{ request.request_notes }}</p>
                                <p><b>Recce Notes: </b> {{ request.recce_notes }}</p>
                                <p><b>Specification: </b>{{ request.quantity }} {{ request.quote_uom }} @ {{ request.quote_rate_per_uom }} Rs. per {{ request.quote_uom }}</p>
                            </div>
                            <div class="flex flex-col justify-between w-3/12">
                                <!-- <a :href="'https://www.google.com/maps/place/'+request.latitude+'%2C'+request.longitude"  target="_blank" rel="noopener noreferrer" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Map</a> -->
                                <button v-if="request.request_status==='Shortlisted'" @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Request Details</button>
                                <!-- <button v-if="request.process_stage==='Evaluating POI Exact Requirements' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" @click="handleRecceFormClick(request,index)" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Resubmit Recce Details</button> -->
                                <button v-if="request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Company Evaluator']):false" @click="handleAttestManufacture(request,index)" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Attest Manufacture</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="tab-delivery-requests" class="tab-content w-full text-stone-500 text-sm hidden p-4">
                <!-- <div v-if="!dataValidated || materialRequests.delivery?materialRequests.delivery.length ===0:false " class="flex flex-col justify-center items-center"> -->
                <div v-if="materialRequests.delivery?materialRequests.delivery.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.delivery?materialRequests.delivery.length >0:false ">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width">Delivery Requests</h4>
                    <ul class="flex flex-col max-width py-2 scrollbar-y-scroll scrollbar-x-hidden" >
                        <li class="flex flex-row justify-between mb-2 rounded-md border-2 border-black py-2 border-solid " v-for="(request,index) in materialRequests.delivery" :key="index">
                            <div class="w-3/12 flex flex-col justify-between">
                                <header><h2>{{ request.name }}</h2></header>
                                <header><h4> {{ request.poi_name }} </h4></header>
                            </div>
                            <div class="flex flex-col justify-between w-6/12 border-black border-solid">
                                <!-- <p><b>Process Stage: </b>{{ request.process_stage }}</p> -->
                                <!-- <p><b>Approved Date: </b>{{ request.approved_declined_hold_date }}</p> -->
                                <p><b>Request Notes:</b> {{ request.request_notes }}</p>
                                <p><b>Recce Notes: </b> {{ request.recce_notes }}</p>
                                <p><b>Specification: </b>{{ request.quantity }} {{ request.quote_uom }} @ {{ request.quote_rate_per_uom }} Rs. per {{ request.quote_uom }}</p>
                            </div>
                            <div class="flex flex-col justify-between w-3/12">
                                <!-- <a :href="'https://www.google.com/maps/place/'+request.latitude+'%2C'+request.longitude"  target="_blank" rel="noopener noreferrer" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Map</a> -->
                                <button v-if="request.request_status==='Shortlisted'" @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Request Details</button>
                                <!-- <button v-if="request.process_stage==='Evaluating POI Exact Requirements' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" @click="handleRecceFormClick(request,index)" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Resubmit Recce Details</button> -->
                                <button v-if="request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Company Evaluator','Vendor Admin','Vendor Employee']):false" @click="handleDelilveryItem(request,index)" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Deliver Item</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="tab-delivery-attestation" class="tab-content w-full text-stone-500 text-sm hidden p-4">
                <!-- <div v-if="dataValidated && materialRequests.delivered_pending_attestion?materialRequests.delivered_pending_attestion.length > 0:false">Delivery Attestation</div> -->
                <div v-if="materialRequests.delivered_pending_attestion?materialRequests.delivered_pending_attestion.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.delivered_pending_attestion?materialRequests.delivered_pending_attestion.length >0:false ">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width">Delivered - To be Attested Requests</h4>
                    <ul class="flex flex-col max-width py-2 scrollbar-y-scroll scrollbar-x-hidden" >
                        <li class="flex flex-row justify-between mb-2 rounded-md border-2 border-black py-2 border-solid " v-for="(request,index) in materialRequests.delivered_pending_attestion" :key="index">
                            <div class="w-3/12 flex flex-col justify-between">
                                <header><h2>{{ request.name }}</h2></header>
                                <header><h4> {{ request.poi_name }} </h4></header>
                            </div>
                            <div class="flex flex-col justify-between w-6/12 border-black border-solid">
                                <!-- <p><b>Process Stage: </b>{{ request.process_stage }}</p> -->
                                <!-- <p><b>Approved Date: </b>{{ request.approved_declined_hold_date }}</p> -->
                                <p><b>Request Notes:</b> {{ request.request_notes }}</p>
                                <p><b>Recce Notes: </b> {{ request.recce_notes }}</p>
                                <p><b>Specification: </b>{{ request.quantity }} {{ request.quote_uom }} @ {{ request.quote_rate_per_uom }} Rs. per {{ request.quote_uom }}</p>
                                <p><b>Manufactured: </b>{{ request.manufacture_quantity }} {{ request.quote_uom }}</p>
                                <p><b>Installed: </b>{{ request.installation_quantity }} {{ request.quote_uom }}</p>
                            </div>
                            <div class="flex flex-col justify-between w-3/12">
                                <!-- <a :href="'https://www.google.com/maps/place/'+request.latitude+'%2C'+request.longitude"  target="_blank" rel="noopener noreferrer" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Map</a> -->
                                <button v-if="request.request_status==='Shortlisted'" @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">View Request Details</button>
                                <!-- <button v-if="request.process_stage==='Evaluating POI Exact Requirements' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" @click="handleRecceFormClick(request,index)" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Resubmit Recce Details</button> -->
                                <button v-if="request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Company Evaluator']):false" @click="handleDeliveryAttestation(request,index)" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Attest Delivery</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="tab-service-requests" class="tab-content w-full text-stone-500 text-sm hidden p-4">
            <div v-if="dataValidated">Service Requests</div>
            </div>
            <div id="tab-service-attestation" class="tab-content w-full text-stone-500 text-sm hidden p-4">
            <div v-if="dataValidated">Service Attestation</div>
            </div>
      </div>
</template>
<script>
import { ref } from "vue";
import { initTabs } from 'david-ai';
import {Card, createResource,createListResource} from 'frappe-ui';

import {sessionUser} from '@/data/session';
export default {
    name:"Batch",
    props:{
        batchId:{
        type:String,
        required:true
        },
        vendorId:{
        type:String,
        required:true
        }
    },
    data(){
      return {
        dataValidated:false,
        userVendorDetails:ref([]),
        materialRequests: ref([]),
        presentBatch:{},
        presentBatchAnalytics:{},
        // recceRequests:ref([]),
        // quotationRequests:ref([]),
        // manufactureAttestation:ref([]),
        // deliveryRequests:ref([]),
        // deliveryAttestation:ref([]),
        // serviceRequests:ref([]),
        // serviceAttestation:ref([])
        };
    },
    methods:{
        handleRecceFormClick(materialRequest, index) {
            this.$router.push({name:'Recce',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:materialRequest.name}})
        },
        //Function to check whether an array contains any of the elements of another array
        containsAny(arr1, arr2) {
            return arr1.some(item1 => arr2.some(item2 => item1.includes(item2)));
        },
        handleUploadQuotation(materialRequest,index){
            this.$router.push({name:'Quotation',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:materialRequest.name}})
        },
        handleAttestManufacture(materialRequest,index){
            // Attest Manufacture
            this.$router.push({name:'Attest Manufacture',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:materialRequest.name}})
        },
        handleDelilveryItem(materialRequest,index){
            this.$router.push({name:'Delivery',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:materialRequest.name}})
        },
        handleDeliveryAttestation(materialRequest,index){
            this.$router.push({name:'Delivery Attestation',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:materialRequest.name}})
        }
    },
    mounted(){
        initTabs();
        this.userVendorDetails = createResource({
            url:'/api/method/crm_extension.crm_extension.doctype.vendor.vendor.evaluate_user_for_vendor',
            params:{
                vendor:this.vendorId,
                user: sessionUser()
            }
            })
            this.userVendorDetails.fetch().then((res)=>{
            this.userVendorDetails.data = res
            this.presentBatch = this.userVendorDetails.data.batches.find(batch => batch.name===this.batchId);
            if(this.userVendorDetails.data.vendor && this.userVendorDetails.data.roles.length > 0 && this.presentBatch){
                // console.log(this.userVendorDetails.data.roles)
                this.dataValidated=true;
                this.materialRequests = createListResource({
                    doctype:'Marketing Material Request',
                    fields:['*'],
                    filters:[['batch_id','=',this.batchId],['vendor','=',this.vendorId]],
                    pageLength: "None",
                })
                this.materialRequests.reload().then((response)=>{
                    this.materialRequests.data = response;
                    this.materialRequests.recce=response.filter(request=>{ return request.process_stage === 'Batch id Allocated' && request.request_status == 'Shortlisted' })
                    this.materialRequests.quotation=response.filter(request=>{ return request.process_stage === 'Evaluating POI Exact Requirements' && request.request_status == 'Shortlisted'})
                    this.materialRequests.quotation_submitted=response.filter(request=>{return request.process_stage === 'Submitted Quotation for Requirements' && request.request_status == 'Shortlisted'})
                    this.materialRequests.manufacturing= response.filter(request=>{return request.process_stage === 'Accepted Quotation' && request.request_status == 'Shortlisted'})
                    this.materialRequests.delivery=response.filter(request=>{return request.process_stage === 'Attested Manufacture Process' && request.request_status == 'Shortlisted'})
                    this.materialRequests.delivered_pending_attestion =response.filter(request=>{return request.process_stage === 'Delivered the Goods by Vendor' && request.request_status == 'Shortlisted'})
                    this.materialRequests.completed_requests=response.filter(request=>{return request.process_stage === 'Attested Completion of Job handled by Vendor' && request.request_status == 'Completed'})
                    //this.materialRequests.service=requests.filter(request=>{return request.process_stage === 'Customer Feedback Submitted' && request.request_status == 'Shortlisted'})

                    this.presentBatchAnalytics = {
                        'name':this.batchId,
                        'allocated_requests':this.materialRequests.data.length,
                        'recce_requests':this.materialRequests.recce.length,
                        'quotation_requests':this.materialRequests.quotation.length,
                        'under_review_quotations':this.materialRequests.quotation_submitted.length,
                        'manufacturing_requests':this.materialRequests.manufacturing.length,
                        'delivery_requests':this.materialRequests.delivery.length,
                        'delivered_attestation':this.materialRequests.delivered_pending_attestion.length,
                        'completed_requests':this.materialRequests.completed_requests.length,
                        'service_requests':[],
                        'service_attestation':[]
                    }
                })
            }
        })
    },
    
}
</script>
<style scoped>
.unique-color-map{
  background-color: var(--sidebar-bg-color);
}
</style>