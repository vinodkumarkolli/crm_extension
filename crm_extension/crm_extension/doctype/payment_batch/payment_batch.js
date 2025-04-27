// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("Payment Batch", {
	refresh(frm) {
        if(frm.doc.docstatus === 1 && frm.doc.liable_amount > 0){
            frm.add_custom_button(__("Add Payment Detail"), function () {
                addPaymentDetail(frm)                   
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
function addPaymentDetail(frm){
    d = new frappe.ui.Dialog({
        title:'Add Payment Detail',
        fields:[
            {
                fieldname:'liable_amount',
                label:'Liable Amount',
                fieldtype:'Float',
                precison:2,
                default:frm.doc.liable_amount,
                reqd:1,
                read_only:1
            },
            {
                fieldname:'paid_amount',
                label:'Paid Amount',
                fieldtype:'Float',
                precison:2,
                default:frm.doc.paid_amount,
                reqd:1,
                read_only:1
            },
            {
                fieldname:'unpaid_amount',
                label:'Unpaid Amount',
                fieldtype:'Float',
                precison:2,
                default:frm.doc.liable_amount-frm.doc.paid_amount,
                reqd:1,
                read_only:1
            },
            {
                fieldname:'payment_transaction_id',
                label:'Payment Transaction ID',
                fieldtype:'Data',
                // default:frm.doc.quantity +' '+frm.doc.quote_uom+' @ '+frm.doc.quote_rate_per_uom+ " Rs. per "+frm.doc.quote_uom,
                reqd:1,
                // read_only:1
            },
            {
                fieldname:'payment_transaction_date',
                fieldtype:'Date',
                label:'Transaction Date',
                reqd: 1,
            },
            {
                fieldname:'payment_amount',
                fieldtype:'Float',
                label:'Payment Amount',
                reqd: 1,
                precision:2
            },
        ],
        primary_action:function(){
            // var new_quote_rate = d.get_value('new_quote_rate');
            frappe.call({
                method:"crm_extension.crm_extension.doctype.payment_batch.payment_batch.create_new_payment",
                args:{
                    "doc": frm.doc.name,
                    "pay_date":d.get_value('payment_transaction_date'),
                    "pay_det":d.get_value('payment_transaction_id'),
                    "pay_amt": d.get_value('payment_amount')
                },
                callback:function(r){
                    if(!r.exc){
                        //refresh_field('status');
                        d.hide();
                        frappe.msgprint({
                            title: __('Notification'),
                            indicator: 'green',
                            message: __('Payment Successfully added - '+r.message)
                        });
                    }
                }
            });
        }
    })
    d.show();
}