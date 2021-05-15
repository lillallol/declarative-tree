import { errorMessages } from "../../errorMessages";
import { constants } from "../../constants";

/**
 * @description It throws error when the provided template literal that represents a tree has
 * a tree node that has different amount of children from branches.
 */
export function validateBranchPlaceholderRelationship(branchRows: string[][], placeholderRows: unknown[][]): void {
    for (let i = 0; i < branchRows.length; i++) {
        if (branchRows[i].filter((l) => l !== constants.separator).length !== placeholderRows[i + 1].length)
            throw Error(errorMessages.badBranchPlaceholderRelationship);
    }
}
