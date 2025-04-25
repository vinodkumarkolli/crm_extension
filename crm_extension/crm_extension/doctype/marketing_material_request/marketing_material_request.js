// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("Marketing Material Request", {
	refresh(frm) {
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
            if(frm.doc.request_status === "On Hold"){
                frm.add_custom_button(__("Reject"), function () {
                    openApprovalsPopup(frm,"Reject")
                },__("Approvals"))
            }
            if(frm.doc.request_status === "Completed" || frm.doc.request_status === "Shortlisted" || frm.doc.request_status === "Vendor Dispute" ){
                frm.add_custom_button(__("Raise a Dispute"), function () {
                    
                },__("Vendors"))
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
                    frappe.msgprint({message:__('A quotation is submitted for <b>'+frm.doc.quantity+' '+frm.doc.quote_uom+'</b> with price: <b>'+frm.doc.quotation_price+'</b>.<br>'
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
function approveQuotation(frm){
    frappe.warn('Are you sure you want to approve the quotation?',
        'Details: <b>'+frm.doc.quantity+' '+frm.doc.quote_uom+'</b> with price: <b>'+frm.doc.quotation_price+'</b>.<br>'
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
                            message: __('Quotation approve successfully!')
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