"use strict";

import m from 'mithril';

import { auth } from "../models/auth.js";

let menu = {
    view: function(vnode) {
        if (auth.token) {
            return [
                m("nav.top-nav",
                    { textContent: ""},
                    [
                        m("a", { href: "#!/" }, "Home"),
                        m("a", { href: "#!/deliveries" }, "Deliveries"),
                        m("a", { href: "#!/invoices" }, "Invoices")
                    ]),
                m("main.container", vnode.children)
            ];
        }
        return [
            m("nav.top-nav",
                { textContent: ""},
                [
                    m("a", { href: "#!/" }, "Home"),
                    m("a", { href: "#!/login" }, "Log In")
                ]),
            m("main.container", vnode.children)
        ];
    }
};

export { menu };
