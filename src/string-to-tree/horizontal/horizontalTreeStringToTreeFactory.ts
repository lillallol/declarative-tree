import { stringToTreeFactoryFactory } from "../common/stringToTreeFactoryFactory";
import { extractBranchRows } from "./extractBranchRows";
import { extractPlaceholderRows } from "./extractPlaceholderRows";
import { validateShape } from "./validateShape";

/**
 * @description
 * Provide the necessary information to get back a tag function that converts
 * a horizontal tree string representation to data structure.
 */
export const stringToTreeHorizontalFactory = stringToTreeFactoryFactory(
    validateShape,
    extractPlaceholderRows,
    extractBranchRows
);
