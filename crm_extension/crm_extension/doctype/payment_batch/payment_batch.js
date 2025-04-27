// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("Payment Batch", {
	refresh(frm) {
        if(frm.doc.docstatus === 1 && frm.doc.liable_amount > 0){
            frm.add_custom_button(__("Add Payment Detail"), function () {
                approveQuotation(frm)                   
            },__("Payments"))

        }
        if(frm.doc.docstatus === 1 && frm.doc.is_active===1){
            frm.add_custom_button(__("Mark Payment Batch - Inactive"), function () {
                frappe.call({
                    method:'crm_extension.crm_extension.doctype.payment_batch.payment_batch.togglePayBatchState',
                    args:{
                        doc:frm.doc.name
                    },
                    callback(r){
                        if(!r.exc){
                            console.log(r)
                            frappe.msgprint({
                                title: __('Notification'),
                                indicator: 'green',
                                message: __(r.message)
                            });
                        }
                    }
                })                  
            })
        }
        if(frm.doc.docstatus === 1 && frm.doc.is_active===0){
            frm.add_custom_button(__("Mark Payment Batch - Active"), function () {
                frappe.call({
                    method:'crm_extension.crm_extension.doctype.payment_batch.payment_batch.togglePayBatchState',
                    args:{
                        doc:frm.doc.name
                    },
                    callback(r){
                        if(!r.exc){
                            console.log(r)
                            frappe.msgprint({
                                title: __('Notification'),
                                indicator: 'green',
                                message: __(r.message)
                            });
                        }
                    }
                })                  
            })
        }
	},
});
