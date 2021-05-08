"use strict";

import m from 'mithril';

let products = {
    url: "https://lager.emilfolino.se/v2/",

    list: [],

    loadList: function() {
        return m.request({
            method: "GET",
            url: `${products.url}products?api_key=79ec5a01a507b1090a62166a71ee2ea1`
        }).then(function(result) {
            console.log(result.data);
            products.list = result.data;
        });
    }
};

export { products };
