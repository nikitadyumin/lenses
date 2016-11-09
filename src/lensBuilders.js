/**
 * Created by ndyumin on 08.11.2016.
 */

import lens from './lens';

export const toProperty = propertyName => lens(
    obj => obj[propertyName],
    (obj, val) => Object.assign({}, obj, {[propertyName]: val})
);

export const toArrayItem = selector => lens(
    xs => xs.filter(selector)[0],
    (xs, item) => xs.map(x => selector(x) ? item : x)
);