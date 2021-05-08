import m from "mithril";

import { orders } from "../models/orders.js";
import { invoicesModel } from "../models/invoices.js";

var groupVisible = false;

var log = function () {
    console.log("group is now visible");
};

let inForm = {
    oninit: orders.loadList,
    view: function () {
        return m("main.container", [
            m("h1", "Ny leverans"),
            m("form.login-form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    //console.log(orders.current);
                    //console.log(orders.total);
                    groupVisible = false;
                    invoicesModel.createInvoice(orders.current.id, orders.total);
                    orders.update();
                }
            }, [
                m("label.input-label", "Orders: "),
                m("select.input", {
                    onchange: function (e) {
                        //console.log(e.target.value.split(","));
                        orders.save(e.target.value.split(",")[0]);
                        groupVisible = true;
                    }
                },  orders.list.map(function(order) {
                    return m("option", {value: [order.id, order.name]},
                        order.name);
                })),
                m("input[type=submit][value=Submit].button.form-button", "Submit")
            ]),
            groupVisible ? m.fragment ({oninit: log}, [
                m("div.invoice",
                    m("tr",
                        m("p", orders.current.id),
                        m("p", orders.current.name),
                        m("p", orders.current.address),
                        m("p", orders.current.zip),
                        m("p", orders.current.city),
                        m("p", orders.current.country),
                        m("p", orders.current.status)
                    )
                ),

                m("div.deliveries", orders.current_items.map(function (order) {
                    return m("div.invoice", [
                        m("tr",
                            m("p", order.name),
                            m("p", order.article_number),
                            m("p", "Amount: ", order.amount),
                            m("p", order.description),
                            m("p", "Price: ", order.price),
                            m("p", "Stock: ", order.stock),
                            m("p", orderSpecifiers(JSON.parse(order.specifiers)))
                        )
                        //m("p", "Width: ", JSON.parse(order.specifiers).width),
                        //m("p", "Diameter: ", JSON.parse(order.specifiers).diameter),
                        //m("button", {onclick: function() {}}, "Form")
                    ]);
                }))
            ]) : null
        ]);
    },
    test: function () {
        //console.log(orders.current);
    }
};

function orderSpecifiers(e) {
    //console.log(e);
    if (e.length != null && e.width != null) {
        return [
            m("p", "Length: ", e.length),
            m("p", "Width: ", e.width)
        ];
    }
    return m("p", "Diameter: ", e.diameter);
    // no longer triggers a redraw when the div is clicked
}


export { inForm };
