import { objectAssignPrototype } from "../../common/es-utils/objectAssignPrototype";
import { ITreeNodeMetadataStringToTree } from "../../publicApi";
import { treeNodeMetadataFactory } from "../../tree-node-metadata/treeNodeMetadata";
import { treeNodeMetadataStateFactory } from "../../tree-node-metadata/treeNodeMetadataStateFactory";
import { treeNodeMetadataSpecificFactory } from "./treeNodeMetadataSpecificFactory";

export function treeNodeMetadata<placeholderType, TreeNode>(_: {
    nodeGroups: placeholderType[][][];
    branches: string[][];
}): ITreeNodeMetadataStringToTree<placeholderType, TreeNode>[] {
    const { branches, nodeGroups } = _;

    const all: ITreeNodeMetadataStringToTree<placeholderType, TreeNode>[] = [];
    const state = treeNodeMetadataStateFactory({ nodeGroups });

    const treeNodeMetadata = treeNodeMetadataFactory<
        placeholderType,
        ITreeNodeMetadataStringToTree<placeholderType, TreeNode>
    >({
        state,
        all,
    });

    const treeNodeMetadataSpecific = treeNodeMetadataSpecificFactory<placeholderType, TreeNode>({ state, branches });

    for (let i = 0; i < nodeGroups.flat(2).length; i++) {
        const toPush = objectAssignPrototype({
            object: treeNodeMetadataSpecific(i),
            prototype: treeNodeMetadata(i),
        });
        all.push(toPush);
    }

    return all;
}
