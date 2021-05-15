import { iterateParentToChildrenDiplets } from "./iterateParentToChildrenDiplets";
import type { contextIndexToParentIndexReturnType } from "../types";

/**
 * @description Give context index to get back the index of its parent.
 * @example
 * // tree
 * `
 *          ${1}
 *        (      ).
 *    ${-2}      ${7}
 *    (   ).     (  ).
 *  ${-3}${-1}${6}  ${10}
 *     .   .    .   (   ).
 *               ${8} ${11}
 * `;
 * // placeholders grouped
 * [
 *  [[0]],
 *  [[1, 2]],
 *  [[3,4], [5, 6]],
 *  [[],[],[],[7,8]],
 * ];
 * // returned value
 * [
 *  null,
 *  0,
 *  0,
 *  1,
 *  1,
 *  2,
 *  2,
 *  6,
 *  6,
 * ];
 */
export function contextIndexToParentIndex<T>(
    placeholderGroups: T[][][],
    placeholderGroupsIndex: number[][][]
): contextIndexToParentIndexReturnType {
    const toReturn: contextIndexToParentIndexReturnType = [null];
    iterateParentToChildrenDiplets({
        placeholderGroups,
        direction: "bottom-right-to-top-left",
        placeholderGroupsIndex,
        cb: (_) => {
            const { parentIndex, childrenIndex } = _;
            childrenIndex.forEach((childIndex) => (toReturn[childIndex] = parentIndex));
        },
    });

    return toReturn;
}
