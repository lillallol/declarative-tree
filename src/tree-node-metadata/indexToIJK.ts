/**
 * @description Returns a level order indexed array with the group i,j,k indexes for each tree node.
 * @example
 * //given the groups of tree with string representation
 * `
 *        1
 *     /    \
 *    2      7
 *   / \    / \
 * -3  -1  6   10
 *            /  \
 *           8    11
 * `
 * //it returns
 * [
 *                                   { i: 0, j: 0, k: 0 },
 *                         { i: 1, j: 0, k: 0 },  { i: 1, j: 0, k: 1 },
 *  { i: 2, j: 0, k: 0 },  { i: 2, j: 0, k: 1 },  { i: 2, j: 1, k: 0 },  { i: 2, j: 1, k: 1 },
 *                                                            { i: 3, j: 3, k: 0 },{ i: 3, j: 3, k: 1 }
 * ];
 */
export function indexToIJK(placeholderGroupsIndex: number[][][]): { i: number; j: number; k: number }[] {
    return placeholderGroupsIndex.map((row, i) => row.map((group, j) => group.map((_l, k) => ({ i, j, k })))).flat(2);
}
