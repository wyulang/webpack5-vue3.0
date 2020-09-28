import { isObject, isArray } from './lang';
function set(source, [head, ...tail], value) {
    source = source[head] = tail.length ? source[head] || {} : value;
    if (tail.length) {
        if (isObject(source) && !isArray(source)) {
            set(source, tail, value);
        }
        else {
            throw new Error(`path node ['.${head}'] must be plain object {}!`);
        }
    }
}
export default (source, path, value) => {
    source = source || {};
    set(source, path.split('.'), value);
    return source;
};
