import { errorMessages } from "../../errorMessages";

/**
 * @description It validates the provided template literal by throwing error when :
 * * the first string has a non \s character
 * * the last string has a non \s character
 * * a non \s character exists between two placeholder in the same row
 * * a branch row has only one line break
 * * a branch row has more than two line breaks
 * * a branch row has characters in its trailing lines
 */
export function validateShape<T>(strings: TemplateStringsArray, placeholders: T[]): void {
    if (!/^\s*$/.test(strings[0])) throw Error(errorMessages.badStartingStringV);
    if (!/^\s*$/.test(strings[strings.length - 1])) throw Error(errorMessages.badEndingStringV);

    // `
    //               ${1}
    //                     ).
    //         ${-2}        ${7}
    //            .        (     ).
    //                     ${6}  ${10}
    //                      .     ).
    //                          ${11}
    //                          (.
    //                          ${3}
    //                                ).
    //                                ${4}
    // `;

    for (let i = 1; i < placeholders.length; i++) {
        if (!/^\s*$/.test(strings[i])) {
            if (strings[i].split("\n").length === 1) throw Error(errorMessages.badStringBetweenPlaceholdersV);
            if (strings[i].split("\n").length === 2) throw Error(errorMessages.oneMoreLineBreakNeededInBranchRowV);
            if (strings[i].split("\n").length > 3) throw Error(errorMessages.tooManyLineBreaksInBranchRowV);
            if (!/^\s*$/.test(strings[i].split("\n")[0]) || !/^\s*$/.test(strings[i].split("\n")[2]))
                throw Error(errorMessages.badBranchRowTrailingLinesV);
        }
    }
}
