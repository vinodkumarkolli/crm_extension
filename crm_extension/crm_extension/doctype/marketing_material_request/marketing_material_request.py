# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now

class MarketingMaterialRequest(Document):
	def before_submit(self):
		self.requested_date = now()

@frappe.whitelist()
def get_doctype_meta(doctype):
	meta = frappe.get_meta(doctype)
	return meta.as_dict()