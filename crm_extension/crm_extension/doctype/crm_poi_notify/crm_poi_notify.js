// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("CRM POI Notify", {
	refresh(frm) {
		if (frm.doc.docstatus === 1) {
			// Cancel logic implemented in Python file (on_cancel method)
			// When Cancel is clicked, doc.crm_poi's poi_status is restored to "Active" and a comment is added
			//add a custom button "Close POI", if doc.notification_type = 'Closure' and doc.is_validated = 0
	       	if (frm.doc.notification_type === 'Closure' && frm.doc.is_validated === 0) {
	           frm.add_custom_button(__('Close POI'), function() {
	               frappe.call({
	                   method: 'crm_extension.crm_extension.doctype.crm_poi_notify.crm_poi_notify.close_poi_by_name',
	                   args: {
	                       docname: frm.doc.name
	                   },
	                   callback: function(r) {
	                       if (!r.exc) {
	                           frm.reload_doc();
	                       }
	                   }
	               });
	           },__("Approvals"));
	       	}
		}
	},
});
