import { objectAssignPrototype } from "../common/es-utils/objectAssignPrototype";
import { ITreeNodeMetadataTreeToString } from "../publicApi";
import { treeNodeMetadataFactory } from "../tree-node-metadata/treeNodeMetadata";
import {
    ITreeNodeMetadataState,
    treeNodeMetadataStateFactory,
} from "../tree-node-metadata/treeNodeMetadataStateFactory";
import { ITreeNodeMetadataForTreeToStringSpecific } from "../types";

/**
 * @description Returns all the tree node metadata as encountered in level order traverse.
 */
export function extendedTreeNodeMetadata<treeNode>(_: {
    nodeGroups: treeNode[][][];
}): ITreeNodeMetadataTreeToString<treeNode>[] {
    const { nodeGroups } = _;
    const all: ITreeNodeMetadataTreeToString<treeNode>[] = [];
    const state = treeNodeMetadataStateFactory({ nodeGroups });

    const treeNodeMetadata = treeNodeMetadataFactory<treeNode, ITreeNodeMetadataTreeToString<treeNode>>({
        state,
        all,
    });

    const treeNodeMetadataSpecific = treeNodeMetadataSpecificFactory<treeNode>({
        state,
    });

    Array.from({ length: nodeGroups.flat(2).length }).forEach((_, i) => {
        const toPush = objectAssignPrototype({
            object: treeNodeMetadataSpecific(i),
            prototype: treeNodeMetadata(i),
        });
        all.push(toPush);
    });

    return all;
}

function treeNodeMetadataSpecificFactory<TreeNode>(_: {
    state: ITreeNodeMetadataState<TreeNode>;
}): (index: number) => ITreeNodeMetadataForTreeToStringSpecific<TreeNode> {
    const { state } = _;
    return (index) => {
        const { i, j, k } = state._indexToIJK[index];
        return {
            treeNode: state._nodeGroups[i][j][k],
            treeNodeStringRepresentation: undefined,
        };
    };
}
