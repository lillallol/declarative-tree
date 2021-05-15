import {
    patchTree,
    IPatchTree,
    IPatchTreeNode,
    patchTreeGetChildren,
    patchTreeGetRoot,
    IStateTree,
    IStateTreeNode,
    stateTree,
    stateTreeGetChildren,
    stateTreeGetRoot,
    isSerializablePrimitive,
    tagUnindent
} from "../../test-utils/index";
import { treeToStringHorizontalFactory } from "./treeToStringHorizontal";

describe(treeToStringHorizontalFactory.name, () => {
    describe("prints the provided tree to string", () => {
        test("patch tree of m-mutable", () => {
            const returnedString = treeToStringHorizontalFactory<IPatchTreeNode, IPatchTree>({
                getChildren: patchTreeGetChildren,
                getRoot: patchTreeGetRoot,
                nodeToString: ({ treeNodeMetadata }) => {
                    const { treeNode: node } = treeNodeMetadata;
                    if (node.parent === null) return " ";
                    let stringToReturn = "";
                    stringToReturn += node.key;
                    if (node.branchType === "leaf") {
                        if (node.newValue === undefined) {
                            stringToReturn += " - " + JSON.stringify(node.oldValue);
                        } else if (node.oldValue === undefined) {
                            stringToReturn += " + " + JSON.stringify(node.newValue);
                        } else {
                            stringToReturn +=
                                " " + JSON.stringify(node.oldValue) + " => " + JSON.stringify(node.newValue);
                        }
                    }
                    return stringToReturn;
                },
            })({ tree: patchTree });
            const expected = tagUnindent`
                 
                |_ a 1 => 2
                |_ b
                   |_ c + {"a":1,"b":2}
                   |_ d - "hello world"
            `;
            // console.log(returnedString.replace(/ /g,"."));
            // console.log(expected.replace(/ /g,"."));
            expect(returnedString).toBe(expected);
        });
        test("state for m-mutable", () => {
            const string = treeToStringHorizontalFactory<IStateTreeNode, IStateTree>({
                getChildren: stateTreeGetChildren,
                getRoot: stateTreeGetRoot,
                nodeToString: ({ treeNodeMetadata }) => {
                    const { p, v } = treeNodeMetadata.treeNode;
                    if (isSerializablePrimitive(v)) return `${p} ${typeof v === "string" ? `"${v}"` : v}`;
                    else return p;
                },
            })({ tree: stateTree });
            expect(string).toBe(tagUnindent`
                root
                |_ obj
                |  |_ a
                |     |_ 0 1
                |     |_ 1 2
                |     |_ length 2
                |_ a 1
                |_ b "3"
            `);
        });
    });
});
