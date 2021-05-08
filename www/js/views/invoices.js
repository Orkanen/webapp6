import m from "mithril";

import { invoicesModel } from "../models/invoices.js";

let invoiceTable = {
    view: function () {
        return [
            m("h1", "Inleverans"),
            m("table.table.table-striped.table-stacked",
                invoicesModel.invoices.map(function(invoice) {
                    return m("thead.invoice", [
                        m("td[data-title='Namn']", invoice.name),
                        m("td[data-title='Pris']", invoice.total_price),
                        m("td[data-title='Fakturadatum']", invoice.creation_date),
                        m("td[data-title='Förfallodatum']", invoice.due_date)
                    ]);
                })),

            m(m.route.Link, {
                selector: "button",
                href: "/inform",
                class: "form-button"
            }, "Add Invoice")
        ];
    }
};

let noData = {
    view: function() {
        return [m("p", "Det har inga fakturor!"),
            m(m.route.Link, {
                selector: "button",
                href: "/inform",
                class: "form-button"
            }, "Add Invoice")
        ];
    }
};

let invoices = {
    oninit: invoicesModel.getInvoices,
    view: function () {
        return [
            m("h1", "Fakturor"),
            invoicesModel.invoices.length > 0 ? m(invoiceTable) : m(noData)
        ];
    }
};

export { invoices };
