// http://yui.yahooapis.com/3.18.1/build/yui/yui.js
const TOSTRING = Object.prototype.toString;
const TYPES = {
    'boolean': 'boolean',
    'undefined': 'undefined',
    'number': 'number',
    'string': 'string',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error'
};
export const type = (o) => {
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};
export const isFunction = (o) => {
    return type(o) === 'function';
};
export const isNull = (o) => {
    return o === null;
};
export const isNumber = (o) => {
    return type(o) === 'number' && isFinite(o);
};
export const isBoolean = (o) => {
    return type(o) === 'boolean';
};
export const isObject = (o, failfn = false) => {
    const t = typeof o;
    return (o && (t === 'object' ||
        (!failfn && (t === 'function' || isFunction(o))))) || false;
};
export const isPlainObject = (o) => {
    return isObject(o, true);
};
export const isString = (o) => {
    return type(o) === 'string';
};
export const isUndefined = (o) => {
    return type(o) === 'undefined';
};
export const isArray = Array.isArray || ((o) => type(o) === 'array');
export const now = Date.now || (() => new Date().getTime());
export const fromJson = (json) => {
    return isString(json) ? JSON.parse(json) : json;
};
export const toJson = (obj, pretty) => {
    if (isUndefined(obj)) {
        return undefined;
    }
    if (!isNumber(pretty)) {
        pretty = pretty ? 2 : null;
    }
    return JSON.stringify(obj, (key, value) => value, pretty);
};
export const noop = () => {
    console.log('noop');
};
export const isEmptyObject = (obj) => {
    return Object.keys(obj).length <= 0;
};
