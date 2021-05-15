class AvlTreeBaseNode {
    left: null | AvlTreeNode;
    right: null | AvlTreeNode;
    id: number;

    constructor(_: AvlTreeBaseNode) {
        const { id, left, right } = _;
        this.id = id;
        this.left = left;
        this.right = right;
    }
}

export class AvlTreeRootNode extends AvlTreeBaseNode {
    parent: null;

    constructor(_: AvlTreeRootNode) {
        const { id, left, right } = _;
        super({
            id,
            left,
            right,
        });
        this.parent = null;
    }
}

export class AvlTreeNode extends AvlTreeBaseNode {
    parent: AvlTreeNode | AvlTreeRootNode;

    constructor(_: AvlTreeNode) {
        const { parent, right, left, id } = _;
        super({
            id,
            left,
            right,
        });
        this.parent = parent;
    }
}

export class AvlTree {
    root: AvlTreeRootNode;

    constructor(_: { root: AvlTreeRootNode }) {
        const { root } = _;
        this.root = root;
    }
}

/**
 * @description
 * The tree looks like this:
 * ```
 * 20
 * |_ 25
 * |_ 10
 *    |_ 5
 * ```
 */
export const mockAvlTree: AvlTree = (() => {
    const root: AvlTreeRootNode = new AvlTreeRootNode({
        id: 20,
        left: null, //lazy setted
        parent: null,
        right: null, //lazy setted
    });
    const tree: AvlTree = new AvlTree({
        root,
    });
    const left: AvlTreeNode = new AvlTreeNode({
        id: 10,
        left: null, //lazy setted
        parent: root,
        right: null,
    });
    const leftLeft: AvlTreeNode = new AvlTreeNode({
        id: 5,
        left: null,
        parent: left,
        right: null,
    });
    const right: AvlTreeNode = new AvlTreeNode({
        id: 25,
        left: null,
        parent: root,
        right: null,
    });

    root.left = left;
    root.right = right;

    left.left = leftLeft;

    return tree;
})();
