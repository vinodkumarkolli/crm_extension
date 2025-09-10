# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class CRMPOINotify(Document):
	# implement after_submit hook where, self.notification_type == 'Closure', a comment is added to self.crm_poi of "Edit" type = Status changed to <b>Closure Requested</b>
	def on_submit(self):
		# Debugging: Log that after_submit is being called
		if self.notification_type == 'Closure':
			try:
				# Add comment to CRM POI
				comment_doc = frappe.get_doc({
					'doctype': 'Comment',
					'comment_type': 'Edit',
					'reference_doctype': 'CRM POI',
					'reference_name': self.crm_poi,
					'content': 'Status changed to <b>Closure Requested</b>'
				})
				comment_doc.insert(ignore_permissions=True)
			except Exception as e:
				frappe.log_error(f"Error in after_submit for CRM POI Notify {self.name}: {str(e)}")
				frappe.log_error(f"Error traceback: {frappe.get_traceback()}")
				raise

	def on_cancel(self):
		if self.notification_type == 'Closure':
			# Restore CRM POI's poi_status to "Active" and add a comment
			frappe.db.set_value('CRM POI', self.crm_poi, 'poi_status', 'Active')
			
			# Add comment to CRM POI
			frappe.get_doc({
				'doctype': 'Comment',
				'comment_type': 'Edit',
				'reference_doctype': 'CRM POI',
				'reference_name': self.crm_poi,
				'content': 'Status changed to <b>Active</b>'
			}).insert(ignore_permissions=True)

	@frappe.whitelist()
	def close_poi(self):
		if self.notification_type == 'Closure' and self.is_validated == 0:
			# Update CRM POI status to Closed
			frappe.db.set_value('CRM POI', self.crm_poi, 'poi_status', 'Closed')
			
			# Add comment to CRM POI
			frappe.get_doc({
				'doctype': 'Comment',
				'comment_type': 'Comment',
				'reference_doctype': 'CRM POI',
				'reference_name': self.crm_poi,
				'content': 'Status changed to <b>Closed</b>'
			}).insert(ignore_permissions=True)
			
			# Set is_validated to 1
			self.is_validated = 1
			self.save()
			

@frappe.whitelist()
def close_poi_by_name(docname):
	doc = frappe.get_doc('CRM POI Notify', docname)
	return doc.close_poi()