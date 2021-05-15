import { contextIndexToChildrenIndexes } from "./contextIndexToChildrenIndexes";
import { contextIndexToParentIndex } from "./contextIndexToParentIndex";
import { indexToIJK } from "./indexToIJK";
import { ijkToIndex } from "./ijkToIndex";
import { subTreeHeights } from "./subTreeHeights";
import { subTreeLengths } from "./subTreeLengths";

import type { contextIndexToParentIndexReturnType } from "../types";
import type { contextIndexToChildrenIndexesReturnedType } from "./contextIndexToChildrenIndexes";

export function treeNodeMetadataStateFactory<IPlaceholderXorTreeNode>(_: {
    nodeGroups: IPlaceholderXorTreeNode[][][];
}): {
    _ijkToIndex: number[][][];
    _indexToIJK: { i: number; j: number; k: number }[];
    _contextIndexToChildrenIndexes: contextIndexToChildrenIndexesReturnedType;
    _contextIndexToParentIndex: contextIndexToParentIndexReturnType;
    _totalNumberOfNodes: number;
    _subTreeHeight: number[];
    _subTreeLength: number[];
    _nodeGroups: IPlaceholderXorTreeNode[][][];
} {
    const { nodeGroups } = _;
    const _totalNumberOfNodes = nodeGroups.flat(3).length;
    const _placeholderGroupsIndex = ijkToIndex(nodeGroups);
    return {
        _ijkToIndex: _placeholderGroupsIndex,
        _indexToIJK: indexToIJK(_placeholderGroupsIndex),
        _contextIndexToChildrenIndexes: contextIndexToChildrenIndexes(
            _totalNumberOfNodes,
            nodeGroups,
            _placeholderGroupsIndex
        ),
        _contextIndexToParentIndex: contextIndexToParentIndex(nodeGroups, _placeholderGroupsIndex),
        _totalNumberOfNodes: _totalNumberOfNodes,
        _subTreeHeight: subTreeHeights(nodeGroups),
        _subTreeLength: subTreeLengths(nodeGroups),
        _nodeGroups: nodeGroups,
    };
}

export type ITreeNodeMetadataState<IPlaceholderXorTreeNode> = {
    _ijkToIndex: number[][][];
    _indexToIJK: { i: number; j: number; k: number }[];
    _contextIndexToChildrenIndexes: contextIndexToChildrenIndexesReturnedType;
    _contextIndexToParentIndex: contextIndexToParentIndexReturnType;
    _totalNumberOfNodes: number;
    _subTreeHeight: number[];
    _subTreeLength: number[];
    _nodeGroups: IPlaceholderXorTreeNode[][][];
}