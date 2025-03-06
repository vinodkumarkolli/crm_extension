import { createListResource } from 'frappe-ui';
export const pois = createListResource({
    doctype:"CRM POI",
    fields:["*"],
    auto: true,
    pageLength: "None",
    onSuccess(data){
        console.log(data)
    },
    transform(data){
        return data
    }
})