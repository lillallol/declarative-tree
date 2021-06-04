/**
 * @description
 * Returns a predicate on whether the provided value is of object internal class.
 * @example
 * isOfObjectInternalClass({a : 1, b : 2});//true
 * isOfObjectInternalClass([1,2]);//false
 * isOfObjectInternalClass(new Date());//false
 */
export function isOfObjectInternalClass(v: unknown): v is { [x: string]: unknown } {
    return Object.prototype.toString.call(v) === "[object Object]";
}
