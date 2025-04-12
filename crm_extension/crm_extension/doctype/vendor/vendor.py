# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import requests

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