import type { ITreeNodeMetadataState } from "./treeNodeMetadataStateFactory";
import type { ITreeNodeMetadataBase } from "../publicApi";

/**
 * @description @TODO
 */
export function treeNodeMetadataFactory<IPlaceholderXorTreeNode, IExtendedTreeNodeMetadata>(_: {
    state: ITreeNodeMetadataState<IPlaceholderXorTreeNode>;
    all: IExtendedTreeNodeMetadata[];
}): (index: number) => ITreeNodeMetadataBase<IExtendedTreeNodeMetadata> {
    const { state, all } = _;
    return (index: number) => ({
        get subTreeHeight() {
            return state._subTreeHeight[index];
        },
        get subTreeLength() {
            return state._subTreeLength[index];
        },
        get leftSibling() {
            return index !== 0 ? all[index - 1] : null;
        },
        get rightSibling() {
            return index !== all.length - 1 ? null : all[index + 1];
        },
        get childrenGroup() {
            return state._contextIndexToChildrenIndexes[index].map((index) => all[index]);
        },
        get currentSiblingGroup() {
            const { i, j } = state._indexToIJK[index];
            return state._ijkToIndex[i][j].map((index) => all[index]);
        },
        get leftSiblingGroup() {
            const { i, j } = state._indexToIJK[index];
            const leftSiblingGroupIndexes = state._ijkToIndex[i][j - 1];
            if (leftSiblingGroupIndexes === undefined) return null;
            else return leftSiblingGroupIndexes.map((index) => all[index]);
        },
        get rightSiblingGroup() {
            const { i, j } = state._indexToIJK[index];
            const leftSiblingGroupIndexes = state._ijkToIndex[i][j + 1];
            if (leftSiblingGroupIndexes === undefined) return null;
            else return leftSiblingGroupIndexes.map((index) => all[index]);
        },
        get parent() {
            const parentIndex = state._contextIndexToParentIndex[index];
            if (parentIndex === null) {
                return null;
            } else {
                return all[parentIndex];
            }
        },
        get all() {
            return all;
        },
    });
}
