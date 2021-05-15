import { extractBranches } from "../string-to-tree/vertical/extractBranches";
import { indexToIJK } from "./indexToIJK";
import { ijkToIndex } from "./ijkToIndex";
import { placeholdersGrouped } from "../string-to-tree/common/placeholdersGrouped";
import { tag } from "../test-utils/index";

describe(indexToIJK.name, () => {
    it.each([
        [
            {
                p1p2: tag`
                           ${1}
                         (      ).
                      ${-2}      ${7}
                      (   ).     (  ).
                    ${-3}${-1}${6}  ${10}
                       .   .    .   (   ).
                                  ${8} ${11}
                `,
                // [
                //  [[0]],
                //  [[1, 2]],
                //  [[3,4], [5, 6]],
                //  [[],[],[],[7,8]],
                // ];
                result: [
                    { i: 0, j: 0, k: 0 },
                    { i: 1, j: 0, k: 0 },
                    { i: 1, j: 0, k: 1 },
                    { i: 2, j: 0, k: 0 },
                    { i: 2, j: 0, k: 1 },
                    { i: 2, j: 1, k: 0 },
                    { i: 2, j: 1, k: 1 },
                    { i: 3, j: 3, k: 0 },
                    { i: 3, j: 3, k: 1 },
                ],
            },
        ],
        [
            {
                p1p2: tag`
                        ${1}
                        (  ).
                    ${-2}   ${7}
                       .   (     ).
                           ${6}  ${10}
                            .     ).
                                ${11}
                                (.
                                ${3}
                                   ).
                                   ${4}
                `,
                // [
                //     [[0]],
                //     [[1, 2]],
                //     [[], [3, 4]],
                //     [[], [5]],
                //     [[6]],
                //     [[7]]
                // ]
                result: [
                    { i: 0, j: 0, k: 0 },

                    { i: 1, j: 0, k: 0 },
                    { i: 1, j: 0, k: 1 },

                    { i: 2, j: 1, k: 0 },
                    { i: 2, j: 1, k: 1 },

                    { i: 3, j: 1, k: 0 },

                    { i: 4, j: 0, k: 0 },

                    { i: 5, j: 0, k: 0 },
                ],
            },
        ],
    ])("returns the index ", ({ p1p2, result }) => {
        const _placeholdersGrouped = placeholdersGrouped(p1p2[1], extractBranches(...p1p2));
        const _placeholderGroupsIndex = ijkToIndex(_placeholdersGrouped);
        const _indexToIJK = indexToIJK(_placeholderGroupsIndex);
        expect(_indexToIJK).toStrictEqual(result);
    });
});
