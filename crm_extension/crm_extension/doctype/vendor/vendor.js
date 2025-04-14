// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("Vendor", {
	setup:function(frm) {
        frm.set_query('user','vendor_users',function(){
            return{
                query:"crm_extension.crm_extension.doctype.vendor.vendor.get_users_list",
            }
        })
	},
    refresh: function(frm){
        // frappe.msgprint(frappe.session.user)
        frappe.call({
            method:"frappe.client.get",
            args:{
                doctype:'Marketing Material Type',
                name: frm.doc.marketing_material_type
            },
            callback(r){
                material_doc = r.message;
                if(material_doc.manufacture)
                {
                    frm.add_custom_button(__("Create a Batch"), function () {
                        openBatchPopup(frm,"Create")         
                    },__("Batch"))
                    frm.add_custom_button(__("Batch Hold"), function () {
                        openBatchPopup(frm,"Hold")         
                    },__("Batch"))
                    frm.add_custom_button(__("Batch Close"), function () {
                        openBatchPopup(frm,"Close")         
                    },__("Batch"))
                    frm.add_custom_button(__("Clear Unused batches"), function () {
                        openBatchPopup(frm,"Clear")         
                    },__("Batch"))
                }
            }
        })
        
    }
});
function openBatchPopup(frm,mode){
switch(mode){
    case "Create":
        frappe.warn('Are you sure you want to proceed?',
            'This will put on hold any active batch with this vendor',
            () => {
                // action to perform if Proceed is selected
                frappe.call({
                    method:"crm_extension.crm_extension.doctype.vendor.vendor.create_new_batch",
                    args:{
                        vendorId:frm.doc.name,
                    },
                    callback(r){
                        frappe.msgprint({
                            title: __('Notification'),
                            indicator: 'green',
                            message: __(r.message+ ' - Batch created successfully')
                        });
                        frm.refresh_field('batch_process_items')
                    }
                })
            },
            'Proceed',
            true // Sets dialog as minimizable
        )
    break;
    case "Clear":
        frappe.warn('Are you sure you want to proceed?',
            'This will clear all unused Batch Ids that are created',
            () => {
                // action to perform if Proceed is selected
                frappe.call({
                    method:"crm_extension.crm_extension.doctype.vendor.vendor.clear_unused_batches",
                    args:{
                        vendorId:frm.doc.name,
                    },
                    callback(r){
                        if(!r.exc){
                            frappe.msgprint({
                                title: __('Notification'),
                                indicator: 'green',
                                message: __(r.message+ ' - Batches cleaned successfully')}
                            )
                        }
                    }
                })
            },
            'Proceed',
            true // Sets dialog as minimizable
        )
}
}