import m from "mithril";
import { auth } from "../models/auth.js";

let register = {

    view: function () {
        return [
            m("h1", "Log In"),
            m("form", {
                onsubmit: function (event) {
                    event.preventDefault();
                    auth.register();
                }
            }, [
                m("lavel.input-label", "E-post"),
                m("input[type=email].input", {
                    oninput: function (event) {
                        auth.email = event.target.value;
                    },
                    value: auth.email
                }),
                m("lavel.input-label", "Password"),
                m("input[type=password].input", {
                    oninput: function (event) {
                        auth.password = event.target.value;
                    },
                    value: auth.password
                }),
                m("input[type=submit][value=Register].button", "Register")
            ])
        ];
    }
};

export { register };
