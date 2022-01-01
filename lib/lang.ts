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

export const type = (o: any): string => {
  return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};

export const isFunction = (o: any): boolean => {
  return type(o) === 'function';
};

export const isNull = (o: any): boolean => {
  return o === null;
};

export const isNumber = (o: any): boolean => {
  return typeof o === 'number' && isFinite(o);
};

export const isObject = (o: any, failfn: boolean = false): boolean => {
  const t = typeof o;
  return (o && (t === 'object' ||
    (!failfn && (t === 'function' || isFunction(o))))) || false;
};

export const isPlainObject = (o): boolean => {
  return isObject(o, true);
};

export const isString = (o: any): boolean => {
  return typeof o === 'string';
};

export const isUndefined = (o: any): boolean => {
  return typeof o === 'undefined';
};

export const isArray = Array.isArray || ((o: any) => type(o) === 'array');

export const now = Date.now || (() => new Date().getTime());

export function addUnit(value: string | number) {
  if (isString(value)) {
    return value
  } else if (isNumber(value)) {
    return value + 'px'
  }
  return ''
}

export declare const extend: {
  <T, U>(target: T, source: U): T & U;
  <T_1, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
  <T_2, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
  (target: object, ...sources: any[]): any;
}

export function toObject<T>(arr: Array<T>): Record<string, T> {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export const off = function (
  element: any, event: string, handler: EventListenerOrEventListenerObject, useCapture = false,) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}

export const on = function (
  element:any,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false,) {
  if (element && event && handler) {
    (element as any).addEventListener(event, handler, useCapture)
  }
}

export function renderThumbStyle({ move, size, bar }) {
  const style = {} as any
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate
  return style
}
