# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now, random_string
from frappe.utils.file_manager import save_file
import math
import base64
class MarketingMaterialRequest(Document):
	@property
	def quote_price(self):
		return self.quantity * float(self.quote_rate_per_uom)
	def before_submit(self):
		self.requested_date = now()
		self.request_status = "Submitted"
		#self.installation_status ="Not Shortlisted"
		request_material = frappe.get_doc("Marketing Material Type",self.request_material)
		#self.add_comment("Created","Request for "+self.request_material+" has been submitted by "+self.request_raised_by)
		self.manufacture = request_material.manufacture

@frappe.whitelist()
def get_doctype_meta(doctype):
	meta = frappe.get_meta(doctype)
	return meta.as_dict()
@frappe.whitelist()
def custom_comment(doc,process_stage,user):
	try:
		req_doc = frappe.get_doc("Marketing Material Request",doc)
		req_doc.add_comment("Comment","Process Stage changed to "+process_stage+" by "+user+" on "+now())
		return True
	except Exception as e:
		return False
@frappe.whitelist()
def approve_request(doc,comment,vendor):
	vendor_doc = frappe.get_doc("Vendor",vendor)
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.vendor = vendor
	req_doc.vendor_name = vendor_doc.vendor_name
	req_doc.vendor_location = vendor_doc.latitude + ","+ vendor_doc.longitude
	req_doc.distance_bw_poi_and_vendor = haversine(vendor_doc.latitude,vendor_doc.longitude,req_doc.latitude,req_doc.longitude)
	req_doc.request_status = "Shortlisted"
	#req_doc.installation_status = "Shortlisted"
	req_doc.approval_comment = comment
	req_doc.hold_comment = ""
	req_doc.add_comment("Comment","The request has been approved & shortlisted with following comments <b>"+comment+"</b>"+" on "+now()) 
	req_doc.approved_declined_hold_date= now()
	req_doc.save()
	if req_doc.manufacture:
		request_material = frappe.get_doc("Marketing Material Type",req_doc.request_material)
		req_doc.process_stage = request_material.procurement_steps[0].procurement_stage
		#req_doc.process_stage = 
	else:
		req_doc.process_stage = "Procurement"
	req_doc.save()
	frappe.db.commit()
@frappe.whitelist()
def hold_request(doc,comment):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.request_status = "On Hold"
	req_doc.approval_comment = ""
	req_doc.hold_comment = comment
	req_doc.add_comment("Comment","Request has been put on hold becoz of <b>"+comment+"</b>"+" on "+now())
	req_doc.approved_declined_hold_date= now()
	req_doc.save()
	frappe.db.commit()
@frappe.whitelist()
def reject_request(doc,comment):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.request_status = "Declined"
	req_doc.add_comment("Comment","Request has been rejected becoz of <b>"+comment+"</b>"+" on "+now())
	# req_doc.admin_notes = comment
	req_doc.approved_declined_hold_date= now() 
	req_doc.save()
	frappe.db.commit()
	req_doc.cancel()

@frappe.whitelist()
def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the distance between two points on Earth using the Haversine formula.

    Args:
      lat1: Latitude of the first point in degrees.
      lon1: Longitude of the first point in degrees.
      lat2: Latitude of the second point in degrees.
      lon2: Longitude of the second point in degrees.

    Returns:
      Distance in kilometers.
    """
    R = 6371  # Radius of Earth in kilometers

    lat1_rad = math.radians(float(lat1))
    lon1_rad = math.radians(float(lon1))
    lat2_rad = math.radians(float(lat2))
    lon2_rad = math.radians(float(lon2))

    delta_lat = lat2_rad - lat1_rad
    delta_lon = lon2_rad - lon1_rad

    a = math.sin(delta_lat / 2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = round(R*c,2)
    return distance

@frappe.whitelist()
def mark_request_as_completed(doc,completed_date,completion_reason):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.request_status = "Completed"
	req_doc.completed_date = completed_date
	req_doc.add_comment("Comment","Request has been marked as completed "+completion_reason+" on "+now())
	req_doc.save()
	frappe.db.commit()

@frappe.whitelist()
def success_completion_request(doc):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.request_status = "Completed"
	req_doc.completed_date = now()
	req_doc.add_comment("Comment","Request has been marked as completed successfully on "+now())
	req_doc.save()
	frappe.db.commit()
@frappe.whitelist()
def allocate_batch(doc,batch_id):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.batch_id = batch_id
	req_doc.process_stage = "Batch id Allocated"
	req_doc.add_comment("Comment","Batch Id allocated # - "+batch_id+" on "+now())
	req_doc.save()
	frappe.db.commit()

@frappe.whitelist()
def upload_images_to_folder(image,folder,doctype,docname,df):
	# for image in images:
	header, encoded = image.split(',', 1)
	content = base64.b64decode(encoded)
	# content = base64.decode(image)
	sf = save_file(
		fname=random_string(8)+".jpg",
		content=content,
		dt=doctype,
		dn=docname,
		df=df,
		folder=folder,
		is_private=False
		)
	file_doc = frappe.get_doc("File", sf.name)
	url = file_doc.file_url
	# print(url)
	return url

@frappe.whitelist()
def modify_batch(doc,batch_id,process_stage):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.batch_id = batch_id
	req_doc.process_stage = process_stage
	req_doc.add_comment("Comment","Batch modified # - "+batch_id+" on "+now())
	req_doc.save()
	frappe.db.commit()
@frappe.whitelist()
def approve_quotation(doc):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.quote_accepted_by = frappe.session.user
	req_doc.quote_accepted_on = now()
	req_doc.process_stage ='Accepted Quotation'
	req_doc.add_comment("Comment",
					 "Quotation accepted by {a} on {b}. __Details:__ {c} {d} @ Rs.{e} /- each unit, costing Rs. {f}.".format(a=frappe.session.user,b=now(),c=req_doc.quantity,d=req_doc.quote_uom,e=req_doc.quote_rate_per_uom,f=req_doc.quote_price)
					 )
	req_doc.save()
	frappe.db.commit()
@frappe.whitelist()
def assign_paymentbatch(doc,batch_id):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.payment_batch_id = batch_id
	req_doc.save()
@frappe.whitelist()
def modify_quote_rate(doc,new_rate):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.quote_rate_per_uom = new_rate
	req_doc.save()