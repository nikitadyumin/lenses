/**
 * Created by ndyumin on 08.11.2016.
 */

export default function lens(getter, setter) {
    return {
        get: getter,
        set: setter,
        compose: l => lens(
            (obj) => l.get(getter(obj)),
            (obj, val) => setter(obj, l.set(getter(obj), val))
        )
    };
};
