import { produce } from './index';

describe('immer', () => {
    it('should be possible to mutate the object inside of a produce without modifying the original', () => {
        const objBase = {a: {b: 2}, c: 3};
        const next = produce(objBase, draft => {
            // draft.c = 4;
            draft.a.b = 1;
        });

        expect(objBase).toEqual({a: {b: 2}, c: 3});
    });
});