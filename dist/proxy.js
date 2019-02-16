"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createDraft(base) {
    var state = {
        base: base,
        copy: null,
        drafts: {},
        //FIXME what to do with revoke?
        revoke: null,
    };
    // Proxy.revocable(state, )
}
exports.createDraft = createDraft;
var objectTraps = {
    get: get,
    set: set
};
function get(state, prop) {
}
function set(state, prop, value) {
}
