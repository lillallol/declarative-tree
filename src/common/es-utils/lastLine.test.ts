import { lastLine } from "./lastLine";

describe(lastLine.name, () => {
    it("returns the last line of the provided string", () => {
        expect(
            lastLine(`

1`)
        ).toBe("1");
    });
});
