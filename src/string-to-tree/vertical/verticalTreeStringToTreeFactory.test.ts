import { stringToTreeVerticalFactory } from "./verticalTreeStringToTreeFactory";

describe(stringToTreeVerticalFactory.name, () => {
    it("creates a tree from the provided string literal and returns its root node", () => {
        type treeNode = {
            parent: null | treeNode;
            left: null | treeNode;
            right: null | treeNode;
            id: number;
            height: number;
        };

        type tree = {
            root: treeNode;
        };

        const stringToTree = stringToTreeVerticalFactory<
            // the type of the placeholder in the template literal
            number,
            treeNode,
            tree
        >({
            strategy: (
                // contains a lot of information about each tree node
                // hover on it and its properties to get more information
                { treeNodeMetadataInLevelOrder: all }
            ) => {
                const root: treeNode = {
                    height: all[0].subTreeHeight,
                    id: all[0].placeholderValue,
                    left: null,
                    parent: null,
                    right: null,
                };

                //have to define the tree node for each tree node metadata
                all[0].treeNode = root;

                all.forEach((treeNodeMetadata, i) => {
                    if (i === 0) return;
                    const { parent } = treeNodeMetadata;
                    if (parent === null) throw Error();
                    const currentNode: treeNode = {
                        height: treeNodeMetadata.subTreeHeight,
                        id: treeNodeMetadata.placeholderValue,
                        left: null,
                        parent: parent.treeNode,
                        right: null,
                    };
                    treeNodeMetadata.treeNode = currentNode;

                    const branch = treeNodeMetadata.branchTop;
                    // if the branch that connects the current node with its parent is
                    if (branch === "(") {
                        parent.treeNode.left = currentNode;
                    } else if (branch === ")") {
                        parent.treeNode.right = currentNode;
                    }
                    currentNode.parent = parent.treeNode;
                });

                //have to return the tree
                return {
                    root: root,
                };
            },
        });

        //the "." specifies where the children group of the parent node ends
        //there is no need to add "." in the final row of placeholders
        const tree = stringToTree`
               ${1}
               (  ).
            ${-2}  ${7}
               .  (   ).
                 ${6}${10}
                  .      ).
                      ${11}
                      (.
                      ${3} 
                         ).
                         ${4}
        `;
        //      A
        // (        ).
        // B           C
        // .        (     ).
        //          D     E
        //          .     ).
        //                F
        //               (.
        //               G
        //                     ).
        //                     H
        const A = tree.root;
        const B = A.left;
        if (B === null) throw Error();
        const C = A.right;
        if (C === null) throw Error();
        const D = C.left;
        if (D === null) throw Error();
        const E = C.right;
        if (E === null) throw Error();
        const F = E.right;
        if (F === null) throw Error();
        const G = F.left;
        if (G === null) throw Error();
        const H = G.right;
        if (H === null) throw Error();

        //H
        expect(H.id).toBe(4);
        expect(H.parent).toBe(G);
        expect(H.left).toBe(null);
        expect(H.right).toBe(null);
        expect(H.height).toBe(1);
        //G
        expect(G.id).toBe(3);
        expect(G.parent).toBe(F);
        expect(G.left).toBe(null);
        expect(G.right).toBe(H);
        expect(G.height).toBe(2);
        //F
        expect(F.id).toBe(11);
        expect(F.parent).toBe(E);
        expect(F.left).toBe(G);
        expect(F.right).toBe(null);
        expect(F.height).toBe(3);
        //E
        expect(E.id).toBe(10);
        expect(E.parent).toBe(C);
        expect(E.left).toBe(null);
        expect(E.right).toBe(F);
        expect(E.height).toBe(4);
        //D
        expect(D.id).toBe(6);
        expect(D.parent).toBe(C);
        expect(D.left).toBe(null);
        expect(D.right).toBe(null);
        expect(D.height).toBe(1);
        //C
        expect(C.id).toBe(7);
        expect(C.parent).toBe(A);
        expect(C.left).toBe(D);
        expect(C.right).toBe(E);
        expect(C.height).toBe(5);
        //B
        expect(B.id).toBe(-2);
        expect(B.parent).toBe(A);
        expect(B.left).toBe(null);
        expect(B.right).toBe(null);
        expect(B.height).toBe(1);
        //A
        expect(A.id).toBe(1);
        expect(A.parent).toBe(null);
        expect(A.left).toBe(B);
        expect(A.right).toBe(C);
        expect(A.height).toBe(6);
    });
});
