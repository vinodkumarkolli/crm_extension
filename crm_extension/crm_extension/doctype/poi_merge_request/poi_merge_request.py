# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now


class POIMergeRequest(Document):
	def before_submit(self):
		linkedPOIs = frappe.db.get_list('CRM POI',filters={'parent_poi_latest':self.from_poi},fields=["name","parent_poi_latest"])
		if len(linkedPOIs) >0 :
			for i in linkedPOIs:
				self.append('tab_subrequests',{'sub_request_type':'CRM POI','audit_document':i.name,'past_parent_poi':i.parent_poi_latest,'latest_parent_poi':self.to_poi,'modified_date':now(),'execution_status':'Planned'})
		try:
			self.append('tab_subrequests',{'sub_request_type':'CRM POI','audit_document':self.from_poi,'past_parent_poi':self.from_poi,'latest_parent_poi':self.to_poi,'modified_date':now(),'execution_status':'Planned'})
		except Exception as e:
			print(e)
			return {"error":e}
		return {"success":"Success"}
	def on_submit(self):
		self.request_status="Submitted"
		frappe.db.set_value('CRM POI', self.from_poi,'poi_status','Merge Request Raised')
		return {"success":"Success"}
		
@frappe.whitelist()
def approve_merge(doc,approval_comment):
	merge_doc= frappe.get_doc('POI Merge Request',doc)
	try:
		frappe.db.set_value('CRM POI', merge_doc.from_poi,'parent_poi_latest',merge_doc.to_poi)
		frappe.db.set_value('CRM POI',merge_doc.from_poi,'parent_poi_name',merge_doc.to_poi_location_name)
		frappe.db.set_value('CRM POI', merge_doc.from_poi,'poi_status','Merged')
		merge_doc.request_status="Approved"
		merge_doc.admin_comments=approval_comment
		merge_doc.save()
		frappe.db.commit()
		return {"success":"Success"}
	except Exception as e:
		print(e)
		return {"error":e}

@frappe.whitelist()
def hold_merge(doc,hold_comment):
	merge_doc= frappe.get_doc('POI Merge Request',doc)
	try:
		frappe.db.set_value('CRM POI', merge_doc.from_poi,'poi_status','Merge Request Raised')
		frappe.db.set_value('CRM POI', merge_doc.from_poi,'parent_poi_latest',"")
		frappe.db.set_value('CRM POI',merge_doc.from_poi,'parent_poi_name',"")
		merge_doc.request_status="Hold"
		merge_doc.admin_comments=hold_comment
		merge_doc.save()
		frappe.db.commit()
		return {"success":"Success"}
	except Exception as e:
		print(e)
		return {"error":e}
@frappe.whitelist()
def reject_merge(doc,reject_comment):
	merge_doc= frappe.get_doc('POI Merge Request',doc)
	merge_doc.request_status="Rejected"
	merge_doc.admin_comments=reject_comment
	merge_doc.save()
	frappe.db.set_value('CRM POI', merge_doc.from_poi,'poi_status','Active')
	frappe.db.set_value('CRM POI', merge_doc.from_poi,'parent_poi_latest',"")
	frappe.db.set_value('CRM POI',merge_doc.from_poi,'parent_poi_name',"")
	frappe.db.commit()
	
	try:
		merge_doc.cancel()
	except Exception as e:
		print(e)
		return {"error":e}
def test():
	frappe.msgprint("test")