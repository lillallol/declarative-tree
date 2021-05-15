import { isObjectOrArrayLiteral } from "./isObjectOrArrayLiteral";

describe(isObjectOrArrayLiteral.name, () => {
    it.each([
        [[]],
        [[1, "", true]],
        [{}],
        [
            {
                a: 1,
                b: "",
                c: true,
            },
        ],
    ])("return true for value of internal class array or object", (v) => {
        expect(isObjectOrArrayLiteral(v)).toBe(true);
    });
    it.each([[1], [""], [true], [undefined], [null], [() => undefined], [Symbol()], [1n]])(
        "returns false for value of not internal class array or object",
        (v) => {
            expect(isObjectOrArrayLiteral(v)).toBe(false);
        }
    );
});
