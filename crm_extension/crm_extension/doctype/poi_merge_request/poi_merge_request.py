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
		
def change_subrequest_execution_status(subrequest,status):
	subrequest.execution_status=status
def execute_merge_subrequest(merge_doc,child_subrequest):
	if child_subrequest.sub_request_type == 'CRM POI':
		subrequest_doc = frappe.get_doc('CRM POI',child_subrequest.audit_document)
		subrequest_doc.parent_poi_latest = merge_doc.to_poi
		subrequest_doc.parent_poi_name = merge_doc.to_poi_location_name
		subrequest_doc.poi_status='Merged'
		subrequest_doc.save()
		frappe.db.commit()
	elif child_subrequest.sub_request_type == 'Marketing Material Request':
		subrequest_doc = frappe.get_doc('Marketing Material Request',child_subrequest.audit_document)
		to_poi = frappe.get_doc('CRM POI',merge_doc.to_poi)
		subrequest_doc.poi_id = to_poi.name
		subrequest_doc.poi_name = to_poi.location_name
		subrequest_doc.crm_lead_id = to_poi.crm_lead_id
		subrequest_doc.crm_lead_name = to_poi.crm_lead_name
		subrequest_doc.field_assist_id = to_poi.fieldassist_id
		subrequest_doc.latitude = to_poi.latitude
		subrequest_doc.longitude = to_poi.longitide
		subrequest_doc.save()
		frappe.db.commit()
	else:
		frappe.throw("Invalid Sub Request Type")

def hold_merge_subrequests(child_subrequest):
	if child_subrequest.sub_request_type == 'CRM POI':
		if child_subrequest.past_parent_poi == child_subrequest.audit_document:
			subrequest_doc = frappe.get_doc('CRM POI',child_subrequest.audit_document)
			subrequest_doc.poi_status='Merge Request Raised'
			subrequest_doc.parent_poi_latest=''
			subrequest_doc.parent_poi_name=''
			subrequest_doc.save()
			frappe.db.commit()
	elif child_subrequest.sub_request_type == 'Marketing Material Request':
		pass
	else:
		frappe.throw("Invalid Sub Request Type")
def reject_merge_subrequests(child_subrequest):
	if child_subrequest.sub_request_type == 'CRM POI':
		if child_subrequest.past_parent_poi == child_subrequest.audit_document:
			subrequest_doc = frappe.get_doc('CRM POI',child_subrequest.audit_document)
			subrequest_doc.poi_status='Active'
			subrequest_doc.parent_poi_latest=''
			subrequest_doc.parent_poi_name=''
			subrequest_doc.save()
			frappe.db.commit()
	elif child_subrequest.sub_request_type == 'Marketing Material Request':
		pass
	else:
		frappe.throw("Invalid Sub Request Type")
@frappe.whitelist()
def approve_merge(doc,approval_comment):
	merge_doc= frappe.get_doc('POI Merge Request',doc)
	try:
		for i in merge_doc.tab_subrequests:
			execute_merge_subrequest(merge_doc,i)
			change_subrequest_execution_status(i,"Executed")
	except Exception as e:
		print(e)
		return {"error":e}
	merge_doc.request_status="Approved"
	merge_doc.admin_comments=approval_comment
	merge_doc.workflow_state="Approved"
	merge_doc.save()
	frappe.db.commit()
@frappe.whitelist()
def hold_merge(doc,hold_comment):
	merge_doc= frappe.get_doc('POI Merge Request',doc)
	try:
		for i in merge_doc.tab_subrequests:
			hold_merge_subrequests(i)
			change_subrequest_execution_status(i,"Held")	
	except Exception as e:
		print(e)
		return {"error":e}
	merge_doc.request_status="Hold"
	merge_doc.admin_comments=hold_comment
	merge_doc.workflow_state="On Hold"
	merge_doc.save()
	frappe.db.commit()
	return {"success":"Success"}
@frappe.whitelist()
def reject_merge(doc,reject_comment):
	merge_doc= frappe.get_doc('POI Merge Request',doc)
	try:
		for i in merge_doc.tab_subrequests:
			reject_merge_subrequests(i)
			change_subrequest_execution_status(i,"Cancelled")	
	except Exception as e:
		print(e)
		return {"error":e}
	merge_doc.request_status="Rejected"
	merge_doc.admin_comments=reject_comment
	merge_doc.workflow_state="Rejected"
	merge_doc.save()
	frappe.db.commit()
	try:
		merge_doc.cancel()
	except Exception as e:
		print(e)
		return {"error":e}