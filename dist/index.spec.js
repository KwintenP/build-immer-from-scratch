"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('immer', function () {
    it('should be possible to mutate the object inside of a produce without modifying the original', function () {
        var objBase = { a: { b: 2 }, c: 3 };
        var next = index_1.produce(objBase, function (draft) {
            // draft.c = 4;
            draft.a.b = 1;
        });
    });
});
