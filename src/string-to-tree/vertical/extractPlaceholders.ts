/**
 * @description Look at the example.
 * @example
 * //for input
 * `
 *          ${1}
 *       (        )|
 *    ${-2}        ${7}
 *       |        (     )|
 *                ${6}  ${10}
 *                 |     )|
 *                     ${11}
 *                     (|
 *                     ${3}
 *                           )|
 *                           ${4}
 * `;
 * //the value of the context variable is:
 * [
 *  [1],
 *  [-2,7],
 *  [6,10],
 *  [11],
 *  [3],
 *  [4]
 * ];
 */
export function extractPlaceholders<T>(strings: TemplateStringsArray, placeholders: T[]): T[][] {
    const placeholderRows: T[][] = [[placeholders[0]], []];
    let rowIndex = 0;
    for (let i = 1; i < placeholders.length; i++) {
        if (!/^\s*$/.test(strings[i])) {
            rowIndex++;
        }
        if (placeholderRows[rowIndex] === undefined) placeholderRows[rowIndex] = [];
        placeholderRows[rowIndex].push(placeholders[i]);
    }
    return placeholderRows;
}
