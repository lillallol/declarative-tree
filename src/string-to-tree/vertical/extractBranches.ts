/**
 * @description Look at the example.
 * @example
 * //for input
 * `
 *       ${1}
 *       (  ).
 *    ${-2}  ${7}
 *       .  (     ).
 *          ${6}  ${10}
 *           .     ).
 *               ${11}
 *               (.
 *               ${3}
 *                     ).
 *                     ${4}
 * `;
 * //the value of the context variable is:
 *
 * [
 *  ['(',')','.'],
 *  ['.','(',')','.'],
 *  ['.',')','.'],
 *  ['(','.'],
 *  [')','.']
 * ];
 */
export function extractBranches<T>(strings: TemplateStringsArray, placeholders: T[]): string[][] {
    const branchRows: string[][] = [];
    for (let i = 1; i < placeholders.length; i++) {
        if (!/^\s*$/.test(strings[i])) {
            branchRows.push(strings[i].replace(/\s*/g, "").split(""));
        }
    }
    return branchRows;
}
