import m from "mithril";

import { baseUrl, apiKey } from "../vars.js";

import { auth } from "./auth.js";

let invoicesModel = {
    url: `${baseUrl}/invoices`,
    apiKey: apiKey,
    invoices: [],
    invoiceAdd: {},
    getInvoices: function() {
        m.request({
            url: `${invoicesModel.url}?api_key=${apiKey}`,
            method: "GET",
            headers: {
                'x-access-token': auth.token
            }
        }).then(function(result) {
            console.log(result.data);
            invoicesModel.invoices = result.data;
        });
    },
    createInvoice: function(e, t) {
        invoicesModel.invoiceAdd.api_key = apiKey;
        invoicesModel.invoiceAdd.order_id = e;
        invoicesModel.invoiceAdd.total_price = t;
        console.log(invoicesModel.invoiceAdd);
        m.request({
            url: `${invoicesModel.url}`,
            method: "POST",
            body: invoicesModel.invoiceAdd,
            headers: {
                'x-access-token': auth.token
            }
        });
    }
};

export { invoicesModel };
