# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
#import tamilnadu_pos.geojson file
from shapely.geometry import Point
import geopandas as gpd
class CRMPOI(Document):
	#f= open("","r")
	df = gpd.read_file('assets/crm_extension/geo/india_pincodes.shp')
	#features= [feature for feature in gj['features'] if feature['properties']['state'] == 'Tamil Nadu']
	#print(features)
	#print(df)
	def before_save(self):
		pt= Point((self.longitude,self.latitude))
		polys = self.df.contains(pt)
		pol = self.df[polys]
		self.pincode = pol['pincode'].iloc[0]
		#print(pol)
	def validate(self):
		if not self.workmate_id:
			frappe.throw('Workmate ID is emplty')
	# pass