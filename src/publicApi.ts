export type IGetChildren<treeNodeOrTreeRootNode> = (parameters: {
    /**
     * @description
     * The tree node from which you want to get the children.
     */
    treeNode: treeNodeOrTreeRootNode;
}) => treeNodeOrTreeRootNode[];
export type IGetRoot<tree, treeNode> = (parameters: {
    /**
     * @description
     * The tree from which you want to get the root.
     */
    tree: tree;
}) => treeNode;
export type IStringToTree<placeholder, tree> = (strings: TemplateStringsArray, ...placeholders: placeholder[]) => tree;

export type IStringToTreeFactory = <placeholder, treeNode, tree>(parameters: {
    /**
     * @description
     * This function is used by the tag function the factory returns, to
     * convert template literals to tree data structures.
     */
    strategy: (parameters: {
        /**
         * @description
         * The tree node metadata in level order (i.e. as encountered in breadth
         * first search).
         */
        treeNodeMetadataInLevelOrder: ITreeNodeMetadataStringToTree<placeholder, treeNode>[];
    }) => tree;
}) => IStringToTree<placeholder, tree>;

export interface ITreeNodeMetadataStringToTree<placeholderType, treeNode>
    extends ITreeNodeMetadataBase<ITreeNodeMetadataStringToTree<placeholderType, treeNode>> {
    /**
     * @description
     * Returns the branch that connects the context tree node to its parent tree
     * node.
     *
     * The following tree has the `branchTop` values next to their corresponding
     * placeholders:
     *
     * ```ts
     * `
     *          ${1} null
     *     (             ).
     *   ${2} "("       ${3} ")"
     *     .        (         ).
     *           ${4} "("   ${5} ")"
     * `
     * ```
     */
    readonly branchTop: string | null;
    /**
     * @description
     * Returns the branches that connect the context tree node to its children.
     *
     * The following tree has the `branchesBottom` values next to their
     * corresponding placeholders:
     *
     * ```ts
     * `
     *        ${1} ["(",")"]
     *     (        ).
     *   ${2} []   ${3} [")"]
     *     .          ).
     *               ${5} []
     * `
     * ```
     */
    readonly branchesBottom: string[];
    /**
     * @description
     * Returns the placeholder of the template literal that corresponds to the
     * context node.
     */
    readonly placeholderValue: placeholderType;
    /**
     * @description
     * The tree node that corresponds to the context tree node metadata. It
     * throws error when you get without having set before.
     */
    treeNode: treeNode;
}

export interface ITreeNodeMetadataTreeToString<treeNode>
    extends ITreeNodeMetadataBase<ITreeNodeMetadataTreeToString<treeNode>> {
    /**
     * @description
     * The user defined string representation of the context tree node.
     */
    treeNodeStringRepresentation?: string;
    /**
     * @description
     * The tree node that corresponds to the context metadata.
     */
    readonly treeNode: treeNode;
}

export type ITreeNodeMetadataBase<IExtendedTreeNodeMetadata> = {
    /**
     * @description
     * The height of the subtree of the context tree node.
     *
     * The following tree has the `subTreeHeight` values next to their
     * corresponding placeholders:
     * ```ts
     * `
     *              ${1} 4
     *        (              ).
     *    ${-2} 2           ${7} 3
     *   (       ).        (      ).
     * ${-3} 1 ${-1} 1 ${6} 1    ${10} 2
     *   .        .      .      (       ).
     *                         ${8} 1   ${11} 1
     * `
     * ```
     */
    readonly subTreeHeight: number;
    /**
     * @description
     * The number of nodes of the subtree of the context node.
     *
     * The following tree has the `subTreeLength` values next to their
     * corresponding placeholders:
     * ```ts
     * `
     *              ${1} 9
     *       (                 ).
     *    ${-2} 3           ${7} 5
     *   (        ).     (         ).
     * ${-3} 1 ${-1} 1 ${6} 1    ${10} 3
     *   .       .       .        (     ).
     *                         ${8} 1   ${11} 1
     * `
     * ```
     */
    readonly subTreeLength: number;
    /**
     * @description
     * The tree node metadata of the parent tree node of the context node.
     */
    readonly parent: IExtendedTreeNodeMetadata | null;
    /**
     * @description
     * The tree node metadata of the left sibling of the context. For horizontal
     * tree you can treat it as bottom sibling.
     *
     * The following tree has the `leftSibling` values next to their
     * corresponding placeholders:
     *
     * ```ts
     * `
     *              ${1} null
     *       (                   ).
     *    ${-2} null           ${7} -2
     *   (        ).         (          ).
     * ${-3} null ${-1} -3 ${6} null   ${10} 6
     *   .           .       .        (       ).
     *                              ${8} null ${11} 8
     * `
     * ```
     */
    readonly leftSibling: IExtendedTreeNodeMetadata | null;
    /**
     * @description
     * The tree node metadata of the right sibling of the context. For
     * horizontal tree you can treat it as top sibling.
     *
     * The following tree has the `rightSibling` values next to their
     * corresponding placeholders:
     * ```ts
     * `
     *              ${1} null
     *       (                     ).
     *    ${-2} 7                 ${7} null
     *   (       ).             (          ).
     * ${-3} -1 ${-1} null ${6} 10      ${10} null
     *   .         .         .        (           ).
     *                               ${8} 11   ${11} null
     * `
     * ```
     */
    readonly rightSibling: IExtendedTreeNodeMetadata | null;
    /**
     * @description
     * The tree node metadata of the left sibling group of the context. For
     * horizontal tree you can treat it as bot sibling group.
     *
     * The following tree has the `leftSiblingGroup` values next to their
     * corresponding placeholders:
     * ```ts
     * `
     *                ${1} null
     *       (                      ).
     *    ${-2} null               ${7} null
     *   (           ).          (          ).
     * ${-3} null ${-1} null  ${6} [-3,-1]   ${10} [-3,-1]
     *   .          .           .            (       ).
     *                                     ${8} null  ${11} null
     * `
     * ```
     */
    readonly leftSiblingGroup: IExtendedTreeNodeMetadata[] | null;
    /**
     * @description
     * The tree node metadata of the right sibling group of the context. For
     * horizontal tree you can treat it as top sibling group.
     *
     * The following tree has the `rightSiblingGroup` values next to their
     * corresponding placeholders:
     * ```ts
     * `
     *                ${1} null
     *       (                      ).
     *    ${-2} null                ${7} null
     *   (           ).            (          ).
     * ${-3} [6,10] ${-1} [6,10] ${6} null     ${10} null
     *   .            .            .          (          ).
     *                                      ${8} null  ${11} null
     * `
     * ```
     */
    readonly rightSiblingGroup: IExtendedTreeNodeMetadata[] | null;
    /**
     * @description
     * The tree node metadata of the sibling group of the context.
     *
     * The following tree has the `currentSiblingGroup` values next to their
     * corresponding placeholders:
     * ```ts
     * `
     *                   ${1} [1]
     *               (                 ).
     *    ${-2} [-2,7]                  ${7} [-2,7]
     *   (           ).               (            ).
     * ${-3} [-3,-1] ${-1} [-3,-1] ${6} [6,10]      ${10} [6,10]
     *   .             .             .            (          ).
     *                                        ${8} [8,11]  ${11} [8,11]
     * `
     * ```
     */
    readonly currentSiblingGroup: IExtendedTreeNodeMetadata[];
    /**
     * @description
     * The tree node metadata of the children group of the context.
     *
     * The following tree has the `childrenGroup` values next to their
     * corresponding placeholders:
     *
     * ```ts
     * `
     *          ${1} [-2,7]
     *      (                ).
     *    ${-2} [-3,-1]     ${7} [6,10]
     *   (        ).       (      ).
     * ${-3} [] ${-1} [] ${6} []  ${10} [8,11]
     *   .         .       .      (       ).
     *                           ${8} [] ${11} []
     * `
     * ```
     */
    readonly childrenGroup: IExtendedTreeNodeMetadata[];
    /**
     * @description
     * Tree node metadata in level order.
     */
    readonly all: IExtendedTreeNodeMetadata[];
};

export type ITreeToStringHorizontalFactory = <treeNodeOrTreeRootNode, tree>(strategy: {
    /**
     * @description
     * A function that given a node from the tree, returns its immediate
     * children.
     */
    getChildren: IGetChildren<treeNodeOrTreeRootNode>;
    /**
     * @description
     * A function that given the tree returns its root node.
     */
    getRoot: IGetRoot<tree, treeNodeOrTreeRootNode>;
    /**
     * @description
     * Function that converts a tree node to string.
     */
    nodeToString: (parameters: {
        treeNodeMetadata: ITreeNodeMetadataTreeToString<treeNodeOrTreeRootNode>;
    }) => string;
}) => ITreeToString<tree>;

type ITreeToString<tree> = (parameters: {
    /**
     * @description
     * Tree to convert to string.
     */
    tree: tree;
}) => string;
