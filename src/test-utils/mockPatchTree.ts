import { IGetChildren, IGetRoot } from "../publicApi";


type baseNode = {
    branches: { [x: string]: childNode };

    branchType: "branch" | "leaf";
    newValue: unknown;
    oldValue: unknown;
};
type childNode = {
    parent: IPatchTreeNode;
    key: string;
} & baseNode;
type rootNode = {
    parent: null;
    key: null;
} & baseNode;

export type IPatchTreeNode = rootNode | childNode;

export type IPatchTree = {
    root: rootNode;
};

export const patchTree: IPatchTree = {
    root: {
        branchType: "branch",
        branches: {},
        key: null,
        newValue: undefined,
        oldValue: undefined,
        parent: null,
    },
};
patchTree.root.branches.a = {
    branchType: "leaf",
    branches: {},
    key: "a",
    newValue: 2,
    oldValue: 1,
    parent: patchTree.root,
};
patchTree.root.branches.b = {
    branchType: "branch",
    branches: {},
    key: "b",
    newValue: undefined,
    oldValue: undefined,
    parent: patchTree.root,
};
patchTree.root.branches.b.branches.c = {
    branchType: "leaf",
    branches: {},
    key: "c",
    newValue: { a: 1, b: 2 },
    oldValue: undefined,
    parent: patchTree.root.branches.b,
};
patchTree.root.branches.b.branches.d = {
    branchType: "leaf",
    branches: {},
    key: "d",
    newValue: undefined,
    oldValue: "hello world",
    parent: patchTree.root.branches.b,
};

export const patchTreeGetChildren: IGetChildren<IPatchTreeNode> = ({ treeNode }) => {
    return Object.values(treeNode.branches);
};
export const patchTreeGetRoot: IGetRoot<IPatchTree, IPatchTreeNode> = ({ tree }) => {
    return tree.root;
};
