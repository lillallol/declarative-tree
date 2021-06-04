## Table of contents

<!--#region toc-->

- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Description](#description)
- [Code coverage](#code-coverage)
- [Examples](#examples)
    - [tree to string](#tree-to-string)
    - [string to tree horizontal](#string-to-tree-horizontal)
    - [string to tree vertical](#string-to-tree-vertical)
- [Documentation](#documentation)
    - [Concretions](#concretions)
        - [stringToTreeHorizontalFactory](#----stringtotreehorizontalfactory)
        - [stringToTreeVerticalFactory](#----stringtotreeverticalfactory)
        - [treeToStringHorizontalFactory](#----treetostringhorizontalfactory)
- [Motivation](#motivation)
- [Contributing](#contributing)
- [Changelog](#changelog)
    - [1.0.2](#102)
    - [1.0.1](#101)
    - [1.0.0](#100)
- [License](#license)

<!--#endregion toc-->

## Installation

```bash
npm install declarative-tree
```

## Description

Generalized way to convert a string to tree, and vice versa. Useful for creating declarative tree tests.

## Code coverage

The testing code coverage is around 90%.

## Examples

The following examples deal with converting an AVL tree string representation to tree data structure and vice versa. Here is the code that defines the AVL tree:

<!--#region mock-tree !./src/examples/mockTree.ts-->

```ts
class AvlTreeBaseNode {
    left: null | AvlTreeNode;
    right: null | AvlTreeNode;
    id: number;

    constructor(_: AvlTreeBaseNode) {
        const { id, left, right } = _;
        this.id = id;
        this.left = left;
        this.right = right;
    }
}

export class AvlTreeRootNode extends AvlTreeBaseNode {
    parent: null;

    constructor(_: AvlTreeRootNode) {
        const { id, left, right } = _;
        super({
            id,
            left,
            right,
        });
        this.parent = null;
    }
}

export class AvlTreeNode extends AvlTreeBaseNode {
    parent: AvlTreeNode | AvlTreeRootNode;

    constructor(_: AvlTreeNode) {
        const { parent, right, left, id } = _;
        super({
            id,
            left,
            right,
        });
        this.parent = parent;
    }
}

export class AvlTree {
    root: AvlTreeRootNode;

    constructor(_: { root: AvlTreeRootNode }) {
        const { root } = _;
        this.root = root;
    }
}

/**
 * @description
 * The tree looks like this:
 * ```
 * 20
 * |_ 25
 * |_ 10
 *    |_ 5
 * ```
 */
export const mockAvlTree: AvlTree = (() => {
    const root: AvlTreeRootNode = new AvlTreeRootNode({
        id: 20,
        left: null, //lazy setted
        parent: null,
        right: null, //lazy setted
    });
    const tree: AvlTree = new AvlTree({
        root,
    });
    const left: AvlTreeNode = new AvlTreeNode({
        id: 10,
        left: null, //lazy setted
        parent: root,
        right: null,
    });
    const leftLeft: AvlTreeNode = new AvlTreeNode({
        id: 5,
        left: null,
        parent: left,
        right: null,
    });
    const right: AvlTreeNode = new AvlTreeNode({
        id: 25,
        left: null,
        parent: root,
        right: null,
    });

    root.left = left;
    root.right = right;

    left.left = leftLeft;

    return tree;
})();

```

<!--#endregion mock-tree-->

### tree to string

<!--#region tree-to-string !./src/examples/treeToString.test.ts-->

```ts
import { treeToStringHorizontalFactory } from "..";
import { AvlTree, AvlTreeNode, AvlTreeRootNode, mockAvlTree } from "./mockTree";

describe(treeToStringHorizontalFactory.name, () => {
    it(`
        returns a function that converts a tree to string, according to the 
        instructions the factory has been provided
    `, () => {
        const avlTreeToString = treeToStringHorizontalFactory<
            AvlTreeNode | AvlTreeRootNode,
            AvlTree
        >({
            getChildren: ({ treeNode }) => {
                const children: AvlTreeNode[] = [];
                const { left, right } = treeNode;
                if (left !== null) children.push(left);
                if (right !== null) children.push(right);
                return children.reverse();
            },
            getRoot: ({ tree }) => tree.root,
            nodeToString: ({ treeNodeMetadata }) =>
                String(treeNodeMetadata.treeNode.id),
        });

        //prettier-ignore
        expect(avlTreeToString({ tree: mockAvlTree })).toBe(
            `20\n`+
            `|_ 25\n`+
            `|_ 10\n`+
            `   |_ 5`
        );
    });
});

```

<!--#endregion tree-to-string-->

### string to tree horizontal

<!--#region string-to-tree-horizontal !./src/examples/stringToTreeHorizontal.test.ts-->

```ts
import { stringToTreeHorizontalFactory } from "..";
import { AvlTree, AvlTreeNode, AvlTreeRootNode, mockAvlTree } from "./mockTree";

describe(stringToTreeHorizontalFactory.name, () => {
    it(`
        returns a function that converts a string to tree, according to the 
        instructions the factory has been provided
    `, () => {
        const stringToAVLTree = stringToTreeHorizontalFactory<
            number,
            AvlTreeNode | AvlTreeRootNode,
            AvlTree
        >({
            strategy: (parameters) => {
                const root: AvlTreeRootNode = new AvlTreeRootNode({
                    id: parameters.treeNodeMetadataInLevelOrder[0]
                        .placeholderValue,
                    left: null,
                    parent: null,
                    right: null,
                });
                const avlTree: AvlTree = new AvlTree({ root });

                /**
                 * @description
                 * The main idea here is to iterate the tree node metadata, and
                 * use the information they provide to create the tree nodes.
                 * When you create a tree node, set it as the `treeNode`
                 * property of the tree node metadata it corresponds. The sole
                 * reason for that is that maybe you will need to access that
                 * node from other nodes.
                 */
                parameters.treeNodeMetadataInLevelOrder.forEach(
                    (treeNodeMetadata, i) => {
                        if (i === 0) {
                            treeNodeMetadata.treeNode = root;
                            return;
                        }
                        if (i !== 0) {
                            const parentTreeNodeMetadata =
                                treeNodeMetadata.parent;
                            if (parentTreeNodeMetadata === null) {
                                throw Error(
                                    "only the parent tree node metadata of" +
                                        "the root node can be null"
                                );
                            }
                            const parent = parentTreeNodeMetadata.treeNode;

                            const currentNode: AvlTreeNode = new AvlTreeNode({
                                id: treeNodeMetadata.placeholderValue,
                                left: null,
                                right: null,
                                parent,
                            });

                            treeNodeMetadata.treeNode = currentNode;

                            /**
                             * @description
                             * Here I connect the parent node with its child
                             * node. The only way to understand whether the
                             * child node is a left or right child, is through
                             * the brach that connects them.
                             * You are free to use the character that you see
                             * fit for branches. In this example I choose to use
                             * `⏝` for left branch and `⏜` for right branch.
                             * The branch character that you use has to be used
                             * in the tag function that is returned by the
                             * factory. Take a look at the test assertion a few
                             * lines bellow where the tag function is used.
                             */
                            if (treeNodeMetadata.branchTop === "⏝") {
                                parent.left = currentNode;
                                return;
                            }
                            if (treeNodeMetadata.branchTop === "⏜") {
                                parent.right = currentNode;
                                return;
                            }
                            throw Error(
                                `encountered branch that is not "⏝" or "⏜"`
                            );
                        }
                        throw Error("case not accounted for");
                    }
                );

                return avlTree;
            },
        });

        expect(stringToAVLTree`
            ${20}
            |⏜ ${25}
            |⏝ ${10}
               |⏝ ${5}
        `).toEqual(mockAvlTree);
    });
});

```

<!--#endregion string-to-tree-horizontal-->

### string to tree vertical

<!--#region string-to-tree-vertical !./src/examples/stringToTreeVertical.test.ts-->

```ts
import { stringToTreeVerticalFactory } from "..";
import { AvlTree, AvlTreeNode, AvlTreeRootNode, mockAvlTree } from "./mockTree";

describe(stringToTreeVerticalFactory.name, () => {
    it(`
        returns a function that converts a string to tree, according to the 
        instructions the factory has been provided
    `, () => {
        const stringToAvlTree = stringToTreeVerticalFactory<
            number,
            AvlTreeNode | AvlTreeRootNode,
            AvlTree
        >({
            strategy: (parameters) => {
                const root: AvlTreeRootNode = new AvlTreeRootNode({
                    id: parameters.treeNodeMetadataInLevelOrder[0]
                        .placeholderValue,
                    left: null,
                    parent: null,
                    right: null,
                });
                const avlTree: AvlTree = new AvlTree({ root });

                /**
                 * @description
                 * The main idea here is to iterate the tree node metadata, and
                 * use the information they provide to create the tree nodes.
                 * When you create a tree node, set it as the `treeNode`
                 * property of the tree node metadata it corresponds. The sole
                 * reason for that is that maybe you will need to access that
                 * node from other nodes.
                 */
                parameters.treeNodeMetadataInLevelOrder.forEach(
                    (treeNodeMetadata, i) => {
                        if (i === 0) {
                            treeNodeMetadata.treeNode = root;
                            return;
                        }
                        if (i !== 0) {
                            const parentTreeNodeMetadata =
                                treeNodeMetadata.parent;
                            if (parentTreeNodeMetadata === null) {
                                throw Error(
                                    "only the parent tree node metadata of " +
                                        "the root node can be null"
                                );
                            }
                            const parent = parentTreeNodeMetadata.treeNode;

                            const currentNode: AvlTreeNode = new AvlTreeNode({
                                id: treeNodeMetadata.placeholderValue,
                                left: null,
                                right: null,
                                parent,
                            });

                            treeNodeMetadata.treeNode = currentNode;

                            /**
                             * @description
                             * Here I connect the parent node with its child
                             * node. The only way to understand whether the
                             * child node is a left or right child, is through
                             * the brach that connects them.
                             * You are free to use the character that you see
                             * fit for branches. In this example I choose to use
                             * `(` for left branch and `)` for right branch. The
                             * branch character that you use has to be used in
                             * the tag function that is returned by the factory.
                             * Take a look at the test assertion a few lines
                             * bellow where the tag function is used.
                             */
                            if (treeNodeMetadata.branchTop === "(") {
                                parent.left = currentNode;
                                return;
                            }
                            if (treeNodeMetadata.branchTop === ")") {
                                parent.right = currentNode;
                                return;
                            }
                            throw Error(
                                `encountered branch that is not "(" or ")"`
                            );
                        }
                        throw Error("case not accounted for");
                    }
                );

                return avlTree;
            },
        });

        /**
         * @description
         * You have to add dots. They define where the children group ends. You
         * do no need to do that in the last row of the tree. For example in the
         * following tree the tree node with id `20` has `10` and `25` as
         * children group. The group ends at `25` and hence the dot in the
         * branch above `25`. The tree node with id `10` has children group that
         * consist only of the tree node with id `5` and hence the dot on its
         * branch. The tree node with id `25` has no children so it has a dot
         * with no branches.
         */
        expect(stringToAvlTree`
                   ${20}
                (        ).
              ${10}     ${25}
            (.            .
            ${5}
        `).toEqual(mockAvlTree);
    });
});

```

<!--#endregion string-to-tree-vertical-->

## Documentation

<!--#region documentation ./documentation.md-->

<h3 id="-concretions">Concretions</h3>
<h4 id="-concretion-stringToTreeHorizontalFactory">
    stringToTreeHorizontalFactory
</h4>

```ts
/**
 * @description
 * Returns a tag function that converts template literals to tree data
 * structures, in accordance to the instructions you have provided to the
 * factory.
 */
export declare const stringToTreeHorizontalFactory: IStringToTreeFactory;

```

<details open="">
<summary id="-concretion-stringToTreeHorizontalFactory-references">
    <a href="#-concretion-stringToTreeHorizontalFactory-references">#</a>
    references
</summary>

<br>

<blockquote>
<details>
<summary id="-concretion-stringToTreeHorizontalFactory-references-IStringToTreeFactory">
    <a href="#-concretion-stringToTreeHorizontalFactory-references-IStringToTreeFactory">#</a>
    <b>IStringToTreeFactory</b>
</summary>
        
```ts
export declare type IStringToTreeFactory = <placeholder, treeNode, tree>(parameters: {
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
```




</details>
<blockquote>
<details>
<summary id="-concretion-stringToTreeHorizontalFactory-references-IStringToTreeFactory-ITreeNodeMetadataStringToTree">
    <a href="#-concretion-stringToTreeHorizontalFactory-references-IStringToTreeFactory-ITreeNodeMetadataStringToTree">#</a>
    <b>ITreeNodeMetadataStringToTree</b>
</summary>
        
```ts
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
```



</details>
<blockquote>
<details>
<summary id="-concretion-stringToTreeHorizontalFactory-references-IStringToTreeFactory-ITreeNodeMetadataStringToTree-ITreeNodeMetadataBase">
    <a href="#-concretion-stringToTreeHorizontalFactory-references-IStringToTreeFactory-ITreeNodeMetadataStringToTree-ITreeNodeMetadataBase">#</a>
    <b>ITreeNodeMetadataBase</b>
</summary>
        
```ts
export declare type ITreeNodeMetadataBase<IExtendedTreeNodeMetadata> = {
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
```



</details>

</blockquote><details>
<summary id="-concretion-stringToTreeHorizontalFactory-references-IStringToTreeFactory-IStringToTree">
    <a href="#-concretion-stringToTreeHorizontalFactory-references-IStringToTreeFactory-IStringToTree">#</a>
    <b>IStringToTree</b>
</summary>
        
```ts
export declare type IStringToTree<placeholder, tree> = (strings: TemplateStringsArray, ...placeholders: placeholder[]) => tree;
```



</details>

</blockquote>
</blockquote>
</details>
<hr>

<h4 id="-concretion-stringToTreeVerticalFactory">
    stringToTreeVerticalFactory
</h4>

```ts
/**
 * @description
 * Returns a tag function that converts template literals to tree data
 * structures, in accordance to the instructions you have provided to the
 * factory.
 */
export declare const stringToTreeVerticalFactory: IStringToTreeFactory;

```

<details open="">
<summary id="-concretion-stringToTreeVerticalFactory-references">
    <a href="#-concretion-stringToTreeVerticalFactory-references">#</a>
    references
</summary>

<br>

<blockquote>
<details>
<summary id="-concretion-stringToTreeVerticalFactory-references-IStringToTreeFactory">
    <a href="#-concretion-stringToTreeVerticalFactory-references-IStringToTreeFactory">#</a>
    <b>IStringToTreeFactory</b>
</summary>
        
```ts
export declare type IStringToTreeFactory = <placeholder, treeNode, tree>(parameters: {
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
```




</details>
<blockquote>
<details>
<summary id="-concretion-stringToTreeVerticalFactory-references-IStringToTreeFactory-ITreeNodeMetadataStringToTree">
    <a href="#-concretion-stringToTreeVerticalFactory-references-IStringToTreeFactory-ITreeNodeMetadataStringToTree">#</a>
    <b>ITreeNodeMetadataStringToTree</b>
</summary>
        
```ts
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
```



</details>
<blockquote>
<details>
<summary id="-concretion-stringToTreeVerticalFactory-references-IStringToTreeFactory-ITreeNodeMetadataStringToTree-ITreeNodeMetadataBase">
    <a href="#-concretion-stringToTreeVerticalFactory-references-IStringToTreeFactory-ITreeNodeMetadataStringToTree-ITreeNodeMetadataBase">#</a>
    <b>ITreeNodeMetadataBase</b>
</summary>
        
```ts
export declare type ITreeNodeMetadataBase<IExtendedTreeNodeMetadata> = {
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
```



</details>

</blockquote><details>
<summary id="-concretion-stringToTreeVerticalFactory-references-IStringToTreeFactory-IStringToTree">
    <a href="#-concretion-stringToTreeVerticalFactory-references-IStringToTreeFactory-IStringToTree">#</a>
    <b>IStringToTree</b>
</summary>
        
```ts
export declare type IStringToTree<placeholder, tree> = (strings: TemplateStringsArray, ...placeholders: placeholder[]) => tree;
```



</details>

</blockquote>
</blockquote>
</details>
<hr>

<h4 id="-concretion-treeToStringHorizontalFactory">
    treeToStringHorizontalFactory
</h4>

```ts
/**
 * @description
 * Returns a function that converts tree data structures to horizontal tree
 * string representations, in accordance to the instructions you have provided
 * to the factory.
 */
export declare const treeToStringHorizontalFactory: ITreeToStringHorizontalFactory;

```

<details open="">
<summary id="-concretion-treeToStringHorizontalFactory-references">
    <a href="#-concretion-treeToStringHorizontalFactory-references">#</a>
    references
</summary>

<br>

<blockquote>
<details>
<summary id="-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory">
    <a href="#-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory">#</a>
    <b>ITreeToStringHorizontalFactory</b>
</summary>
        
```ts
export declare type ITreeToStringHorizontalFactory = <treeNodeOrTreeRootNode, tree>(strategy: {
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
    nodeToString: (parameters: { treeNodeMetadata: ITreeNodeMetadataTreeToString<treeNodeOrTreeRootNode> }) => string;
}) => ITreeToString<tree>;
```






</details>
<blockquote>
<details>
<summary id="-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-IGetChildren">
    <a href="#-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-IGetChildren">#</a>
    <b>IGetChildren</b>
</summary>
        
```ts
export declare type IGetChildren<treeNodeOrTreeRootNode> = (parameters: {
    /**
     * @description
     * The tree node from which you want to get the children.
     */
    treeNode: treeNodeOrTreeRootNode;
}) => treeNodeOrTreeRootNode[];
```



</details>
<details>
<summary id="-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-IGetRoot">
    <a href="#-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-IGetRoot">#</a>
    <b>IGetRoot</b>
</summary>
        
```ts
export declare type IGetRoot<tree, treeNode> = (parameters: {
    /**
     * @description
     * The tree from which you want to get the root.
     */
    tree: tree;
}) => treeNode;
```



</details>
<details>
<summary id="-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-ITreeNodeMetadataTreeToString">
    <a href="#-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-ITreeNodeMetadataTreeToString">#</a>
    <b>ITreeNodeMetadataTreeToString</b>
</summary>
        
```ts
export interface ITreeNodeMetadataTreeToString<treeNode> extends ITreeNodeMetadataBase<ITreeNodeMetadataTreeToString<treeNode>> {
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
```



</details>
<blockquote>
<details>
<summary id="-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-ITreeNodeMetadataTreeToString-ITreeNodeMetadataBase">
    <a href="#-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-ITreeNodeMetadataTreeToString-ITreeNodeMetadataBase">#</a>
    <b>ITreeNodeMetadataBase</b>
</summary>
        
```ts
export declare type ITreeNodeMetadataBase<IExtendedTreeNodeMetadata> = {
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
```



</details>

</blockquote><details>
<summary id="-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-ITreeToString">
    <a href="#-concretion-treeToStringHorizontalFactory-references-ITreeToStringHorizontalFactory-ITreeToString">#</a>
    <b>ITreeToString</b>
</summary>
        
```ts
declare type ITreeToString<tree> = (parameters: {
    /**
     * @description
     * Tree to convert to string.
     */
    tree: tree;
}) => string;
```



</details>

</blockquote>
</blockquote>
</details>
<hr>


<!--#endregion documentation-->

## Motivation

I just wanted to create declarative tree tests for any kind of tree. No packages in npm could do that, so I decided to create my own.

## Contributing

I am open to suggestions/pull request to improve this program.

You will find the following commands useful:

-   Clones the github repository of this project:

    ```bash
    git clone https://github.com/lillallol/declarative-tree
    ```

-   Installs the node modules (nothing will work without them):

    ```bash
    npm install
    ```

-   Tests the code and generates code coverage:

    ```bash
    npm run test
    ```

    The generated code coverage is saved in `./coverage`.

-   Lints the source folder using typescript and eslint:

    ```bash
    npm run lint
    ```

-   Builds the typescript code from the `./src` folder to javascript code in `./dist`:

    ```bash
    npm run build-ts
    ```

-   Injects in place the generated toc and imported files to `README.md`:

    ```bash
    npm run build-md
    ```

-   Checks the project for spelling mistakes:

    ```bash
    npm run spell-check
    ```

    Take a look at the related configuration `./cspell.json`.

-   Checks `./src` for dead typescript files:

    ```bash
    npm run dead-files
    ```

    Take a look at the related configuration `./unimportedrc.json`.

-   Logs which node modules can be updated:

    ```bash
    npm run check-updates
    ```

-   Updates the node modules to their latest version (even if they introduce breaking changes):

    ```bash
    npm run update
    ```

-   Formats all the typescript files in the `./src` folder:

    ```bash
    npm run format
    ```

## Changelog

### 1.0.2

**Bugs fixed**

-   Placeholders groups were being over flattened. For example the following template literal:

    ```ts
    `
        ${""}
        |_ ${"p"}
           |_ ${"a"}
              |_ ${"t"}
                 |_ ${"h"}
                    |_ ${["prop1", -1, "=>", 1]}
    `
    ```

    would wrongly have as placeholders:

    ```ts
    ["","p","a","t","h",...["prop1", -1, "=>", 1]]
    ```

    instead of:

    ```ts
    ["","p","a","t","h",["prop1", -1, "=>", 1]]
    ```

### 1.0.1

-   Fixed some mistakes in the examples.
-   Minor internal changes.

### 1.0.0

-   Published the package.

## License

MIT
