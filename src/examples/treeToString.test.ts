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
