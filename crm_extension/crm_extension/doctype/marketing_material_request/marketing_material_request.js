// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("Marketing Material Request", {
	refresh(frm) {
        // Fetch and display past requests
        if(frm.doc.poi_id) {
            fetchPastRequests(frm);
        }
        
        if(frm.doc.docstatus === 1){
            if(frm.doc.request_status === "Submitted" || frm.doc.request_status === "On Hold" ){
                frm.add_custom_button(__("Approve"), function () {
                    openApprovalsPopup(frm,"Approve")         
                },__("Approvals"))
            }
            if(frm.doc.request_status === "Submitted" || frm.doc.request_status === "Shortlisted" ){
                frm.add_custom_button(__("Hold"), function () {
                    openApprovalsPopup(frm,"Hold")         
                },__("Approvals"))
            }
            if(frm.doc.request_status =="Shortlisted" && (frm.doc.process_stage == "Procurement"|| frm.doc.process_stage == "Purchase Order Placement" || frm.doc.process_stage == "Batch id Allocated") && frm.doc.recce_done_by){
                if(frm.doc.quote_price){
                    if(frm.doc.quote_accepted_by){
                        if(frm.doc.manufacture_verified_by){
                            if(frm.doc.installed_by){
                                frm.add_custom_button(__("Push to Installed Board"),function(){
                                    frappe.call({
                                    method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.change_process_status",
                                    args:{
                                        "doc": frm.doc.name,
                                        "process_stage":"Delivered the Goods by Vendor",
                                        "user": frappe.session.user
                                    },
                                    callback:function(r){
                                        if(!r.exc){
                                            //refresh_field('status');
                                            frappe.msgprint("Process Stage successfully changed to - Delivered the Goods by Vendor")
                                        }
                                    }
                                });
                                },__("Approvals"))
                            }
                            else{
                                frm.add_custom_button(__("Push to Verified Manufacture"),function(){
                                    frappe.call({
                                    method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.change_process_status",
                                    args:{
                                        "doc": frm.doc.name,
                                        "process_stage":"Attested Manufacture Process",
                                        "user": frappe.session.user
                                    },
                                    callback:function(r){
                                        if(!r.exc){
                                            //refresh_field('status');
                                            frappe.msgprint("Process Stage successfully changed to - Attested Manufacture Process")
                                        }
                                    }
                                });
                                },__("Approvals"))
                            }
                        }
                        else{
                            frm.add_custom_button(__("Push to Accepted Quotation"),function(){
                                frappe.call({
                                    method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.change_process_status",
                                    args:{
                                        "doc": frm.doc.name,
                                        "process_stage":"Accepted Quotation",
                                        "user": frappe.session.user
                                    },
                                    callback:function(r){
                                        if(!r.exc){
                                            //refresh_field('status');
                                            frappe.msgprint("Process Stage successfully changed to - Accepted Quotation")
                                        }
                                    }
                                });
                            },__("Approvals"))
                        }
                    }
                    else{
                        frm.add_custom_button(__("Push to Submitted Quotation"),function(){
                            frappe.call({
                            method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.change_process_status",
                            args:{
                                "doc": frm.doc.name,
                                "process_stage":"Submitted Quotation for Requirements",
                                "user": frappe.session.user
                            },
                            callback:function(r){
                                if(!r.exc){
                                    //refresh_field('status');
                                    frappe.msgprint("Process Stage successfully changed to - Submitted Quotation for Requirements")
                                }
                            }
                        });
                        },__("Approvals"))
                    }
                }
                else{
                    frm.add_custom_button(__("Push to Evaluating Requirements"),function(){
                        frappe.call({
                            method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.change_process_status",
                            args:{
                                "doc": frm.doc.name,
                                "process_stage":"Evaluating POI Exact Requirements",
                                "user": frappe.session.user
                            },
                            callback:function(r){
                                if(!r.exc){
                                    //refresh_field('status');
                                    frappe.msgprint("Process Stage successfully changed to - Evaluating POI Exact Requirements")
                                }
                            }
                        });
                    },__("Approvals"))
                }
            }
            if(frm.doc.request_status === "On Hold"){
                frm.add_custom_button(__("Reject"), function () {
                    openApprovalsPopup(frm,"Reject")
                },__("Approvals"))
            }
            if(frm.doc.request_status === "Completed" || frm.doc.request_status === "Shortlisted" || frm.doc.request_status === "Vendor Dispute" ){
                frm.add_custom_button(__("Raise a Dispute"), function () {
                    
                },__("Vendors"))
                if(frm.doc.quote_rate_per_uom && !frm.doc.payment_batch_id){
                    frm.add_custom_button(__("Change quotation price"), function () {
                        modifyQuotationPrice(frm)
                    },__("Vendors"))
                }
            }
            if(frm.doc.request_status === "Completed" && !frm.doc.payment_batch_id){
                frm.add_custom_button(__("Assign Payment Batch"), function () {
                    assignPaymentBatch(frm)
                },__("Payments"))
            }
            if(frm.doc.request_status === 'Shortlisted' && frm.doc.vendor){
                //Procurement Stages Options
                if(frm.doc.process_stage === 'Procurement'){
                    
                    frm.add_custom_button(__("Mark Request as Completed"), function () {
                        openCompletionFormPopup(frm)
                        // frappe.msgprint({message:__('Please select the vendor from the list below to shortlist'),indicator:'yellow'})
                    },__("Vendors"))
                    //TODO: Move below code to else block

                }
                else{
                    if(!frm.doc.batch_id){
                        frm.add_custom_button(__("Allocate Batch"), function () {
                            openBatchFormPopup(frm,"new")
                            // frappe.msgprint({message:__('Please select the vendor from the list below to shortlist'),indicator:'yellow'})
                        },__("Batch"))
                    }
                    else{
                        frm.add_custom_button(__("Modify Batch"), function () {
                            openBatchFormPopup(frm,"modify")
                            // frappe.msgprint({message:__('Please select the vendor from the list below to shortlist'),indicator:'yellow'})
                        },__("Batch"))
                    }
                }
                if(frm.doc.process_stage ==='Submitted Quotation for Requirements' && frm.doc.batch_id){
                    frappe.msgprint({message:__('A quotation is submitted for <b>'+frm.doc.quantity+' '+frm.doc.quote_uom+'</b> with price: <b>'+frm.doc.quote_price+'</b>.<br>'
                        +'<b>Request Notes: </b>'+frm.doc.request_notes+'<br>'
                        +'<b>Approval Comment: </b>'+frm.doc.approval_comment+'<br>'
                        +'<b>Recce Notes: </b>'+frm.doc.recce_notes+'<br>'
                        +'<br>Please check appropriate documents before approving</b>'),indicator:'green'})
                    frm.add_custom_button(__("Approve Quotation"), function () {
                        approveQuotation(frm)                   
                    },__("Approvals"))
                }

            }
            //Hiding Cancel Button
            frm.page.btn_secondary.hide();
        }
	},
});

function assignPaymentBatch(frm){
    d = new frappe.ui.Dialog({
        title:'Assign Payment Batch',
        fields:[
            {
                fieldname:'vendor_name',
                label:'Vendor Name',
                fieldtype:'Data',
                default:frm.doc.vendor_name,
                reqd:1,
                read_only:1
            },
            {
                fieldname:'payment_batch',
                fieldtype:'Link',
                label:'Payment Batch',
                options:'Payment Batch', 
                reqd: 1,
                get_query : function(){
                    return {
                        filters:{
                            vendor:frm.doc.vendor,
                            is_active:1
                        }
                    };
                }
            }
        ],
        primary_action:function(){
            var payment_batch = d.get_value('payment_batch');
            frappe.call({
                method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.assign_paymentbatch",
                args:{
                    "doc": frm.doc.name,
                    "batch_id":payment_batch
                },
                callback:function(r){
                    if(!r.exc){
                        //refresh_field('status');
                        d.hide();
                    }
                }
            });
        }
    })
    d.show();
}

function modifyQuotationPrice(frm){
    d = new frappe.ui.Dialog({
        title:'Modify Quotation Price',
        fields:[
            {
                fieldname:'quoatation_spec',
                label:'Quotation Spec',
                fieldtype:'Small Text',
                default:frm.doc.quantity +' '+frm.doc.quote_uom+' @ '+frm.doc.quote_rate_per_uom+ " Rs. per "+frm.doc.quote_uom,
                reqd:1,
                read_only:1
            },
            {
                fieldname:'new_quote_rate',
                fieldtype:'Float',
                label:'New Quotation Rate',
                reqd: 1,
                precision:2
            }
        ],
        primary_action:function(){
            var new_quote_rate = d.get_value('new_quote_rate');
            frappe.call({
                method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.modify_quote_rate",
                args:{
                    "doc": frm.doc.name,
                    "new_rate":new_quote_rate
                },
                callback:function(r){
                    if(!r.exc){
                        //refresh_field('status');
                        d.hide();
                    }
                }
            });
        }
    })
    d.show();
}

function approveQuotation(frm){
    frappe.warn('Are you sure you want to approve the quotation?',
        'Details: <b>'+frm.doc.quantity+' '+frm.doc.quote_uom+'</b> with price: <b>'+frm.doc.quote_price+'</b>.<br>'
    +'<b>Request Notes: </b>'+frm.doc.request_notes+'<br>'
    +'<b>Approval Comment: </b>'+frm.doc.approval_comment+'<br>'
    +'<b>Recce Notes: </b>'+frm.doc.recce_notes+'<br>',
        () => {
            // action to perform if Proceed is selected
            frappe.call({
                method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.approve_quotation",
                args:{
                    doc:frm.doc.name,
                },
                callback(r){
                    if(!r.exc){
                        frappe.msgprint({
                            title: __('Notification'),
                            indicator: 'green',
                            message: __('Quotation approved successfully!')
                        });
                    }
                }
            })
        },
        'Proceed',
        true // Sets dialog as minimizable
    )
}

function openBatchFormPopup(frm,mode){
    switch(mode){
        case "new":
            frappe.call({
                method:'frappe.client.get',
                args:{
                    doctype:'Vendor',
                    name:frm.doc.vendor
                },
                callback:(r)=>{
                    if(!r.exc){
                        let batch_options = r.message.batch_process_items.filter((el)=> {return el.batch_state ==='Active'}).map(obj => {return {label:obj['creation_date'],value:obj['name'],description:'ID: '+obj['batch_identifier']+'  State: '+obj['batch_state']}})
                        if(batch_options.length>1){
                            frappe.throw(__('There are multiple active batches available for this vendor. Please process the batches first'))
                        }
                        else if(batch_options.length===1){
                            const d = new frappe.ui.Dialog({
                                title:'Allocate Batch',
                                fields:[{
                                    fieldname:'batch_id',
                                    label:'Select Batch',
                                    fieldtype:'Autocomplete',
                                    options:batch_options,
                                    reqd:1,
                                }],
                                primary_action: function(){
                                    let batch_id = d.get_value('batch_id')
                                    frappe.call({
                                        method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.allocate_batch",
                                        args:{
                                            "doc": frm.doc.name,
                                            "batch_id":batch_id
                                        },
                                        callback:function(r){
                                            if(!r.exc){
                                                //refresh_field('status');
                                                d.hide();
                                            }
                                        }
                                    })
                                }
                            })
                            d.show()
                        }
                        else{
                            frappe.throw(__('No active batches found for this vendor'))
                        }
                    }
                    
                }
            })
            break;
        case "modify":
            frappe.call({
                method:'frappe.client.get',
                args:{
                    doctype:'Vendor',
                    name:frm.doc.vendor
                },
                callback:(r)=>{
                    if(!r.exc){
                        let batch_options = r.message.batch_process_items.filter((el)=> {return el.batch_state ==='Active'}).map(obj => {return {label:obj['creation_date'],value:obj['name'],description:'ID: '+obj['batch_identifier']+'  State: '+obj['batch_state']}})
                        if(batch_options.length>1){
                            frappe.throw(__('There are multiple active batches available for this vendor. Please process the batches first'))
                        }
                        else if(batch_options.length===1){
                            let options = [];
                            if(frm.doc.process_stage ==='Batch id Allocated'){
                                options.push('Batch id Allocated')
                            }
                            else{
                                options.push('Batch id Allocated')
                                options.push('Evaluating POI Exact Requirements')
                            }
                            const d = new frappe.ui.Dialog({
                                title:'Modify Batch',
                                fields:[{
                                    fieldname:'modify_batch_id',
                                    label:'Select Batch',
                                    fieldtype:'Autocomplete',
                                    options:batch_options,
                                    reqd:1,
                                },
                                {
                                    fieldname:'process_stage',
                                    label:'New Process Stage',
                                    fieldtype:'Link',
                                    options:'Material Procurement Stage',
                                    reqd:1,
                                    get_query : function(){
                                        return {
                                            filters:[['stage_name','In',options]]
                                        };
                                    }
                                }
                                ],
                                primary_action: function(){
                                    const batch_id = d.get_value('modify_batch_id')
                                    if(batch_id === frm.doc.batch_id){
                                        d.hide();
                                        frappe.throw(__('You are trying to assign same batch'))
                                    }
                                    else{
                                        frappe.call({
                                            method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.allocate_batch",
                                            args:{
                                                "doc": frm.doc.name,
                                                "batch_id":batch_id
                                            },
                                            callback:function(r){
                                                if(!r.exc){
                                                    //refresh_field('status');
                                                    d.hide();
                                                }
                                            }
                                        })  
                                    }
                                }
                            })
                            d.show()
                        }
                        else{
                            frappe.throw(__('No active batches found for this vendor'))
                        }
                        
                    }
                }
            })
            break;
    }
}

function openCompletionFormPopup(frm){
    const d = new frappe.ui.Dialog({
        title:'Completion Form',
        fields:[
            {
                fieldname:'completed_date',
                fieldtype:'Date',
                reqd:1,
                label:'Completed Date'
            },
            {
                fieldname:'completion_reason',
                fieldtype:'Small Text',
                label:'Reason for Completion',
                reqd:1
            }
        ],
        primary_action:function(){
            var completed_date = d.get_value('completed_date')
            var completion_reason = d.get_value('completion_reason')
            frappe.call({
                method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.mark_request_as_completed",
                args:{
                    "doc": frm.doc.name,
                    "completed_date":completed_date,
                    "completion_reason":completion_reason
                },
                callback:function(r){
                    if(!r.exc){
                        //refresh_field('status');
                        d.hide();
                    }
                }
            })
        }
    })
    d.show();
}

function openApprovalsPopup(frm,mode){
    var d;
    switch(mode){
        case "Approve":
            d = new frappe.ui.Dialog({
                title:'Approve Comment',
                fields:[
                    {
                        fieldname:'reason_for_approval',
                        fieldtype:'Data',
                        label:'Comment',
                        reqd: 1
                    },
                    {
                        fieldname:'vendor',
                        fieldtype:'Link',
                        label:'Vendor',
                        options:'Vendor', 
                        reqd: 1,
                        get_query : function(){
                            return {
                                filters:{
                                    marketing_material_type:frm.doc.request_material,
                                    active:1
                                }
                            };
                        }
                    }
                ],
                primary_action:function(){
                    var approve_comment = d.get_value('reason_for_approval');
                    frappe.call({
                        method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.approve_request",
                        args:{
                            "doc": frm.doc.name,
                            "comment":approve_comment,
                            "vendor":d.get_value('vendor')
                        },
                        callback:function(r){
                            if(!r.exc){
                                //refresh_field('status');
                                d.hide();
                            }
                        }
                    });
                }
            });
            d.show();
            break;
        case "Hold":
            d = new frappe.ui.Dialog({
                title: 'Hold Comment',
                fields:[{fieldname:'reason_for_hold',fieldtype:'Small Text',label:'Comment',reqd:1}],
                primary_action: function(){
                    var hold_comment = d.get_value('reason_for_hold');
                    frappe.call({
                        method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.hold_request",
                        args:{
                            "doc": frm.doc.name,
                            "comment":hold_comment
                        },
                        callback:function(r){
                            if(!r.exc){
                                //refresh_field('status');
                                d.hide();
                            }
                        }
                    })
                }
            });
            d.show();
            break;
        case "Reject":
            d = new frappe.ui.Dialog({
                title: 'Reject Comment',
                fields:[{fieldname:'reason_for_rejection',fieldtype:'Small Text',label:'Comment',reqd:1}],
                primary_action: function(){
                    var reject_comment = d.get_value('reason_for_rejection');
                    frappe.call({
                        method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.reject_request",
                        args:{
                            "doc": frm.doc.name,
                            "comment":reject_comment
                        },
                        callback:function(r){
                            if(!r.exc){
                                //refresh_field('status');
                                d.hide();
                            }
                        }
                    })
                }
            });
            d.show();
            break;
    }
}

function fetchPastRequests(frm) {
    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Marketing Material Request",
            filters: {
                poi_id: frm.doc.poi_id,
                docstatus: 1, // Only submitted documents
                name: ["!=", frm.doc.name] // Exclude current document
            },
            fields: ["name", "request_material", "creation", "request_status", "request_notes"],
            limit_page_length: 10 // Limit to 10 most recent requests
        },
        callback: function(r) {
            if (!r.exc && r.message) {
                // Get material types for filtering
                if (r.message.length > 0) {
                    var material_names = [];
                    r.message.forEach(function(request) {
                        if (request.request_material && material_names.indexOf(request.request_material) === -1) {
                            material_names.push(request.request_material);
                        }
                    });
                    
                    if (material_names.length > 0) {
                        frappe.call({
                            method: "frappe.client.get_list",
                            args: {
                                doctype: "Marketing Material Type",
                                filters: {
                                    name: ["in", material_names]
                                },
                                fields: ["name", "material_name"]
                            },
                            callback: function(mat_r) {
                                if (!mat_r.exc && mat_r.message) {
                                    // Filter for Frontlit Boards or Backlit Boards
                                    var valid_materials = mat_r.message
                                        .filter(function(m) { 
                                            return m.material_name === "Frontlit Boards" || m.material_name === "Backlit Boards";
                                        })
                                        .map(function(m) { return m.name; });
                                    
                                    // Filter requests by valid material types
                                    var filtered_requests = r.message.filter(function(request) {
                                        return valid_materials.indexOf(request.request_material) !== -1;
                                    });
                                    
                                    // Format and display the requests
                                    displayPastRequests(frm, filtered_requests);
                                } else {
                                    displayPastRequests(frm, []);
                                }
                            }
                        });
                    } else {
                        displayPastRequests(frm, []);
                    }
                } else {
                    displayPastRequests(frm, []);
                }
            } else {
                displayPastRequests(frm, []);
            }
        }
    });
}

function displayPastRequests(frm, requests) {
    var html = "";
    
    if (requests.length > 0) {
        html += "<div style='border: 1px solid #d1d8dd; padding: 10px; margin-bottom: 10px; background-color: #f0f8ff;'>";
        html += "<h4 style='margin-top: 0;'>Past Marketing Material Requests</h4>";
        html += "<table class='table table-bordered'>";
        html += "<thead><tr><th>Request ID</th><th>Material</th><th>Date</th><th>Status</th><th>Notes</th></tr></thead>";
        html += "<tbody>";
        
        requests.forEach(function(request) {
            html += "<tr>";
            html += "<td>" + request.name + "</td>";
            html += "<td>" + (request.request_material || "") + "</td>";
            html += "<td>" + frappe.datetime.str_to_user(request.creation) + "</td>";
            html += "<td>" + request.request_status + "</td>";
            html += "<td>" + (request.request_notes || "") + "</td>";
            html += "</tr>";
        });
        
        html += "</tbody></table>";
        html += "</div>";
    } else {
        html = "<div style='border: 1px solid #d1d8dd; padding: 10px; margin-bottom: 10px; background-color: #fff5f5;'>";
        html += "<h4 style='margin-top: 0;'>Past Marketing Material Requests</h4>";
        html += "<p>No past requests found for this POI with Frontlit Boards or Backlit Boards.</p>";
        html += "</div>";
    }
    
    frm.set_df_property("past_request_notes", "options", html);
}