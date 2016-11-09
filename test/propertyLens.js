import {toProperty} from '../src';
import assert from 'assert';

describe('propertyLens', () => {
    it('gets values from object', () => {
        const aL = toProperty('a');
        const o1 = {
            a: 1
        };
        const o2 = {
            a: 2
        };

        assert.equal(aL.get(o1), 1);
        assert.equal(aL.get(o2), 2);
    });

    it('sets values in object', () => {
        const aL = toProperty('a');
        const o1 = {
            a: 1,
            b: 11
        };
        const o2 = {
            a: 2,
            b: 22
        };

        const o1_1 = aL.set(o1, 'abc');
        const o2_1 = aL.set(o2, 'def');

        assert.equal(aL.get(o1), 1);
        assert.equal(o1.a, 1);
        assert.equal(o1.b, 11);
        assert.equal(aL.get(o2), 2);
        assert.equal(o2.a, 2);
        assert.equal(o2.b, 22);

        assert.equal(aL.get(o1_1), 'abc');
        assert.equal(o1_1.a, 'abc');
        assert.equal(o1_1.b, 11);
        assert.equal(aL.get(o2_1), 'def');
        assert.equal(o2_1.a, 'def');
        assert.equal(o2_1.b, 22);
    });

    it('is composable', () => {
        const aL = toProperty('a');
        const bL = toProperty('b');
        const abL = aL.compose(bL);
        const o = {
            a: {
                b: 123
            }
        };
        const o_2 = abL.set(o, 'abc');

        assert.equal(abL.get(o), 123);
        assert.equal(abL.get(o_2), 'abc');
        assert.equal(o_2.a.b, 'abc');

    });
});