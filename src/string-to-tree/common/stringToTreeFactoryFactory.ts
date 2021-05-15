import { placeholdersGrouped } from "./placeholdersGrouped";
import { validateBranchPlaceholderRelationship } from "./validateBranchPlaceholderRelationship";
import { validateSeparatorPlaceholderRelationship } from "./validateSeparatorPlaceholderRelationship";
import { treeNodeMetadata } from "./treeNodeMetadata";
import { IStringToTreeFactory } from "../../publicApi";

export function stringToTreeFactoryFactory(
    validateShape: (strings: TemplateStringsArray, placeholders: unknown[]) => void,
    extractPlaceholders: <T>(strings: TemplateStringsArray, placeholders: T[]) => T[][],
    extractBranches: (strings: TemplateStringsArray, placeholders: unknown[]) => string[][]
): IStringToTreeFactory {
    return function stringToTreeFactory({ strategy }) {
        return function treeFromString(strings, ...placeholders) {
            const branchRows = extractBranches(strings, placeholders);
            const placeholderRows = extractPlaceholders(strings, placeholders);

            validateSeparatorPlaceholderRelationship(branchRows, placeholderRows);
            validateBranchPlaceholderRelationship(branchRows, placeholderRows);

            validateShape(strings, placeholders);

            const placeholderGroups = placeholdersGrouped(/*DO NOT CHANGE THAT*/ placeholderRows.flat(1), branchRows);

            return strategy({
                treeNodeMetadataInLevelOrder: treeNodeMetadata({
                    nodeGroups: placeholderGroups,
                    branches: branchRows,
                }),
            });
        };
    };
}
