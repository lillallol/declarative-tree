import { iterateParentToChildrenDiplets } from "./iterateParentToChildrenDiplets";
import { ijkToIndex } from "./ijkToIndex";
import { sum } from "../common/es-utils/sum";

/**
 * @description Returns a level order indexed array with the length for each tree node.
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
 * //it returns
 * [
 *    9,
 *   3, 5,
 * 1, 1, 1, 3,
 *         1, 1
 * ];
 */
export function subTreeLengths<T>(placeholderGroups: T[][][]): number[] {
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
            toReturn[i][j][k] = (toReturn[i + 1][jBot].length !== 0 ? sum(toReturn[i + 1][jBot]) : 0) + 1;
        },
        direction: "bottom-right-to-top-left",
        placeholderGroups,
        placeholderGroupsIndex: ijkToIndex(placeholderGroups),
    });

    return toReturn.flat(2);
}
