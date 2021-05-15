import { extractBranches } from "../string-to-tree/vertical/extractBranches";
import { placeholdersGrouped } from "../string-to-tree/common/placeholdersGrouped";
import { subTreeLengths } from "./subTreeLengths";
import { tag } from "../test-utils/index";

describe(subTreeLengths.name, () => {
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
                heights: [8, 1, 6, 1, 4, 3, 2, 1],
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
                heights: [9, 3, 5, 1, 1, 1, 3, 1, 1],
            },
        ],
    ])("returns an array that is the map of the placeholders to its subtree height", ({ p1p2, heights }) => {
        expect(subTreeLengths(placeholdersGrouped(p1p2[1], extractBranches(...p1p2)))).toStrictEqual(heights);
    });
});
