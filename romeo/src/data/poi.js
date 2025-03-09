import { createResource } from 'frappe-ui';
export const pois = createResource({
    url: 'frappe.client.get_list',
    params: {
      doctype: 'CRM POI',
      fields: ["*"],
      limit_page_length: 'None'
    }
  })
  