/**
 * Created by ndyumin on 08.11.2016.
 */
import {
    toProperty,
    toArrayItem
} from '../src';
import assert from 'assert';

describe('arrayItemLens', () => {
    it('gets values from array', () => {
        const threeL = toArrayItem(item => item === 3);
        const a = [1, 2, 3, 4, 5];
        assert.equal(threeL.get(a), 3);

        const numberL = toArrayItem(item => typeof item === 'number');
        const a2 = ['1', '2', '3', 4, '5'];
        assert.equal(numberL.get(a2), 4);

        const arrL = toArrayItem(item => item.id === 456);
        const a3 = [
            {id: 123, a: 1},
            {id: 456, a: 2},
            {id: 678, a: 3}
        ];

        const item = arrL.get(a3);
        assert.equal(item.a, 2);
    });

    it('sets values in array', () => {
        const arrL = toArrayItem(item => item.id === 456);
        const a = [
            {id: 123, a: 1},
            {id: 456, a: 2},
            {id: 678, a: 3}
        ];

        const newArray = arrL.set(a, {b: 22});
        assert.equal(newArray[1].b, 22);
        assert.equal(newArray[1].a, undefined);
    });

    it('composes', () => {
        const arrL = toArrayItem(item => item.id === 456);
        const objL = toProperty('a');
        const o = {
            a: [
                {id: 123, a: 1},
                {id: 456, a: 2},
                {id: 678, a: 3}
            ]
        };
        const oaL = objL.compose(arrL);
        assert.equal(oaL.get(o).a, 2);
        const oaoL = objL.compose(arrL).compose(objL);
        assert.equal(oaoL.get(o), 2);

        const arr = [
            {id: 123, a: 1},
            {id: 456, a: 2},
            {id: 678, a: 3}
        ];
        const aoL = arrL.compose(objL);
        assert.equal(aoL.get(arr), 2);
    });
});