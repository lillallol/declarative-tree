import { stringToTreeHorizontalFactory } from "./horizontalTreeStringToTreeFactory";

describe(stringToTreeHorizontalFactory.name, () => {
    it("creates and returns the tree from the provided horizontal tree string representation", () => {
        type treeNode = {
            parent: null | treeNode;
            left: null | treeNode;
            right: null | treeNode;
            id: number;
            height: number;
        };
        type treeType = {
            root: treeNode;
        };
        const stringToTree = stringToTreeHorizontalFactory<number, treeNode, treeType>({
            strategy: ({ treeNodeMetadataInLevelOrder: all }) => {
                const root: treeNode = {
                    height: all[0].subTreeHeight,
                    id: all[0].placeholderValue,
                    left: null,
                    parent: null,
                    right: null,
                };
                all[0].treeNode = root;
                console.log(all.length);
                all.forEach((data, i) => {
                    if (i === 0) return;
                    const { parent } = data;
                    if (parent === null) throw Error();
                    const currentNode: treeNode = {
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

        const { root } = stringToTree`
            ${1}
            |) ${7}
            |  |) ${10}
            |  |  |) ${11}
            |  |     |( ${10.5}
            |  |        |) ${10.75}
            |  |( ${6}
            |( ${-2}  
        `;
        //    A
        // (    ).
        // B    C
        // .  (  ).
        //    D  E
        //    .  ).
        //       F
        //      (.
        //      G
        //       ).
        //       H
        const A = root;
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
        expect(H.id).toBe(10.75);
        expect(H.parent).toBe(G);
        expect(H.left).toBe(null);
        expect(H.right).toBe(null);
        expect(H.height).toBe(1);
        //G
        expect(G.id).toBe(10.5);
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
