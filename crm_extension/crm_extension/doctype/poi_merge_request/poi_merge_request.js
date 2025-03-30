// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("POI Merge Request", {
	refresh(frm) {
        if(frm.doc.docstatus === 1){
            if(frm.doc.request_status!='Approved')
            {
                addApproveButton(frm);
            }
            if(frm.doc.request_status!='Hold'){
                addHoldButton(frm);
            }
            addRejectButton(frm);
        }
	},
    on_cancel(frm){
        cancelMergeRequest(frm);
    }
});
function cancelMergeRequest(frm){
    var d = new frappe.ui.Dialog({
        title:"Reject Comment",
        fields:[{label:'Comment',fieldname:'reject_comment',fieldtype:'Small Text' ,reqd:true}],
        primary_action:function(){
            var reject_comment=d.get_value('reject_comment');
            frappe.call({
                method:'crm_extension.crm_extension.doctype.poi_merge_request.poi_merge_request.reject_merge',
                args:{
                    doc:frm.doc.name,
                    reject_comment:reject_comment
                },
                callback:function(r){
                    refresh_field('docstatus');
                    refresh_field('request_status')
                },
                success:function(r){
                    frappe.msgprint({message:"Merge is successfully Rejected & Cancelled",indicator:"green"})
                },
                error(r){
                    frappe.throw(r.message)
                }
            })
            d.hide();
        }
    })
    d.show();
    
}
function addRejectButton(frm){
    frm.add_custom_button(__('Reject'), 
    function(){
        cancelMergeRequest(frm)
    } 
    ,__("Approvals")
    )
}
function addHoldButton(frm){
    frm.add_custom_button(__('Hold'), function() {
        var d = new frappe.ui.Dialog({
            title:"Hold Comment",
            fields:[{label:'Comment',fieldname:'hold_comment',fieldtype:'Small Text' ,reqd:true}],
            primary_action:function(){
                var hold_comment=d.get_value('hold_comment');
                frappe.call({
                    method:'crm_extension.crm_extension.doctype.poi_merge_request.poi_merge_request.hold_merge',
                    args:{
                        doc:frm.doc.name,
                        hold_comment:hold_comment
                    },
                    callback:function(r){
                        refresh_field('docstatus');
                        refresh_field('request_status')
                    },
                    success:function(r){
                        frappe.msgprint({message:"Merge is successfully put on Hold",indicator:"green"})
                    },
                    error(r){
                        frappe.throw(r.message)
                    }
                })
                d.hide();
            }
        })
        d.show();
        // frappe.msgprint({message:"This is a test message",indicator:"green"})
    },__("Approvals")
    )
}
function addApproveButton(frm){
    frm.add_custom_button(__('Approve'), function() {
        var d = new frappe.ui.Dialog({
            title:"Approval Comment",
            fields:[{label:'Comment',fieldname:'approval_comment',fieldtype:'Small Text' ,reqd:true}],
            primary_action:function(){
                var approval_comment=d.get_value('approval_comment');
                frappe.call({
                    method:'crm_extension.crm_extension.doctype.poi_merge_request.poi_merge_request.approve_merge',
                    args:{
                        doc:frm.doc.name,
                        approval_comment:approval_comment
                    },
                    callback:function(r){
                        refresh_field('docstatus');
                        refresh_field('request_status')
                    },
                    success:function(r){
                        frappe.msgprint({message:"Merge is successful",indicator:"green"})
                    },
                    error(r){
                        frappe.throw(r.message)
                    }
                })
                d.hide();
            }
        })
        d.show();
        // frappe.msgprint({message:"This is a test message",indicator:"green"})
    },__("Approvals")
    )
}
