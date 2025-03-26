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
