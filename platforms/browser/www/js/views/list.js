"use strict";
import m from 'mithril';

import { deliveries } from "../models/deliveries.js";
//import { form } from "./form.js";

let list = {
    oninit: deliveries.getDeliveries,

    view: function() {
        return [ m("h1", "Inleverans"),
            m(m.route.Link, {
                selector: "button",
                href: "/form",
                class: "form-button"
            }, "Add delivery"),
            m("div.deliveries", deliveries.currentDeliveries.map(function (delivery) {
                return m("div.invoice", [
                    m("p", delivery.product_name + " - " + delivery.amount + "st"),
                    m("p", delivery.delivery_date),
                    m("p", delivery.comment)
                    //m("button", {onclick: function() {}}, "Form")
                ]);
            }))
        ];
    }
};

export { list };
