// Copyright (c) 2025, Vinod Kumar K and contributors
// For license information, please see license.txt

frappe.ui.form.on("Vendor", {
	setup:function(frm) {
        frm.set_query('user','vendor_users',function(){
            return{
                query:"crm_extension.crm_extension.doctype.vendor.vendor.get_users_list",
            }
        })
	},
    // refresh: function(frm){
    //     // frappe.msgprint(frappe.session.user)
    //     frappe.call({
    //         method:"crm_extension.crm_extension.doctype.vendor.vendor.get_vendors_for_session_user",
    //         args:{
    //             "user":frappe.session.user,
    //         },
    //         callback:(r)=>{
                
    //         }
    //     })
    // }
});
