import { extractBranches } from "../string-to-tree/vertical/extractBranches";
import { placeholdersGrouped } from "../string-to-tree/common/placeholdersGrouped";
import { subTreeHeights } from "./subTreeHeights";
import { tag } from "../test-utils/index";

describe(subTreeHeights.name, () => {
    it.each([
        [
            {
                p1p2: tag`
                          ${1}
                       (        ).
                    ${-2}        ${7}
                       .        (     ).
                                ${6}  ${10}
                                 .     ).
                                     ${11}
                                     (.
                                     ${3}
                                           ).
                                           ${4}
                `,
                heights: [6, 1, 5, 1, 4, 3, 2, 1],
            },
        ],
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
                heights: [4, 2, 3, 1, 1, 1, 2, 1, 1],
            },
        ],
    ])("returns an array that is the map of the placeholders to its subtree height", ({ p1p2, heights }) => {
        expect(subTreeHeights(placeholdersGrouped(p1p2[1], extractBranches(...p1p2)))).toStrictEqual(heights);
    });
});
