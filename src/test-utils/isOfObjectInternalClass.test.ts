import { isOfObjectInternalClass } from "./isOfObjectInternalClass";

describe(isOfObjectInternalClass.name, () => {
    it.each([
        [{}],
        [
            {
                a: "",
                b: 1,
                c: true,
            },
        ],
    ])("return true only for v being an object literal", (v) => {
        expect(isOfObjectInternalClass(v)).toBe(true);
    });
    it.each([[""], [0], [true], [undefined], [null], [() => null], [[]], [new Date()], [new Uint8Array()]])(
        "returns false for v being of not [[Class]] object",
        (v) => {
            expect(isOfObjectInternalClass(v)).toBe(false);
        }
    );
});
