/**
 * @description
 * Returns a predicate on whether the provided value is a serializable primitive.
 * @example
 * isSerializablePrimitive(1);//true
 * isSerializablePrimitive("");//true
 * isSerializablePrimitive(true);//true
 * isSerializablePrimitive(null);//true
 * isSerializablePrimitive(undefined);//false
 * isSerializablePrimitive({a:1,b:2});//false
 */
export function isSerializablePrimitive(
    v : unknown
): v is string | boolean | number | null {
    return typeof v === "string" || typeof v === "boolean" || typeof v === "number" || v === null;
}
