import { tag } from "./tag";

describe(tag.name, () => {
    it("returns the strings and placeholders of the template literal", () => {
        expect(tag`
            ${"hello"}
            ${"world"}!
        `).toStrictEqual([
            [
                `
            `,
                `
            `,
                `!
        `,
            ],
            ["hello", "world"],
        ]);
    });
});
