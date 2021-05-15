import { tag } from "../../test-utils/index";
import { extractBranches } from "./extractBranches";

describe(extractBranches.name, () => {
    it.each([
        [
            {
                p1p2: tag`
                          ${1}
                       (       ).
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
                branchRows: [
                    ["(", ")", "."],
                    [".", "(", ")", "."],
                    [".", ")", "."],
                    ["(", "."],
                    [")", "."],
                ],
            },
        ],
        [
            {
                p1p2: tag`
                         ${1}
                         (        ).
                      ${-2}        ${7}
                      (   ).     (     ).
                    ${-3}${-1}  ${6}  ${10}
                       .   .      .   (     ).
                                     ${8}  ${11}
                `,
                branchRows: [
                    ["(", ")", "."],
                    ["(", ")", ".", "(", ")", "."],
                    [".", ".", ".", "(", ")", "."],
                ],
            },
        ],
    ])("returns the correct placeholderRows and branchRows values", ({ p1p2, branchRows }) => {
        expect(extractBranches(...p1p2)).toStrictEqual(branchRows);
    });
});
