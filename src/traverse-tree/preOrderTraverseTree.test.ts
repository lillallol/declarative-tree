import { avlTree, avlTreeGetChildren, avlTreeGetRoot, IAvlTreeNode } from "../test-utils/index";
import { preOrderTraverseTree } from "./preOrderTraverseTree";

describe(preOrderTraverseTree.name, () => {
    it("iterates the provided tree and executes the for each node the provided callback", () => {
        const iteratedNodeValues: IAvlTreeNode[] = [];
        preOrderTraverseTree<IAvlTreeNode>({
            root: avlTreeGetRoot({
                tree: avlTree,
            }),
            getChildren: avlTreeGetChildren,
            cb: ({ currentNode }) => {
                iteratedNodeValues.push(currentNode);
            },
        });
        // `
        //         ${1}
        //         (  ).
        //     ${-2}  ${7}
        //        .   (   ).
        //           ${6}${10}
        //            .      ).
        //                ${11}
        //                (.
        //                ${3}
        //                   ).
        //                   ${4}
        // `;
        expect(iteratedNodeValues.map((n) => n.id)).toStrictEqual([1, -2, 7, 6, 10, 11, 3, 4]);
    });
});
