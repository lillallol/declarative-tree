import { extractBranches } from "../string-to-tree/vertical/extractBranches";
import { ijkToIndex } from "./ijkToIndex";
import { placeholdersGrouped } from "../string-to-tree/common/placeholdersGrouped";
import { tag } from "../test-utils/index";

describe(ijkToIndex.name, () => {
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
                // prettier-ignore
                result: [
                    [[0]],
                    [[1, 2]],
                    [[3, 4],[5, 6]],
                    [[], [], [], [7, 8]],
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
                // prettier-ignore
                result: [
                    [[0]], 
                    [[1, 2]], 
                    [[], [3, 4]], 
                    [[], [5]], 
                    [[6]], 
                    [[7]]
                ],
            },
        ],
    ])("returns the index ", ({ p1p2, result }) => {
        expect(
            ijkToIndex(placeholdersGrouped(Array.from(p1p2[0]), extractBranches(...p1p2)))
        ).toStrictEqual(result);
    });
});
