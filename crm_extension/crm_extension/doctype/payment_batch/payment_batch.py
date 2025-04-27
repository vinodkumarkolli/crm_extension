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
	@property
	def paid_amount(self):
		# query = """SELECT SUM(payment_amount) AS paid_amount from `tabVendor Payment` WHERE parent='{a}""".format(a= self.name)
		query = """SELECT SUM(payment_amount) AS paid_amount from `tabVendor Payment`  WHERE parent='{a}'""".format(a= self.name)
		requests =frappe.db.sql(query,as_dict=True)
		return requests[0].paid_amount
	def before_save(self):
		self.created_on = now()
	def on_submit(self):
		self.is_active = 1
		self.save()
@frappe.whitelist()
def create_new_payment(doc,pay_date,pay_det,pay_amt):
	pay_batch_doc = frappe.get_doc('Payment Batch',doc)
	row = pay_batch_doc.append('payment_details',{})
	row.payment_transaction_id = pay_det
	row.payment_amount = pay_amt
	row.payment_date = pay_date
	row.save()
	# pay_batch_doc.save()
	return row.name
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
