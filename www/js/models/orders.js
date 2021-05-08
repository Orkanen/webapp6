"use strict";

import m from 'mithril';

import { baseUrl, apiKey } from "../vars.js";

let orders = {
    url: baseUrl,
    apiKey: apiKey,

    list: [],
    current_items: [],
    total: 0,
    current: {},

    loadList: function() {
        return m.request({
            method: "GET",
            url: `${orders.url}/orders?api_key=${orders.apiKey}`
        }).then(function(result) {
            orders.list = [];
            //console.log(result.data);
            result.data.forEach(element => {
                if (element.status_id != 600) {
                    orders.list.push(element);
                }
            });
        });
    },
    save: function(id) {
        return m.request({
            method: "GET",
            url: `${orders.url}/orders/${id}?api_key=${orders.apiKey}`
        }).then(function(result) {
            orders.total = 0;
            //console.log(result.data);
            orders.current_items = [];
            result.data.order_items.forEach(element => {
                orders.current_items.push(element);
                orders.total += (element.price * element.amount);
            });
            //console.log(orders.total);
            //console.log(orders.current_items);
            orders.current = result.data;
        });
    },
    update: function() {
        console.log(orders.current);
        orders.current.status_id = 600;
        orders.current.api_key = orders.apiKey;
        return m.request({
            method: "PUT",
            url: `${orders.url}/orders`,
            body: orders.current
        }).then(function() {
            orders.current = {};
            orders.list = [];
            orders.current_items = [];
            m.route.set("/");
        });
    }


};

export { orders };
