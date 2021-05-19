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
