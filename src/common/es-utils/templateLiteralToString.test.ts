import { templateLiteralToString } from "./templateLiteralToString";

describe(templateLiteralToString.name, () => {
    it("returns the string that corresponds to the template literal arguments", () => {
        expect(templateLiteralToString`${"Hello"} ${"world"}!${1}`).toBe("Hello world!1");
    });
});
