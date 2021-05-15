import { tag } from "../../test-utils/index";
import { extractBranches } from "../vertical/extractBranches";
import { branchesGrouped } from "./branchesGrouped";
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
                 [['(',')']],
                 [[],['(',')']],
                 [[],[')']],
                 [['(']],
                 [[')']]
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
                 [["(", ")"]],
                 [["(", ")"], ["(", ")"]],
                 [[],[],[],["(", ")"]],
                ],
            },
        ],
    ])("works as expected", ({ p1p2, result }) => {
        expect(branchesGrouped(extractBranches(...p1p2))).toStrictEqual(result);
    });
});
