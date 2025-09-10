// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("CRM POI Notify", {
	refresh(frm) {
		if (frm.doc.docstatus === 1) {
			// Cancel logic implemented in Python file (on_cancel method)
			// When Cancel is clicked, doc.crm_poi's poi_status is restored to "Active" and a comment is added
			// Add a custom button "Request Closure" if doc.notification_type = 'Closure' and doc.docstatus === 1 (submitted)
			if (frm.doc.notification_type === 'Closure' && frm.doc.docstatus === 1 && frm.doc.is_validated === 0) {
				frm.add_custom_button(__('Close POI'), function() {
					//before executing the below method call, prompt the user, if he is sure to close the poi. if yes clicked then execute the below method call else dont call
					frappe.confirm(
						__('Are you sure you want to close this POI? This action cannot be undone.'),
						function() {
							// User clicked "Yes"
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
						},
						function() {
							// User clicked "No" or closed the dialog
							// Do nothing
						}
					);
				}, __("Actions"));
			}
		}
	},
});
