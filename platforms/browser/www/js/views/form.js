"use strict";
import m from 'mithril';

import { products } from "../models/products.js";
import { deliveries } from "../models/deliveries.js";

let form = {
    oninit: products.loadList,
    view: function() {
        return m("form.login-form", {
            onsubmit: function(event) {
                event.preventDefault();
                deliveries.save();
            } }, [
            m("label.input-label", "Amount:"),
            m("input.input[type=number][placeholder=Amount]", {
                oninput: function (e) {
                    deliveries.current.amount = e.target.value;
                },
                value: deliveries.current.amount
            }),
            m("label.input-label", "Date:"),
            m("input.input[type=date][placeholder=Date]", {
                oninput: function (e) {
                    deliveries.current.delivery_date = e.target.value;
                },
                value: deliveries.current.delivery_date
            }),
            m("label.input-label", "Comment:"),
            m("input.input[type=textarea][placeholder=Comment]", {
                oninput: function (e) {
                    deliveries.current.comment = e.target.value;
                },
                value: deliveries.current.comment
            }),
            m("label.input-label", "Item:"),
            m("select.input", {
                onchange: function (e) {
                    console.log(e.target.value.split(","));
                    deliveries.current.product_id = e.target.value.split(",")[0];
                    deliveries.current.product_name = e.target.value.split(",")[1];
                }
            },  products.list.map(function(product) {
                return m("option", {value: [product.id, product.name]},
                    product.id + " - " + product.name);
            })),
            m("input[type=submit][value=Save].button.form-button", "Spara")
        ]);
    }
};

export { form };
