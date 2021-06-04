import { lastLine } from "../../common/es-utils/lastLine";

/**
 * @description Extracts the placeholder rows of the given horizontal tree.
 * @example
 * //tree
 * `
 *     ${"+"}
 *     |_ ${"p"}
 *     |  |_ ${"a"}
 *     |
 *     |_ ${"o"}
 *        |_ ${"t"}
 *           |_ ${"h"}
 * `;
 * //result
 * [
 *  ["+"],
 *  ["o", "p"],
 *  ["t", "a"],
 *  ["h"]
 * ];
 */
export function extractPlaceholderRows<T>(strings: TemplateStringsArray, placeholders: T[]): T[][] {
    const placeholderRows: T[][] = [[placeholders[0]]];
    const lengthToRow: { [x: string]: number } = {
        0: 0,
    };
    let maxLength = 0;
    let row = 0;
    for (let i = 1; i < strings.length - 1; i++) {
        const { length } = lastLine(strings[i]);
        if (maxLength < length) {
            maxLength = length;
            row++;
        }
        if (lengthToRow[length] === undefined) lengthToRow[length] = row;
        if (placeholderRows[lengthToRow[length]] === undefined) placeholderRows[lengthToRow[length]] = [];
        placeholderRows[lengthToRow[length]].push(placeholders[i]);
    }
    placeholderRows.forEach((l) => l.reverse());
    return placeholderRows;
}
