# Copyright (c) 2025, Vinod Kumar K and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
from frappe.utils import now
import frappe
class PaymentBatch(Document):
	@property
	def liable_amount(self):
		query = """SELECT SUM(manufacture_quantity * CAST(quote_rate_per_uom AS DOUBLE)) AS liable_cost FROM `tabMarketing Material Request` WHERE payment_batch_id='{a}' and docstatus=1""".format(a=self.name)
		requests =frappe.db.sql(query,as_dict=True)
		return requests[0].liable_cost
	def before_save(self):
		self.created_on = now()
	def on_submit(self):
		self.is_active = 1
		self.save()

@frappe.whitelist()
def togglePayBatchState(doc):
	pay_batch_doc = frappe.get_doc('Payment Batch',doc)
	if pay_batch_doc.is_active == 1:
		pay_batch_doc.is_active =0
		pay_batch_doc.save()
		return "Payment Batch is successfully Inactivated"
	elif pay_batch_doc.is_active == 0:
		pay_batch_doc.is_active =1
		pay_batch_doc.save()
		return "Payment Batch is successfully Activated"
	else:
		frappe.throw('Invalid Document State')
