"use strict";
import m from 'mithril';

let home = {
    view: function() {
        return [ m("h1", "Home"),
            m("h3", "Welcome Home.")];
    }
};

export { home };
