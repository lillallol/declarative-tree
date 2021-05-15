import { extractBranches } from "../string-to-tree/vertical/extractBranches";
import { contextIndexToChildrenIndexes } from "./contextIndexToChildrenIndexes";
import { ijkToIndex } from "./ijkToIndex";
import { placeholdersGrouped } from "../string-to-tree/common/placeholdersGrouped";
import { tag } from "../test-utils/index";

describe(contextIndexToChildrenIndexes.name, () => {
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
                // prettier-ignore
                result: [
                    [1, 2],
                    [3, 4],
                    [5, 6],
                    [],
                    [],
                    [],
                    [7, 8],
                    [],
                    [],
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
                // prettier-ignore
                result: [
                    [1, 2],
                    [],[3, 4],
                    [],[5],
                    [6],
                    [7],
                    [],
                ],
            },
        ],
    ])("returns the index ", ({ p1p2, result }) => {
        const _placeholdersGrouped = placeholdersGrouped(p1p2[1], extractBranches(...p1p2));
        const _placeholderGroupsIndex = ijkToIndex(_placeholdersGrouped);
        const _contextIndexToChildrenIndexes = contextIndexToChildrenIndexes(
            p1p2[1].length,
            _placeholdersGrouped,
            _placeholderGroupsIndex
        );
        expect(_contextIndexToChildrenIndexes).toStrictEqual(result);
    });
});
