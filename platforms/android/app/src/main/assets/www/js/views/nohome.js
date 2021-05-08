"use strict";
import m from 'mithril';

let nohome = {
    view: function() {
        return [ m("h1", "Home"),
            m("h3", "You are currently not logged in.")];
    }
};

export { nohome };
