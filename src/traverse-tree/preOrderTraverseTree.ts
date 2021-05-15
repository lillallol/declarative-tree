import { IGetChildren } from "../publicApi";

/**
 * @description
 * It executes a pre order traversal of the provided tree and executes the provided callback for each node.
 */
export function preOrderTraverseTree<N>(_: {
    /**
     * @description
     * The root node of the tree to be iterated.
     */
    root: N;
    /**
     * @description
     * A function that given whichever node from the tree, returns its immediate children.
     * The order of the nodes in the returned array will define pre order iteration.
     */
    getChildren: IGetChildren<N>;
    /**
     * @description
     * Callback to be executed for each tree node in pre order (as defined with `getChildren`).
     */
    cb: (_: { currentNode: N }) => void;
}): void {
    const { getChildren, root, cb } = _;
    (function recurse(currentNode: N): void {
        cb({ currentNode });
        const children = getChildren({ treeNode: currentNode });
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            recurse(child);
        }
    })(root);
}
