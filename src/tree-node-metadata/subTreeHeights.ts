import { iterateParentToChildrenDiplets } from "./iterateParentToChildrenDiplets";
import { ijkToIndex } from "./ijkToIndex";
/**
 * @description Returns a level order indexed array with the height for each tree node.
 * @example
 * //given the groups of the tree with string representation
 * `
 *        1
 *     /    \
 *    2      7
 *   / \    / \
 * -3  -1  6   10
 *            /  \
 *           8    11
 * `;
 * //heights
 * [  4,
 *   2, 3,
 * 1, 1, 1, 2,
 *         1, 1];
 */
export function subTreeHeights<T>(placeholderGroups: T[][][]): number[] {
    const toReturn: number[][][] = placeholderGroups.map((row, i) =>
        row.map((group) => {
            if (i === placeholderGroups.length - 1) {
                return group.map(() => 1);
            } else {
                return [];
            }
        })
    );

    iterateParentToChildrenDiplets({
        cb: (_) => {
            const { i, j, k, jBot } = _;
            toReturn[i][j][k] = (toReturn[i + 1][jBot].length !== 0 ? Math.max(...toReturn[i + 1][jBot]) : 0) + 1;
        },
        direction: "bottom-right-to-top-left",
        placeholderGroups,
        placeholderGroupsIndex: ijkToIndex(placeholderGroups),
    });

    return toReturn.flat(2);
}
