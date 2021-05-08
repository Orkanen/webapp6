import m from "mithril";

import { baseUrl, apiKey } from "../vars.js";

let auth = {
    url: `${baseUrl}/auth/login`,
    url2: `${baseUrl}/auth/register`,
    email: "",
    password: "",
    token: "",

    login: function() {
        m.request({
            url: auth.url,
            method: "POST",
            body: {
                email: auth.email,
                password: auth.password,
                api_key: apiKey
            }
        }).then(function(result) {
            auth.email = "";
            auth.password = "";

            console.log(result.data.token);

            auth.token = result.data.token;
            return m.route.set("/invoices");
        });
    },
    register: function() {
        m.request({
            url: auth.url2,
            method: "POST",
            body: {
                email: auth.email,
                password: auth.password,
                api_key: apiKey
            }
        }).then(function() {
            m.request({
                url: auth.url,
                method: "POST",
                body: {
                    email: auth.email,
                    password: auth.password,
                    api_key: apiKey
                }
            }).then(function(result) {
                auth.email = "";
                auth.password = "";

                console.log(result.data.token);

                auth.token = result.data.token;
                return m.route.set("/home");
            });
        });
    }
};

export { auth };
