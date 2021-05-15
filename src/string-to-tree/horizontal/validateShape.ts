import { errorMessages } from "../../errorMessages";

// `

// ${"+"}
// |_ ${"p"}
// |  |_ ${"a"}
// |     |_ ${"t"}
// |        |_ ${"h"}
// |        |  |_ ${["prop1", "-1 => 1"]}
// |        |_ ${"t"}
// |           |_ ${["prop", "11 => 1"]}
// |_ ${"o"}
//    |_ ${"t"}
//       |_ ${"h"}
//          |_ ${"e"}
//             |_ ${"a"}
//             |  |_ ${"t"}
//             |     |_ ${"h"}
//             |        |_ ${["prop2", "+ 10"]}
//             |_ ${["prop3", "- -10"]}
//             |_ ${"b"}
//                |_ ${["prop4", `{"b":"2"} => {"a":1}`]}

// `;

/**
 * @description It validates the provided horizontal tree string representation
 * by throwing error when :
 * * the first string has a non \s character
 * * the last string has a non \s character
 * * the string between placeholders is not of two lines
 * * the first line of string between placeholders has non \s characters
 * * the second line of string between placeholders is not of the appropriate regex
 */
export function validateShape(strings: TemplateStringsArray): void {
    if (!/^\s*$/.test(strings[0])) throw Error(errorMessages.badStartingString);
    if (!/^\s*$/.test(strings[strings.length - 1])) throw Error(errorMessages.badEndingString);
    for (let i = 1; i < strings.length - 1; i++) {
        if (strings[i].split("\n").length !== 2)
            throw Error(errorMessages.stringAfterNonLastPlaceholderHasTooManyLines);
        if (!/^\s*$/.test(strings[i].split("\n")[0])) throw Error(errorMessages.afterPlaceholderBadString);
        if (!/^(\s*\|)*\S $/.test(strings[i].split("\n")[1])) throw Error(errorMessages.badBranchStringPattern);
    }
}
