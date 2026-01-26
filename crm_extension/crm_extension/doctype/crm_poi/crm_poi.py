# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from shapely.geometry import Point
import geopandas as gpd
import requests
class CRMPOI(Document):
	df = gpd.read_file('assets/crm_extension/geo/india_pincodes.shp')
	nominatim = 'https://nominatim.openstreetmap.org/reverse'
	nominatim_headers= {
		'user-agent': 'Mozilla/5.0 (X11; Linux i686; rv:136.0) Gecko/20100101 Firefox/136.0'
	}
	# def before_save(self):
	# 	params = {
	# 		'format': 'geocodejson',
    #         'lat': self.latitude,
    #         'lon': self.longitude
	# 	}
	# 	res = requests.get(url= self.nominatim,headers=self.nominatim_headers, params = params)
	# 	if res.status_code != 200:
	# 		frappe.msgprint('Unable to fetch Address for the Coordinates')
	# 	else:
	# 		#print(res.json()['features'][0]['properties']['geocoding']['label'])
	# 		self.custom_reverse_geocoded_address = res.json()['features'][0]['properties']['geocoding']['label']
	# 	pt= Point((self.longitude,self.latitude))
	# 	polys = self.df.contains(pt)
	# 	pol = self.df[polys]
	# 	length = len(pol.index)
	# 	if length == 1:
	# 		self.pincode = pol['pincode'].iloc[0]
	# 		self.custom_district = pol['district'].iloc[0]
	# 	elif length == 0:
	# 		frappe.throw('Location is not serviceable and cannot be added')
	# 	else:
	# 		frappe.throw('Multiple pincodes are fetched for the location. Please adjust the location properly')
	def validate(self):
		if not (self.workmate_id or self.fieldassist_id or self.fieldmate_id):
			frappe.throw('Legacy Details are missing')
	# pass