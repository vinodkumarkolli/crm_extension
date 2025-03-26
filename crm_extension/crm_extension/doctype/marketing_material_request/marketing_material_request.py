# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class MarketingMaterialRequest(Document):
	def before_save(self):
		print(self.poi_id.location_name)
