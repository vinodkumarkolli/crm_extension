// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("POI Merge Request", {
	refresh(frm) {
        if(frm.doc.docstatus === 1){
            frappe.call({
                method:'frappe.client.get_list',
                args:{
                    doctype:'POI Merge Request',
                    filters:{'from_poi':frm.doc.to_poi},
                    fields:['name']
                },
                callback:function(r){
                    if(r.message.length>0){
                        // console.log(r.message[0].name)
                        let msg = 'Superceded by Merge Requests : '
                        for(let i=0;i<r.message.length;i++){
                            if(i==r.message.length-1){
                                msg+=r.message[i].name+". "
                            }
                            else{
                                msg+=r.message[i].name+", "
                            }
                            
                        }
                        msg+= "You can't do any action on this until they are deleted from the system"
                        frappe.msgprint(msg)
                    }
                    else{
                        if(frm.doc.request_status!='Approved')
                            {
                                addApproveButton(frm);
                            }
                            if(frm.doc.request_status!='Hold'){
                                addHoldButton(frm);
                            }
                            addRejectButton(frm);   
                    }
                }
            })
            
            //Hiding Cancel Button
            frm.page.btn_secondary.hide();
        }
	},
    before_cancel:function(frm){
        //cancelMergeRequest(frm);
        frappe.throw("You cannot cancel this merge request. Please Reject or Hold the merge request.")
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
