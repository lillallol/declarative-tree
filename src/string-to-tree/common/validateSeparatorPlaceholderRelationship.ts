import { constants } from "../../constants";
import { errorMessages } from "../../errorMessages";

/**
 * @description It throws error when the number of separators in a row is not equal to the number of
 * placeholders of the placeholder row it corresponds.
 */
export function validateSeparatorPlaceholderRelationship(branchRows: string[][], placeholderRows: unknown[][]): void {
    for (let i = 0; i < branchRows.length; i++) {
        if (branchRows[i].filter((l) => l === constants.separator).length !== placeholderRows[i].length) {
            // console.log(branchRows[rowIndex],placeholderRows[rowIndex]);
            throw Error(errorMessages.badSeparatorPlaceholderRelationship);
        }
    }
}
