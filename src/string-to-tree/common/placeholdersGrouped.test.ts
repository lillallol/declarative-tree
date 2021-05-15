import { tag } from "../../test-utils/index";
import { extractBranches } from "../vertical/extractBranches";
import { placeholdersGrouped } from "./placeholdersGrouped";

describe(placeholdersGrouped.name, () => {
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
                // prettier-ignore
                result : [
                    [[1]],
                    [[-2, 7]],
                    [[], [6, 10]],
                    [[],[11]],
                    [[3]],
                    [[4]],
                ],
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
                // prettier-ignore
                result : [
                    [[1]],
                    [[-2, 7]],
                    [[-3,-1], [6, 10]],
                    [[],[],[],[8,11]],
                ],
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
                     (  ).   .    .   (   ).
                   ${5} ${6}       ${8} ${11}
                   .     .         (.    .
                                  ${5}
                `,
                // prettier-ignore
                result : [
                    [[1]],
                    [[-2, 7]],
                    [[-3,-1], [6, 10]],
                    [[5,6],[],[],[8,11]],
                    [[],[],[5],[]]
                ],
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
                     (  ).   .    .   (   ).
                   ${5} ${6}       ${8} ${11}
                   .     ().        (.    .
                      ${1}${1}      ${5}
                `,
                // prettier-ignore
                result : [
                    [[1]],
                    [[-2, 7]],
                    [[-3,-1], [6, 10]],
                    [[5,6],[],[],[8,11]],
                    [[],[1,1],[5],[]]
                ],
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
                     (  ).   .    .   (   ).
                   ${5} ${6}       ${8} ${11}
                   .     ().        (.    .
                      ${1}${1}      ${5}
                      ().  .         ().
                    ${1}${2}      ${3}${4}
                `,
                // prettier-ignore
                result : [
                    [[1]],
                    [[-2, 7]],
                    [[-3,-1], [6, 10]],
                    [[5,6],[],[],[8,11]],
                    [[],[1,1],[5],[]],
                    [[1,2],[],[3,4]]
                ],
            },
        ],
    ])("works as expected", ({ p1p2, result }) => {
        // console.log(placeholdersGrouped(p1p2[1], extractBranches(...p1p2)));
        expect(placeholdersGrouped(p1p2[1], extractBranches(...p1p2))).toStrictEqual(result);
    });
});
