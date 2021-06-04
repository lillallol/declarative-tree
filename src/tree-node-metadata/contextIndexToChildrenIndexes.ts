import { iterateParentToChildrenDiplets } from "./iterateParentToChildrenDiplets";

export type contextIndexToChildrenIndexesReturnedType = number[][];

/**
 * @description Give context index to get back the indexes of its children.
 * @TODO I think I should make the return value to be an array
 * @example
 * // tree
 * `
 *        1
 *     /    \
 *    2      7
 *   / \    / \
 * -3  -1  6   10
 *            /  \
 *           8    11
 * `;
 * // placeholders grouped
 *  [
 *   [[0]],
 *   [[1, 2]],
 *   [[3,4], [5, 6]],
 *   [[],[],[],[7,8]],
 *  ],
 * // returned value
 * {
 *  0: [1, 2],
 *  1: [3, 4],
 *  2: [5, 6],
 *  3: [],
 *  4: [],
 *  5: [],
 *  6: [7, 8],
 *  7: [],
 *  8: [],
 * }
 */
export function contextIndexToChildrenIndexes<T>(
    numberOfNodes: number,
    placeholderGroups: T[][][],
    placeholderGroupsIndex: number[][][]
): contextIndexToChildrenIndexesReturnedType {
    const toReturn: contextIndexToChildrenIndexesReturnedType = [];
    let placeholderIndex = 0;
    iterateParentToChildrenDiplets({
        placeholderGroups,
        placeholderGroupsIndex,
        direction: "bottom-right-to-top-left",
        cb: ({ i, jBot, parentIndex }) => {
            placeholderIndex++;
            toReturn[parentIndex] = placeholderGroupsIndex[i + 1][jBot];
        },
    });
    for (let i = placeholderIndex; i < numberOfNodes; i++) {
        toReturn[i] = [];
    }
    return toReturn;
}
