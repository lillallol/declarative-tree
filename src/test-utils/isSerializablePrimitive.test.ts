import { isSerializablePrimitive } from "./isSerializablePrimitive";

describe(isSerializablePrimitive.name, () => {
    it.each([[[]], [{}], [() => undefined], [undefined], [Symbol()]])(
        "returns false when provided with a non primitive or non serializable value",
        (v) => {
            expect(isSerializablePrimitive(v)).toBe(false);
        }
    );
    it.each([[1], [""], [true], [null]])("returns true when provided with a serializable primitive type", (v) => {
        expect(isSerializablePrimitive(v)).toBe(true);
    });
});
