"use strict";

import m from 'mithril';

import { list } from "./views/list";
import { menu } from "./views/menu";
import { home } from "./views/home";
import { form } from "./views/form";
import { invoices } from "./views/invoices.js";
import { login } from "./views/login.js";
import { inForm } from "./views/invoiceForm.js";
import { register } from "./views/register.js";
import { nohome } from "./views/nohome.js";

import { auth } from "./models/auth.js";
//import { year } from "./views/year";

m.route(document.body, "/", {
    "/": {
        onmatch: function() {
            if (auth.token) {
                return home;
            }

            return m.route.set("/home");
        },
        render: function (vnode) {
            return m(menu, vnode);
        }
    },
    "/home": {
        render: function() {
            return m(menu, m(nohome));
        }
    },
    "/deliveries": {
        render: function() {
            return m(menu, m(list));
        }
    },
    "/form": {
        render: function() {
            return m(menu, m(form));
        }
    },
    "/inform": {
        onmatch: function() {
            if (auth.token) {
                return inForm;
            }

            return m.route.set("/login");
        },
        render: function (vnode) {
            return m(menu, vnode);
        }
    },
    "/invoices": {
        onmatch: function() {
            if (auth.token) {
                return invoices;
            }

            return m.route.set("/login");
        },
        render: function (vnode) {
            return m(menu, vnode);
        }
    },
    "/register": {
        render: function() {
            return m(menu, m(register));
        }
    },
    "/login": {
        render: function() {
            return m(menu, m(login));
        }
    }
});
