import { rectanglify } from "../../common/es-utils/rectanglify";
import { stringTo2DMatrix } from "../../common/es-utils/stringTo2DMatrix";
import { templateLiteralToString } from "../../common/es-utils/templateLiteralToString";
import { transposeMatrix } from "../../common/es-utils/transposeMatrix";
import { unindent } from "../../common/es-utils/unindent";
import { constants } from "../../constants";

/**
 * @description Extract the branch rows form a horizontal tree string representation.
 * @example
 * //tree
 * `
 *  ${"+"}
 *  |_ ${"p"}
 *  |  |_ ${"a"}
 *  |_ ${"o"}
 * `;
 * //branch rows
 * [
 *  ["_", "_", "."],
 *  [".", "_", "."],
 * ];

 */
export function extractBranchRows<T>(strings: TemplateStringsArray, placeholders: T[]): string[][] {
    const toReturn = transposeMatrix(
        stringTo2DMatrix(
            rectanglify(
                unindent(templateLiteralToString(strings, ...placeholders.map(() => " " + constants.separator)))
            )
        )
    )
        .filter((row) => row.includes(constants.separator))
        .map((row) => row.filter((l) => l !== " "));
    toReturn.pop();
    toReturn.forEach((row) => row.reverse());
    return toReturn;
}
