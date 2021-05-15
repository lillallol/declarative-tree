/**
 * @description It calls the provided callback for each parent and children diplet.
 * @todo investigate whether iterating the last tree row would also be useful
 */
export function iterateParentToChildrenDiplets<T>(_: {
    placeholderGroups: T[][][];
    placeholderGroupsIndex: number[][][];
    direction: "top-left-to-bottom-right" | "bottom-right-to-top-left";
    cb: (_: {
        /**
         * @description The `i` of the placeholders grouped of the parent placeholder.
         * @example @todo
         */
        i: number;
        /**
         * @description The `j` of the placeholders grouped of the parent placeholder.
         * @example @todo
         */
        j: number;
        /**
         * @description The `j` of the placeholders grouped of the children placeholders.
         * @example @todo
         */
        jBot: number;
        /**
         * @description The `k` of the placeholders grouped of the parent placeholder.
         * @example @todo
         */
        k: number;
        /**
         * @description The parent placeholder.
         * @example @todo
         */
        parent: T;
        /**
         * @description The group of the children placeholders.
         * @example @todo
         */
        children: T[];
        /**
         * @description The placeholder index of the parent.
         * @example @todo
         */
        parentIndex: number;
        /**
         * @description The placeholder indexes of the children.
         * @example @todo
         */
        childrenIndex: number[];
    }) => void;
}): void {
    const { cb, placeholderGroups, placeholderGroupsIndex, direction } = _;

    if (direction === "bottom-right-to-top-left") {
        for (let i = placeholderGroups.length - 2; i > -1; i--) {
            let jBot = placeholderGroups[i + 1].length - 1;
            for (let j = placeholderGroups[i].length - 1; j > -1; j--) {
                if (placeholderGroups[i][j].length === 0) continue;
                for (let k = placeholderGroups[i][j].length - 1; k > -1; k--) {
                    cb({
                        i,
                        j,
                        jBot,
                        k,
                        parent: placeholderGroups[i][j][k],
                        children: placeholderGroups[i+1][jBot],
                        parentIndex: placeholderGroupsIndex[i][j][k],
                        childrenIndex: placeholderGroupsIndex[i+1][jBot],
                    });
                    jBot--;
                }
            }
        }
    } else {
        for (let i = 0; i < placeholderGroups.length - 1; i++) {
            let jBot = 0;
            for (let j = 0; j < placeholderGroups[i].length; j++) {
                if (placeholderGroups[i][j].length === 0) continue;
                for (let k = 0; k < placeholderGroups[i][j].length; k++) {
                    cb({
                        i,
                        j,
                        jBot,
                        k,
                        parent: placeholderGroups[i][j][k],
                        children: placeholderGroups[i+1][jBot],
                        parentIndex: placeholderGroupsIndex[i][j][k],
                        childrenIndex: placeholderGroupsIndex[i+1][jBot],
                    });
                    jBot++;
                }
            }
        }
    }
}
