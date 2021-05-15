import { objectOrArray } from "./objectOrArray";

/**
 * @description
 * Assertion on whether the provided value is object or array.
 */
export function isObjectOrArrayLiteral(v: unknown): v is objectOrArray {
    return ["[object Array]", "[object Object]"].includes(Object.prototype.toString.call(v));
}
