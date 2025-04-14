# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import requests
from frappe.utils import now,random_string

class Vendor(Document):
	nominatim = 'https://nominatim.openstreetmap.org/reverse'
	nominatim_headers= {
		'user-agent': 'Mozilla/5.0 (X11; Linux i686; rv:136.0) Gecko/20100101 Firefox/136.0'
	}
	def before_save(self):
		params = {
			'format': 'geocodejson',
            'lat': self.latitude,
            'lon': self.longitude
		}
		res = requests.get(url= self.nominatim,headers=self.nominatim_headers, params = params)
		if res.status_code != 200:
			frappe.msgprint('Unable to fetch Address for the Coordinates')
		else:
			self.address = res.json()['features'][0]['properties']['geocoding']['label']
@frappe.whitelist()
@frappe.validate_and_sanitize_search_inputs
def get_users_list(doctype, txt, searchfield, start, page_len, filters):
	query = "SELECT DISTINCT parent FROM `tabHas Role` WHERE `tabHas Role`.role = ('{a}')".format(a= 'Lamp User')
	userList = frappe.db.sql(query,as_dict=True)
	userEmail = convert_objects_to_strings(userList,'parent')
	sql_array_string = '\',\''.join(map(str, userEmail))
	return frappe.db.sql("""SELECT email,full_name from `tabUser` WHERE `tabUser`.email IN ('{a}')""".format(a=sql_array_string))

@frappe.whitelist()
def get_vendors_for_session_user(user):
	query ="""SELECT DISTINCT parent from `tabVendor User` WHERE user = '{a}' AND parenttype = 'Vendor'""".format(a=user)
	vendorList = convert_objects_to_strings(frappe.db.sql(query, as_dict=True),'parent')
	sql_array_string = '\',\''.join(map(str, vendorList))
	vendors = frappe.db.sql("""SELECT * FROM `tabVendor` WHERE name IN ('{a}')""".format(a=sql_array_string), as_dict=True)
	return vendors

@frappe.whitelist()
def evaluate_user_for_vendor(vendor,user):
	query = """SELECT * FROM `tabVendor User` WHERE parent='{a}' AND user='{b}' AND parenttype = 'Vendor'""".format(a=vendor,b=user)
	permResult = frappe.db.sql(query, as_dict=True)
	roles = []
	for perm in permResult:
		roles.append(perm.user_role)
	query = """SELECT * from `tabVendor` WHERE name='{a}'""".format(a=vendor)
	vendorResult = frappe.db.sql(query, as_dict=True)[0]
	if vendorResult:
		return {'vendor':vendorResult, 'roles': roles}
	else:
		frappe.throw("No such vendor exists")

@frappe.whitelist()
def create_new_batch(vendorId):
	vendor_doc = frappe.get_doc('Vendor',vendorId)
	for batch in vendor_doc.batch_process_items:
		if batch.batch_state == "Active":
			batch.batch_state = "On Hold"
			batch.save(ignore_permissions=True)
	row = vendor_doc.append('batch_process_items', {})
	row.creation_date = now()
	row.batch_state = "Active"
	row.batch_identifier = random_string(length=8)
	row.save()
	return row.name
@frappe.whitelist()
def put_batch_onhold(batch,vendorId):
	vendodor_doc = frappe.get_doc('Vendor',vendorId)
	for batchProcess in vendodor_doc.batch_process_items:
		if batchProcess.name == batch:
			batchProcess.batch_state = "On Hold"
			batchProcess.save()
@frappe.whitelist()
def clear_unused_batches(vendorId):
	cleaned_batch_ids = []
	vendor_doc = frappe.get_doc('Vendor',vendorId)
	for batch in vendor_doc.batch_process_items:
		#TODO: The logic belod has to be changed to find mapped Material Requests and If no mapping, then delete them
		# instead of deleting all batches that are not completed
		query = """SELECT name FROM `tabMarketing Material Request` WHERE batch_id='{a}' and docstatus=1""".format(a=batch.name)
		requests =frappe.db.sql(query,as_dict=True)
		if len(requests) == 0:
			batch.delete()
			cleaned_batch_ids.append(batch.name)
	vendor_doc.save()
	return cleaned_batch_ids
def convert_objects_to_strings(data, key):
  """
  Converts an array of objects to an array of strings based on a key.

  Args:
    data: A list of dictionaries (objects).
    key: The key to extract the string value from each object.

  Returns:
    A list of strings.
  """
  return [str(item[key]) for item in data]