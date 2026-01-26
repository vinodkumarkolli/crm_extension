import frappe

@frappe.whitelist()
def get_current_user_roles():
    if frappe.session.user == "Guest":
        return []
    return frappe.get_roles(frappe.session.user)
