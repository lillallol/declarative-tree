import { stringToTreeVerticalFactory } from "../string-to-tree/vertical/verticalTreeStringToTreeFactory";

type baseNode = {
    left: null | IAvlTreeNode;
    right: null | IAvlTreeNode;
    id: number;
    height: number;
};

export type IAvlTreeNode = {
    parent: null | IAvlTreeNode;
} & baseNode;

export type IAvlTreeRootNode = {
    parent: null;
} & baseNode;

export type IAvlTree = {
    root: IAvlTreeRootNode;
};

export const avlTreeFromVerticalTreeString = stringToTreeVerticalFactory<
    number,
    IAvlTreeNode,
    { root: IAvlTreeRootNode }
>({
    strategy: ({ treeNodeMetadataInLevelOrder: all }) => {
        const root: IAvlTreeRootNode = {
            height: all[0].subTreeHeight,
            id: all[0].placeholderValue,
            left: null,
            parent: null,
            right: null,
        };
        all[0].treeNode = root;

        all.forEach((data, i) => {
            if (i === 0) return;
            const { parent } = data;
            if (parent === null) throw Error();
            const currentNode: IAvlTreeNode = {
                height: data.subTreeHeight,
                id: data.placeholderValue,
                left: null,
                parent: parent.treeNode,
                right: null,
            };
            data.treeNode = currentNode;

            const branch = data.branchTop;
            if (branch === "(") {
                parent.treeNode.left = currentNode;
            } else if (branch === ")") {
                parent.treeNode.right = currentNode;
            }
            currentNode.parent = parent.treeNode;
        });
        return {
            root: root,
        };
    },
});
