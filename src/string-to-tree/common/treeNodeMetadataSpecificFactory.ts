import { ITreeNodeMetadataState } from "../../tree-node-metadata/treeNodeMetadataStateFactory";
import { ITreeNodeMetadataForStringToTreeSpecific } from "../../types";

import { branchesGrouped } from "./branchesGrouped";
import { errorMessages } from "../../errorMessages";

export function treeNodeMetadataSpecificFactory<placeholderType, TreeNode>(_: {
    state: ITreeNodeMetadataState<placeholderType>;
    branches: string[][];
}): (index: number) => ITreeNodeMetadataForStringToTreeSpecific<placeholderType, TreeNode> {
    const { branches, state } = _;
    const _branchesGrouped = branchesGrouped(branches);
    return (index: number): ITreeNodeMetadataForStringToTreeSpecific<placeholderType, TreeNode> => {
        let treeNode: TreeNode;
        return {
            /**
             * @example
             * //for input
             * `
             *       ${1}
             *       (   ).
             *    ${-2}  ${7}
             *       .  (     ).
             *          ${6}  ${10}
             *           .     ).
             *               ${11}
             *               (.
             *               ${3}
             *                  ).
             *                  ${4}
             * `;
             * [
             *  [[1]],
             *  [[-2, 7]],
             *  [[], [6, 10]],
             *  [[],[11]],
             *  [[3]],
             *  [[4]],
             * ];
             * [
             *  ['(',')','.'],
             *  ['.','(',')','.'],
             *  ['.',')','.'],
             *  ['(','.'],
             *  [')','.']
             * ];
             */
            get branchesBottom() {
                const { i, j } = state._indexToIJK[index];
                return _branchesGrouped[i][j];
            },
            get branchTop() {
                const { i, j, k } = state._indexToIJK[index];
                if (i === 0) return null;
                return _branchesGrouped[i - 1][j][k];
            },
            get treeNode() {
                if (treeNode === undefined) throw Error(errorMessages.treeNodeHasNotBeenSetted);
                return treeNode;
            },
            set treeNode(_treeNode: TreeNode) {
                treeNode = _treeNode;
            },
            get placeholderValue() {
                const { i, j, k } = state._indexToIJK[index];
                return state._nodeGroups[i][j][k];
            },
        };
    };
}
