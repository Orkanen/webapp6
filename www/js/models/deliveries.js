"use strict";

import m from 'mithril';

let deliveries = {
    url: "https://lager.emilfolino.se/v2/",
    apiKey: "79ec5a01a507b1090a62166a71ee2ea1",

    currentDeliveries: [],

    getDeliveries: function() {
        return m.request({
            method: "GET",
            url: `${deliveries.url}/deliveries?api_key=79ec5a01a507b1090a62166a71ee2ea1`
        }).then(function(result) {
            console.log(result);
            deliveries.currentDeliveries = result.data;
        });
    },

    addDelivery: function() {
        console.log("Delivery made");
    },
    product: {},
    current: {},
    save: function() {
        console.log(deliveries.current);
        deliveries.current.api_key = deliveries.apiKey;
        return m.request({
            method: "POST",
            url: `${deliveries.url}deliveries`,
            body: deliveries.current
        }).then(function() {
            return m.request({
                method: "GET",
                url: `${deliveries.url}products/${deliveries.current.product_id}
                ?api_key=${deliveries.apiKey}`
            }).then(function(result) {
                let temp1 = parseInt(deliveries.current.amount);
                let temp2 = parseInt(result.data.stock);

                deliveries.product.stock = temp1 + temp2;
                deliveries.product.id = result.data.id;
                deliveries.product.name = result.data.name;
                deliveries.product.api_key = deliveries.apiKey;
            }).then(function() {
                return m.request({
                    method: "PUT",
                    url: `${deliveries.url}products`,
                    body: deliveries.product
                });
            });
        }).then(function() {
            deliveries.product = {};
            deliveries.current = {};
            m.route.set("/deliveries");
        });
    }
};

export { deliveries };
