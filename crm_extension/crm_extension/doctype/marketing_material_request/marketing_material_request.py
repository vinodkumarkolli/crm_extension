# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now
import math
class MarketingMaterialRequest(Document):
	def before_submit(self):
		self.requested_date = now()
		self.request_status = "Submitted"
		self.installation_status ="Not Shortlisted"
		request_material = frappe.get_doc("Marketing Material Type",self.request_material)
		self.require_proofs = request_material.require_proofs

@frappe.whitelist()
def get_doctype_meta(doctype):
	meta = frappe.get_meta(doctype)
	return meta.as_dict()
@frappe.whitelist()
def approve_request(doc,comment,vendor):
	vendor_doc = frappe.get_doc("Vendor",vendor)
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.vendor = vendor
	req_doc.vendor_name = vendor_doc.vendor_name
	req_doc.vendor_location = vendor_doc.latitude + ","+ vendor_doc.longitude
	req_doc.distance_bw_poi_and_vendor = haversine(vendor_doc.latitude,vendor_doc.longitude,req_doc.latitude,req_doc.longitude)
	req_doc.request_status = "Shortlisted"
	req_doc.installation_status = "Shortlisted"
	req_doc.admin_notes = comment
	req_doc.approved_declined_hold_date= now()
	req_doc.save()
	frappe.db.commit()
@frappe.whitelist()
def hold_request(doc,comment):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.request_status = "On Hold"
	req_doc.admin_notes = comment
	req_doc.approved_declined_hold_date= now()
	req_doc.save()
	frappe.db.commit()
@frappe.whitelist()
def reject_request(doc,comment):
	req_doc = frappe.get_doc("Marketing Material Request",doc)
	req_doc.request_status = "Declined"
	req_doc.admin_notes = comment
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

    distance = R * c
    return distance