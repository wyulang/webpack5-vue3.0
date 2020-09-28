import { isUndefined } from './lang';
function get(source, [head, ...tail]) {
    source = source[head];
    return tail.length && source ? get(source, tail) : source;
}
export default (source, path, defaultValue) => {
    const result = get(source || {}, path.split('.'));
    return isUndefined(result) ? defaultValue : result;
};
