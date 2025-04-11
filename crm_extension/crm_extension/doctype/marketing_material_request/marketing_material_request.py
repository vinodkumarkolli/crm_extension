# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import now
import json
class MarketingMaterialRequest(Document):
	def before_submit(self):
		self.requested_date = now()

@frappe.whitelist()
def get_doctype_meta(doctype):
	meta = frappe.get_meta(doctype)
	return meta.as_dict()
@frappe.whitelist()
def approve_request(doc,comment):
	frappe.msgprint(doc)
@frappe.whitelist()
def hold_request(doc,comment):
	pass
@frappe.whitelist()
def reject_request(doc,comment):
	pass