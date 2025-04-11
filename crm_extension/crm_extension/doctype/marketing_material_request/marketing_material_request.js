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
                        get_query:function(){
                            return {
                                filters:{
                                    'marketing_material_type':frm.doc.marketing_material_type
                                }
                            }
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