import { ITreeNodeMetadataStringToTree, ITreeNodeMetadataTreeToString, ITreeNodeMetadataBase } from "./publicApi";

export type contextIndexToParentIndexReturnType = [null, ...number[]];

export type ITreeNodeMetadataForStringToTreeSpecific<placeholderType, treeNode> = Omit<
    ITreeNodeMetadataStringToTree<placeholderType, treeNode>,
    keyof ITreeNodeMetadataBase<ITreeNodeMetadataTreeToString<treeNode>>
>;

export type ITreeNodeMetadataForTreeToStringSpecific<treeNode> = Omit<
    ITreeNodeMetadataTreeToString<treeNode>,
    keyof ITreeNodeMetadataBase<ITreeNodeMetadataTreeToString<treeNode>>
>;
