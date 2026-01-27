<template>
    <router-view></router-view>
    <Card :title="batchId" :subtitle="presentBatch.batch_state+ ' | '+presentBatch.creation_date" class="bg-red-100">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-center items-center hover:shadow-md transition-shadow duration-200">
                <label class="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 text-center">
                    Total
                </label>
                <p class="text-xl font-bold text-gray-800">
                    {{presentBatchAnalytics.allocated_requests}} <span class="text-xs font-normal text-gray-500">Nos</span>
                </p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-center items-center hover:shadow-md transition-shadow duration-200">
                <label class="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 text-center">
                    Recce
                </label>
                <p class="text-xl font-bold text-gray-800">
                    {{presentBatchAnalytics.recce_requests}} <span class="text-xs font-normal text-gray-500">Nos</span>
                </p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-center items-center hover:shadow-md transition-shadow duration-200">
                <label class="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 text-center">
                    Quotation
                </label>
                <p class="text-xl font-bold text-gray-800">
                    {{presentBatchAnalytics.quotation_requests}} <span class="text-xs font-normal text-gray-500">Nos</span>
                </p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-center items-center hover:shadow-md transition-shadow duration-200">
                <label class="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 text-center">
                    Under Process - Quotations
                </label>
                <p class="text-xl font-bold text-gray-800">
                    {{presentBatchAnalytics.under_review_quotations}} <span class="text-xs font-normal text-gray-500">Nos</span>
                </p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-center items-center hover:shadow-md transition-shadow duration-200">
                <label class="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 text-center">
                    Manufacturing
                </label>
                <p class="text-xl font-bold text-gray-800">
                    {{presentBatchAnalytics.manufacturing_requests}} <span class="text-xs font-normal text-gray-500">Nos</span>
                </p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-center items-center hover:shadow-md transition-shadow duration-200">
                <label class="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 text-center">
                    Delivering
                </label>
                <p class="text-xl font-bold text-gray-800">
                    {{presentBatchAnalytics.delivery_requests}} <span class="text-xs font-normal text-gray-500">Nos</span>
                </p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-center items-center hover:shadow-md transition-shadow duration-200">
                <label class="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 text-center">
                    Delivered - Attestation Pending
                </label>
                <p class="text-xl font-bold text-gray-800">
                    {{presentBatchAnalytics.delivered_attestation}} <span class="text-xs font-normal text-gray-500">Nos</span>
                </p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-center items-center hover:shadow-md transition-shadow duration-200">
                <label class="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 text-center">
                    Completed - Not Paid
                </label>
                <p class="text-xl font-bold text-gray-800">
                    {{presentBatchAnalytics.completed_nopay_requests}} <span class="text-xs font-normal text-gray-500">Nos</span>
                </p>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-center items-center hover:shadow-md transition-shadow duration-200">
                <label class="block text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 text-center">
                    Completed - Paid
                </label>
                <p class="text-xl font-bold text-gray-800">
                    {{presentBatchAnalytics.completed_pay_requests}} <span class="text-xs font-normal text-gray-500">Nos</span>
                </p>
            </div>
        </div>
    </Card>
    <div class="flex flex-col mt-10 max-width">
        <div class="w-full mb-4 px-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">View Selection</label>
            <Autocomplete
                :options="tabs"
                v-model="activeTab"
                placeholder="Select View"
            />
        </div>
            <div v-show="activeTab?.value === 'tab-recce-requests'" class="tab-content w-full text-stone-500 text-sm block p-4 max-width">
                <div v-if="materialRequests.recce?materialRequests.recce.length===0:false " class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.recce?materialRequests.recce.length >0:false " class="flex flex-col">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width py-2 mb-4">Recce Requests</h4>
                    <ul class="flex flex-col w-full gap-4" >
                        <li class="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300" v-for="(request,index) in materialRequests.recce" :key="index">
                            
                            <!-- Header / ID Section -->
                            <div class="w-full md:w-3/12 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                                <h2 class="text-lg font-bold text-gray-800 break-words">{{ request.name }}</h2>
                                <h4 class="text-sm font-medium text-gray-600 mt-1">{{ request.poi_name }}</h4>
                            </div>

                            <!-- Details Section -->
                            <div class="w-full md:w-6/12 p-4 flex flex-col gap-2 text-sm text-gray-700">
                                <div>
                                    <span class="font-semibold text-gray-900">Material:</span>
                                    <span>{{ request.request_material }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Process Stage:</span>
                                    <span>{{ request.process_stage }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Approved Date:</span>
                                    <span>{{ request.approved_declined_hold_date }}</span>
                                </div>
                                <div v-if="request.request_notes">
                                    <span class="font-semibold text-gray-900">Request Notes:</span>
                                    <span>{{ request.request_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Distance from Vendor:</span>
                                    <span>{{ request.distance_bw_poi_and_vendor }} KMS</span>
                                </div>
                            </div>

                            <!-- Actions Section -->
                            <div class="w-full md:w-3/12 p-4 flex flex-col justify-center items-center md:items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 gap-2">
                                <button v-if="request.request_status==='Shortlisted'" 
                                    @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" 
                                    class="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    View Request Details
                                </button>
                                <button v-if="request.process_stage==='Batch id Allocated' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Vendor Employee','Company Evaluator']):false" 
                                    @click="handleRecceFormClick(request,index)" 
                                    class="w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    Upload Recce Details
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="activeTab?.value === 'tab-quotation-requests'" class="tab-content w-full text-stone-500 text-sm p-4">
                <div v-if="(materialRequests.quotation?materialRequests.quotation.length===0:false) && (materialRequests.requotations?materialRequests.requotations.length===0:false)" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && ((materialRequests.quotation?materialRequests.quotation.length >0:false) || (materialRequests.requotations?materialRequests.requotations.length >0:false)) " class="flex flex-col">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width py-2 mb-4">Quotation Requests</h4>
                    <ul class="flex flex-col w-full gap-4" >
                        <li class="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300" v-for="(request,index) in materialRequests.quotation" :key="index">
                            
                            <!-- Header / ID Section -->
                            <div class="w-full md:w-3/12 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                                <h2 class="text-lg font-bold text-gray-800 break-words">{{ request.name }}</h2>
                                <h4 class="text-sm font-medium text-gray-600 mt-1">{{ request.poi_name }}</h4>
                            </div>

                            <!-- Details Section -->
                            <div class="w-full md:w-6/12 p-4 flex flex-col gap-2 text-sm text-gray-700">
                                <div>
                                    <span class="font-semibold text-gray-900">Material:</span>
                                    <span>{{ request.request_material }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Process Stage:</span>
                                    <span>{{ request.process_stage }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Approved Date:</span>
                                    <span>{{ request.approved_declined_hold_date }}</span>
                                </div>
                                <div v-if="request.request_notes">
                                    <span class="font-semibold text-gray-900">Request Notes:</span>
                                    <span>{{ request.request_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Distance from Vendor:</span>
                                    <span>{{ request.distance_bw_poi_and_vendor }} KMS</span>
                                </div>
                                <div v-if="request.recce_notes">
                                    <span class="font-semibold text-gray-900">Recce Notes:</span>
                                    <span>{{ request.recce_notes }}</span>
                                </div>
                            </div>

                            <!-- Actions Section -->
                            <div class="w-full md:w-3/12 p-4 flex flex-col justify-center items-center md:items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 gap-2">
                                <button v-if="request.request_status==='Shortlisted'" 
                                    @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" 
                                    class="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    View Request Details
                                </button>
                                <button v-if="request.process_stage==='Evaluating POI Exact Requirements' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" 
                                    @click="handleRecceFormClick(request,index)" 
                                    class="w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    Resubmit Recce Details
                                </button>
                                <button v-if="request.process_stage==='Evaluating POI Exact Requirements' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" 
                                    @click="handleUploadQuotation(request,index)" 
                                    class="w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    Upload Quotation
                                </button>
                            </div>
                        </li>
                        <li class="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300" v-for="(request,index) in materialRequests.requotations" :key="index">
                            
                            <!-- Header / ID Section -->
                            <div class="w-full md:w-3/12 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                                <h2 class="text-lg font-bold text-gray-800 break-words">{{ request.name }}</h2>
                                <h4 class="text-sm font-medium text-gray-600 mt-1">{{ request.poi_name }}</h4>
                            </div>

                            <!-- Details Section -->
                            <div class="w-full md:w-6/12 p-4 flex flex-col gap-2 text-sm text-gray-700">
                                <div>
                                    <span class="font-semibold text-gray-900">Material:</span>
                                    <span>{{ request.request_material }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Process Stage:</span>
                                    <span>{{ request.process_stage }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Approved Date:</span>
                                    <span>{{ request.approved_declined_hold_date }}</span>
                                </div>
                                <div v-if="request.request_notes">
                                    <span class="font-semibold text-gray-900">Request Notes:</span>
                                    <span>{{ request.request_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Distance from Vendor:</span>
                                    <span>{{ request.distance_bw_poi_and_vendor }} KMS</span>
                                </div>
                                <div v-if="request.recce_notes">
                                    <span class="font-semibold text-gray-900">Recce Notes:</span>
                                    <span>{{ request.recce_notes }}</span>
                                </div>
                            </div>

                            <!-- Actions Section -->
                            <div class="w-full md:w-3/12 p-4 flex flex-col justify-center items-center md:items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 gap-2">
                                <button v-if="request.request_status==='Shortlisted'" 
                                    @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" 
                                    class="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    View Request Details
                                </button>
                                <button v-if="request.process_stage==='Asked Vendor Resubmit Quotation' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" 
                                    @click="handleRecceFormClick(request,index)" 
                                    class="w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    Resubmit Recce Details
                                </button>
                                <button v-if="request.process_stage==='Asked Vendor Resubmit Quotation' && request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false" 
                                    @click="handleUploadQuotation(request,index)" 
                                    class="w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    Resubmit Quotation
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="activeTab?.value === 'tab-underreview-quotations'" class="tab-content w-full text-stone-500 text-sm p-4">
                <div v-if="materialRequests.quotation_submitted?materialRequests.quotation_submitted.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.quotation_submitted?materialRequests.quotation_submitted.length >0:false " class="flex flex-col">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width py-2 mb-4">Under Review Quotations</h4>
                    <ul class="flex flex-col w-full gap-4" >
                        <li class="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300" v-for="(request,index) in materialRequests.quotation_submitted" :key="index">
                            
                            <!-- Header / ID Section -->
                            <div class="w-full md:w-3/12 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                                <h2 class="text-lg font-bold text-gray-800 break-words">{{ request.name }}</h2>
                                <h4 class="text-sm font-medium text-gray-600 mt-1">{{ request.poi_name }}</h4>
                            </div>

                            <!-- Details Section -->
                            <div class="w-full md:w-6/12 p-4 flex flex-col gap-2 text-sm text-gray-700">
                                <div>
                                    <span class="font-semibold text-gray-900">Material:</span>
                                    <span>{{ request.request_material }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Process Stage:</span>
                                    <span>{{ request.process_stage }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Approved Date:</span>
                                    <span>{{ request.approved_declined_hold_date }}</span>
                                </div>
                                <div v-if="request.request_notes">
                                    <span class="font-semibold text-gray-900">Request Notes:</span>
                                    <span>{{ request.request_notes }}</span>
                                </div>
                                <div v-if="request.recce_notes">
                                    <span class="font-semibold text-gray-900">Recce Notes:</span>
                                    <span>{{ request.recce_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Quotation Cost:</span>
                                    <span>{{ request.quote_price }}</span>
                                </div>
                            </div>

                            <!-- Actions Section -->
                            <div class="w-full md:w-3/12 p-4 flex flex-col justify-center items-center md:items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 gap-2">
                                <button v-if="request.request_status==='Shortlisted'" 
                                    @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" 
                                    class="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    View Request Details
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="activeTab?.value === 'tab-manufacture-attestation'" class="tab-content w-full text-stone-500 text-sm p-4">
                <div v-if="materialRequests.manufacturing?materialRequests.manufacturing.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.manufacturing?materialRequests.manufacturing.length >0:false ">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width py-2 mb-4">Manufacturing Requests</h4>
                    <ul class="flex flex-col w-full gap-4" >
                        <li class="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300" v-for="(request,index) in materialRequests.manufacturing" :key="index">
                            
                            <!-- Header / ID Section -->
                            <div class="w-full md:w-3/12 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                                <h2 class="text-lg font-bold text-gray-800 break-words">{{ request.name }}</h2>
                                <h4 class="text-sm font-medium text-gray-600 mt-1">{{ request.poi_name }}</h4>
                            </div>

                            <!-- Details Section -->
                            <div class="w-full md:w-6/12 p-4 flex flex-col gap-2 text-sm text-gray-700">
                                <div>
                                    <span class="font-semibold text-gray-900">Material:</span>
                                    <span class="bg-red-300 rounded px-1">{{ request.request_material }}</span>
                                </div>
                                <div v-if="request.request_notes">
                                    <span class="font-semibold text-gray-900">Request Notes:</span>
                                    <span>{{ request.request_notes }}</span>
                                </div>
                                <div v-if="request.recce_notes">
                                    <span class="font-semibold text-gray-900">Recce Notes:</span>
                                    <span>{{ request.recce_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Specification:</span>
                                    <span>{{ request.quantity }} {{ request.quote_uom }} @ {{ request.quote_rate_per_uom }} Rs. per {{ request.quote_uom }}</span>
                                </div>
                            </div>

                            <!-- Actions Section -->
                            <div class="w-full md:w-3/12 p-4 flex flex-col justify-center items-center md:items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 gap-2">
                                <button v-if="request.request_status==='Shortlisted'" 
                                    @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" 
                                    class="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    View Request Details
                                </button>
                                <button v-if="request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Company Evaluator']):false" 
                                    @click="handleAttestManufacture(request,index)" 
                                    class="w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    Attest Manufacture
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="activeTab?.value === 'tab-delivery-requests'" class="tab-content w-full text-stone-500 text-sm p-4">
                <div v-if="materialRequests.delivery?materialRequests.delivery.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.delivery?materialRequests.delivery.length >0:false ">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width py-2 mb-4">Delivery Requests</h4>
                    <ul class="flex flex-col w-full gap-4" >
                        <li class="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300" v-for="(request,index) in materialRequests.delivery" :key="index">
                            
                            <!-- Header / ID Section -->
                            <div class="w-full md:w-3/12 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                                <h2 class="text-lg font-bold text-gray-800 break-words">{{ request.name }}</h2>
                                <h4 class="text-sm font-medium text-gray-600 mt-1">{{ request.poi_name }}</h4>
                            </div>

                            <!-- Details Section -->
                            <div class="w-full md:w-6/12 p-4 flex flex-col gap-2 text-sm text-gray-700">
                                <div>
                                    <span class="font-semibold text-gray-900">Material:</span>
                                    <span class="bg-red-300 rounded px-1">{{ request.request_material }}</span>
                                </div>
                                <div v-if="request.request_notes">
                                    <span class="font-semibold text-gray-900">Request Notes:</span>
                                    <span>{{ request.request_notes }}</span>
                                </div>
                                <div v-if="request.recce_notes">
                                    <span class="font-semibold text-gray-900">Recce Notes:</span>
                                    <span>{{ request.recce_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Specification:</span>
                                    <span>{{ request.quantity }} {{ request.quote_uom }} @ {{ request.quote_rate_per_uom }} Rs. per {{ request.quote_uom }}</span>
                                </div>
                            </div>

                            <!-- Actions Section -->
                            <div class="w-full md:w-3/12 p-4 flex flex-col justify-center items-center md:items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 gap-2">
                                <button v-if="request.request_status==='Shortlisted'" 
                                    @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" 
                                    class="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    View Request Details
                                </button>
                                <button v-if="request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Vendor Employee','Company Evaluator']):false" 
                                    @click="handleDelilveryItem(request,index)" 
                                    class="w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    Deliver Item
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="activeTab?.value === 'tab-delivery-attestation'" class="tab-content w-full text-stone-500 text-sm p-4">
                <div v-if="materialRequests.delivered_pending_attestion?materialRequests.delivered_pending_attestion.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.delivered_pending_attestion?materialRequests.delivered_pending_attestion.length >0:false ">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width py-2 mb-4">Delivered - To be Attested Requests</h4>
                    <ul class="flex flex-col w-full gap-4" >
                        <li class="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300" v-for="(request,index) in materialRequests.delivered_pending_attestion" :key="index">
                            
                            <!-- Header / ID Section -->
                            <div class="w-full md:w-3/12 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                                <h2 class="text-lg font-bold text-gray-800 break-words">{{ request.name }}</h2>
                                <h4 class="text-sm font-medium text-gray-600 mt-1">{{ request.poi_name }}</h4>
                            </div>

                            <!-- Details Section -->
                            <div class="w-full md:w-6/12 p-4 flex flex-col gap-2 text-sm text-gray-700">
                                <div v-if="request.request_notes">
                                    <span class="font-semibold text-gray-900">Request Notes:</span>
                                    <span>{{ request.request_notes }}</span>
                                </div>
                                <div v-if="request.recce_notes">
                                    <span class="font-semibold text-gray-900">Recce Notes:</span>
                                    <span>{{ request.recce_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Specification:</span>
                                    <span>{{ request.quantity }} {{ request.quote_uom }} @ {{ request.quote_rate_per_uom }} Rs. per {{ request.quote_uom }}</span>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div>
                                        <span class="font-semibold text-gray-900">Manufactured:</span>
                                        <span>{{ request.manufacture_quantity }} {{ request.quote_uom }}</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-900">Installed:</span>
                                        <span>{{ request.installation_quantity }} {{ request.quote_uom }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Actions Section -->
                            <div class="w-full md:w-3/12 p-4 flex flex-col justify-center items-center md:items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 gap-2">
                                <button v-if="request.request_status==='Shortlisted'" 
                                    @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" 
                                    class="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    View Request Details
                                </button>
                                <button v-if="request.request_status==='Shortlisted' && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Company Evaluator']):false" 
                                    @click="handleDeliveryAttestation(request,index)" 
                                    class="w-full md:w-auto text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    Attest Delivery
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="activeTab?.value === 'tab-service-requests'" class="tab-content w-full text-stone-500 text-sm p-4">
            <!-- <div v-if="dataValidated">Service Requests</div> -->
                <div v-if="materialRequests.completed_nopay_requests?materialRequests.completed_nopay_requests.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.completed_nopay_requests?materialRequests.completed_nopay_requests.length >0:false && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width py-2 mb-4">Completed - Yet not paid</h4>
                    <ul class="flex flex-col w-full gap-4" >
                        <li class="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300" v-for="(request,index) in materialRequests.completed_nopay_requests" :key="index">
                            
                            <!-- Header / ID Section -->
                            <div class="w-full md:w-3/12 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                                <h2 class="text-lg font-bold text-gray-800 break-words">{{ request.name }}</h2>
                                <h4 class="text-sm font-medium text-gray-600 mt-1">{{ request.poi_name }}</h4>
                            </div>

                            <!-- Details Section -->
                            <div class="w-full md:w-6/12 p-4 flex flex-col gap-2 text-sm text-gray-700">
                                <div v-if="request.request_notes">
                                    <span class="font-semibold text-gray-900">Request Notes:</span>
                                    <span>{{ request.request_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Specification:</span>
                                    <span>{{ request.quantity }} {{ request.quote_uom }} @ {{ request.quote_rate_per_uom }} Rs. per {{ request.quote_uom }}</span>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div>
                                        <span class="font-semibold text-gray-900">Manufactured:</span>
                                        <span>{{ request.manufacture_quantity }} {{ request.quote_uom }}</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-900">Installed:</span>
                                        <span>{{ request.installation_quantity }} {{ request.quote_uom }}</span>
                                    </div>
                                </div>
                                <div v-if="request.installation_notes">
                                    <span class="font-semibold text-gray-900">Installation Notes:</span>
                                    <span>{{ request.installation_notes }}</span>
                                </div>
                            </div>

                            <!-- Actions Section -->
                            <div class="w-full md:w-3/12 p-4 flex flex-col justify-center items-center md:items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 gap-2">
                                <button v-if="request.request_status==='Completed'" 
                                    @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" 
                                    class="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    View Request Details
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-show="activeTab?.value === 'tab-service-attestation'" class="tab-content w-full text-stone-500 text-sm p-4">
            <!-- <div v-if="dataValidated">Service Attestation</div> -->
                <div v-if="materialRequests.completed_pay_requests?materialRequests.completed_pay_requests.length===0:false" class="flex flex-col justify-center items-center">
                    <label class="block text-gray-700 font-bold mb-2">No requests found for this stage</label>
                </div>
                <div v-if="dataValidated && materialRequests.completed_pay_requests?materialRequests.completed_pay_requests.length >0:false && userVendorDetails.data.roles?containsAny(userVendorDetails.data.roles,['Vendor Admin','Company Evaluator']):false">
                    <h4 class="text-white unique-color-map font-bold rounded-lg text-center max-width py-2 mb-4">Completed - Payment Processed</h4>
                    <ul class="flex flex-col w-full gap-4" >
                        <li class="flex flex-col md:flex-row justify-between bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300" v-for="(request,index) in materialRequests.completed_pay_requests" :key="index">
                            
                            <!-- Header / ID Section -->
                            <div class="w-full md:w-3/12 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
                                <h2 class="text-lg font-bold text-gray-800 break-words">{{ request.name }}</h2>
                                <h4 class="text-sm font-medium text-gray-600 mt-1">{{ request.poi_name }}</h4>
                            </div>

                            <!-- Details Section -->
                            <div class="w-full md:w-6/12 p-4 flex flex-col gap-2 text-sm text-gray-700">
                                <div v-if="request.request_notes">
                                    <span class="font-semibold text-gray-900">Request Notes:</span>
                                    <span>{{ request.request_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Specification:</span>
                                    <span>{{ request.quantity }} {{ request.quote_uom }} @ {{ request.quote_rate_per_uom }} Rs. per {{ request.quote_uom }}</span>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div>
                                        <span class="font-semibold text-gray-900">Manufactured:</span>
                                        <span>{{ request.manufacture_quantity }} {{ request.quote_uom }}</span>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-900">Installed:</span>
                                        <span>{{ request.installation_quantity }} {{ request.quote_uom }}</span>
                                    </div>
                                </div>
                                <div v-if="request.installation_notes">
                                    <span class="font-semibold text-gray-900">Installation Notes:</span>
                                    <span>{{ request.installation_notes }}</span>
                                </div>
                                <div>
                                    <span class="font-semibold text-gray-900">Payment Details:</span>
                                    <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{{ request.payment_batch_id }}</span>
                                </div>
                            </div>

                            <!-- Actions Section -->
                            <div class="w-full md:w-3/12 p-4 flex flex-col justify-center items-center md:items-end bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200">
                                <button v-if="request.request_status==='Completed'" 
                                    @click="this.$router.push({name:'Request Details',params:{batchId:this.batchId,vendorId:this.vendorId,requestId:request.name}})" 
                                    class="w-full md:w-auto text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105">
                                    View Request Details
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
      </div>
</template>
<script>
import { ref } from "vue";
// import { initTabs } from 'david-ai';
import {Card, createResource,createListResource, Autocomplete} from 'frappe-ui';

import {sessionUser} from '@/data/session';
export default {
    name:"Batch",
    components: {
      Autocomplete
    },
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
        tabs: [
            { label: 'Start Recce', value: 'tab-recce-requests' },
            { label: 'Quotations', value: 'tab-quotation-requests' },
            { label: 'Under Review', value: 'tab-underreview-quotations' },
            { label: 'Attest Manufacture', value: 'tab-manufacture-attestation' },
            { label: 'Delivery', value: 'tab-delivery-requests' },
            { label: 'Attest Delivery', value: 'tab-delivery-attestation' },
            { label: 'Completed - Not Paid', value: 'tab-service-requests' },
            { label: 'Completed - Paid', value: 'tab-service-attestation' }
        ],
        activeTab: { label: 'Start Recce', value: 'tab-recce-requests' },
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
        // initTabs();
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
                    this.materialRequests.requotations= response.filter(request=>{return request.process_stage === 'Asked Vendor Resubmit Quotation' && request.request_status == 'Shortlisted'})
                    this.materialRequests.delivery=response.filter(request=>{return request.process_stage === 'Attested Manufacture Process' && request.request_status == 'Shortlisted'})
                    this.materialRequests.delivered_pending_attestion =response.filter(request=>{return request.process_stage === 'Delivered the Goods by Vendor' && request.request_status == 'Shortlisted'})
                    this.materialRequests.completed_nopay_requests=response.filter(request=>{return request.process_stage === 'Attested Completion of Job handled by Vendor' && request.request_status == 'Completed' && !request.payment_batch_id})
                    this.materialRequests.completed_pay_requests=response.filter(request=>{return request.process_stage === 'Attested Completion of Job handled by Vendor' && request.request_status == 'Completed' && request.payment_batch_id})
                    //this.materialRequests.service=requests.filter(request=>{return request.process_stage === 'Customer Feedback Submitted' && request.request_status == 'Shortlisted'})

                    this.presentBatchAnalytics = {
                        'name':this.batchId,
                        'allocated_requests':this.materialRequests.data.length,
                        'recce_requests':this.materialRequests.recce.length,
                        'quotation_requests':this.materialRequests.quotation.length + this.materialRequests.requotations.length,
                        'under_review_quotations':this.materialRequests.quotation_submitted.length,
                        'manufacturing_requests':this.materialRequests.manufacturing.length,
                        'delivery_requests':this.materialRequests.delivery.length,
                        'delivered_attestation':this.materialRequests.delivered_pending_attestion.length,
                        'completed_nopay_requests':this.materialRequests.completed_nopay_requests.length,
                        'completed_pay_requests':this.materialRequests.completed_pay_requests.length,
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