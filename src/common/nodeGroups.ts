import { IGetChildren } from "../publicApi";

/**
 * @description Tree nodes level order. Better described level order as defined by getChildren.
 */
export function nodeGroups<treeNodeOrTreeRootNode>(_: {
    getChildren: IGetChildren<treeNodeOrTreeRootNode>;
    root: treeNodeOrTreeRootNode;
}): treeNodeOrTreeRootNode[][][] {
    const { getChildren, root } = _;
    const nodeRows: treeNodeOrTreeRootNode[][][] = [[[root]]];

    (function recurse(currentNode: treeNodeOrTreeRootNode, depth: number) {
        const children = getChildren({ treeNode: currentNode });
        if (nodeRows[depth + 1] === undefined) nodeRows[depth + 1] = [];
        nodeRows[depth + 1].push(children);
        children.forEach((child) => {
            recurse(child, depth + 1);
        });
    })(root, 0);

    return nodeRows;
}
