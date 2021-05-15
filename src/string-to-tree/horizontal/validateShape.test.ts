import { tag } from "../../test-utils/index";
import { errorMessages } from "../../errorMessages";
import { validateShape } from "./validateShape";

describe(validateShape.name, () => {
    it.each([
        [
            {
                p1p2: tag<string | string[]>`
            a   ${"+"}
                |_ ${"p"}
                |  |_ ${"a"}
                |     |_ ${"t"}
                |        |_ ${"h"}
                |        |  |_ ${["prop1", "-1 => 1"]}
                |        |_ ${"t"}
                |           |_ ${["prop", "11 => 1"]}
                |_ ${"o"}
                   |_ ${"t"}
            `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`b
                ${"+"}
                |_ ${"p"}
                |  |_ ${"a"}
                |     |_ ${"t"}
                |        |_ ${"h"}
                |        |  |_ ${["prop1", "-1 => 1"]}
                |        |_ ${"t"}
                |           |_ ${["prop", "11 => 1"]}
                |_ ${"o"}
                   |_ ${"t"}
            `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                c
                ${"+"}
                |_ ${"p"}
                |  |_ ${"a"}
                |     |_ ${"t"}
                |        |_ ${"h"}
                |        |  |_ ${["prop1", "-1 => 1"]}
                |        |_ ${"t"}
                |           |_ ${["prop", "11 => 1"]}
                |_ ${"o"}
                   |_ ${"t"}
            `,
            },
        ],
    ])("throws error when the first string has non space character", ({ p1p2 }) => {
        expect(() => validateShape(p1p2[0])).toThrow(errorMessages.badStartingString);
    });
    it.each([
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"}
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_ ${"t"}c
                `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"}
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_ ${"t"}
          d     `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"}
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_ ${"t"}
          d
               `,
            },
        ],
    ])("throws error when the last string has non space character", ({ p1p2 }) => {
        expect(() => validateShape(p1p2[0])).toThrow(errorMessages.badEndingString);
    });
    it.each([
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"}
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}

                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_ ${"t"}
               `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                     

                    |_ ${"p"}
                    |  |_ ${"a"}
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}
                    
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_ ${"t"}
               `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"}
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                     

                    |_ ${"t"}
               `,
            },
        ],
    ])("string after non last placeholder has to have one line break", ({ p1p2 }) => {
        expect(() => validateShape(p1p2[0])).toThrow(errorMessages.stringAfterNonLastPlaceholderHasTooManyLines);
    });
    it.each([
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"} a
                    |_ ${"p"}
                    |  |_ ${"a"} 
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_ ${"t"}
               `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"} 
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]} c
                    |        |_ ${"t"}
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_ ${"t"}
               `,
            },
        ],
    ])("throws error when there is a character after a non last placeholder", ({ p1p2 }) => {
        expect(() => validateShape(p1p2[0])).toThrow(errorMessages.afterPlaceholderBadString);
    });
    it.each([
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"} 
                    |     |_ ${"t"}
                    |        |_ ${"h"}
        c           |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_ ${"t"}
               `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"} 
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_ c${"t"}
               `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"} 
                    |     |_ ${"t"}
                    |        |_ ${"h"}
                    |        |  |_ ${["prop1", "-1 => 1"]}
                    |        |_ ${"t"}
                    |           |_ ${["prop", "11 => 1"]}
                    |_ ${"o"}
                    |_${"t"}
               `,
            },
        ],
    ])("throws an error for invalid branch string", ({ p1p2 }) => {
        expect(() => validateShape(p1p2[0])).toThrow(errorMessages.badBranchStringPattern);
    });
    it.each([
        [
            {
                p1p2: tag<string | string[]>`
                ${"+"}
                |_ ${"p"}
                |  |_ ${"a"} 
                |     |_ ${"t"}
                |        |_ ${"h"}
                |        |  |_ ${["prop1", "-1 => 1"]}
                |        |_ ${"t"}
                |           |_ ${["prop", "11 => 1"]}
                |_ ${"o"}
                |_ ${"t"}
            `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                ${"+"}
                |_ ${"p"}
                |  |_ ${"a"} 
                |     |_ ${"t"}
                |        |_ ${"h"}
                |        |  |_ ${["prop1", "-1 => 1"]}
                |        |_ ${"t"}
                |           |_ ${["prop", "11 => 1"]}
                |_ ${"o"}
            |_ ${"t"}
            `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                ${"+"}
                |_ ${"p"}
                |  |_ ${"a"} 
                |     |_ ${"t"}
                |        |_ ${"h"}
                        |  |_ ${["prop1", "-1 => 1"]}
                |        |_ ${"t"}
                |           |_ ${["prop", "11 => 1"]}
                |_ ${"o"}
            |_ ${"t"}
            `,
            },
        ],
        [
            {
                p1p2: tag<string | string[]>`
                ${"+"}
                |_ ${"p"}
                |  |_ ${"a"} 
                |     |_ ${"t"}
                         |_ ${"h"}
                |        |  |_ ${["prop1", "-1 => 1"]}
                |        |_ ${"t"}
                |           |_ ${["prop", "11 => 1"]}
                |_ ${"o"}
                |_ ${"t"}
            `,
            },
        ],
    ])("does not throw error for a valid tree", ({ p1p2 }) => {
        expect(() => validateShape(p1p2[0])).not.toThrow();
    });
});
