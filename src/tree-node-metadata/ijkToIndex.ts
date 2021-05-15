/**
 * @description It returns the grouped index of each placeholder.
 * @example
 * //tree
 * `
 *        ${1}
 *      (      ).
 *   ${-2}      ${7}
 *   (   ).     (  ).
 * ${-3}${-1}${6}  ${10}
 *    .   .    .   (   ).
 *               ${8} ${11}
 * `;
 * //returned value
 * [
 *  [[0]],
 *  [[1, 2]],
 *  [[3,4], [5, 6]],
 *  [[],[],[],[7,8]],
 * ];
 * //tree
 * `
 *      ${1}
 *      (  ).
 *  ${-2}   ${7}
 *     .   (     ).
 *         ${6}  ${10}
 *          .     ).
 *              ${11}
 *              (.
 *              ${3}
 *                 ).
 *                 ${4}
 * `;
 * //returned value
 * [
 *  [[0]],
 *  [[1, 2]],
 *  [[], [3, 4]],
 *  [[],[5]],
 *  [[6]],
 *  [[7]],
 * ];
 */
export function ijkToIndex<T>(placeholderGroups: T[][][]): number[][][] {
    let index = 0;
    return placeholderGroups.map((row) => row.map((group) => group.map(() => index++)));
}
