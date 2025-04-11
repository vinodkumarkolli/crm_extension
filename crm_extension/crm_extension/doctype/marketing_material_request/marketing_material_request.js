// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("Marketing Material Request", {
	refresh(frm) {
        if(frm.doc.docstatus === 1){
            frm.add_custom_button(__("Approve"), function () {
                openApprovalsPopup(frm,"Approve")         
            },__("Approvals"))
            frm.add_custom_button(__("Hold"), function () {
                openApprovalsPopup(frm,"Hold")         
            },__("Approvals"))
            frm.add_custom_button(__("Reject"), function () {
                openApprovalsPopup(frm,"Reject")
            },__("Approvals"))
            //Hiding Cancel Button
            frm.page.btn_secondary.hide();
        }
	},
});
function openApprovalsPopup(frm,mode){
    var d;
    switch(mode){
        case "Approve":
            d = new frappe.ui.Dialog({
                title:'Approve Comment',
                fields:[{fieldname:'reason_for_approval',fieldtype:'Small Text',label:'Comment'},{fieldname:'vendor',fieldtype:'Link',label:'Vendor',options:'Vendor'}],
                primary_action:function(){
                    var approve_comment = d.get_value('reason_for_approval');
                    frappe.call({
                        method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.approve_request",
                        args:{
                            "doc": frm.doc.name,
                            "comment":approve_comment,
                        },
                        callback:function(r){
                            if(!r.exc){
                                refresh_field('status');
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
                fields:[{fieldname:'reason_for_hold',fieldtype:'Small Text',label:'Comment'}],
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
                                refresh_field('status');
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
                fields:[{fieldname:'reason_for_rejection',fieldtype:'Small Text',label:'Comment'}],
                primary_action: function(){
                    var reject_comment = d.get_value('reason_for_rejection');
                    frappe.call({
                        method:"crm_extension.crm_extension.doctype.marketing_material_request.marketing_material_request.hold_request",
                        args:{
                            "doc": frm.doc.name,
                            "comment":reject_comment
                        },
                        callback:function(r){
                            if(!r.exc){
                                refresh_field('status');
                            }
                        }
                    })
                }
            });
            d.show();
            break;
    }
}