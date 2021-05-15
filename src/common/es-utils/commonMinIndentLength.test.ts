import { commonMinIndentLength, _errorMessages } from "./commonMinIndentLength";

describe(commonMinIndentLength.name, () => {
    it("returns the length of the common minimum indentation of the provided string, ignoring empty lines", () => {
        expect(
            commonMinIndentLength(
                // prettier-ignore
                "\n" +
                "    hello\n" +
                "     \n" +
                "  world"
            )
        ).toBe(2);
    });
    it("throws if the provided string has tab character in the indentation string", () => {
        expect(() =>
            commonMinIndentLength(
                // prettier-ignore
                "\n" +
                "hello\n" +
                "\n"+
                "    \tworld"
            )
        ).toThrow(_errorMessages.badIndentSpaceCharacter);
    });
});
