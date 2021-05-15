import { tag } from "../../test-utils/index";
import { errorMessages } from "../../errorMessages";
import { extractBranches } from "../vertical/extractBranches";
import { extractPlaceholders } from "../vertical/extractPlaceholders";
import { validateBranchPlaceholderRelationship } from "./validateBranchPlaceholderRelationship";

describe(validateBranchPlaceholderRelationship.name, () => {
    it.each([
        [
            {
                p1p2: tag`
                          ${1}
                       (        .
                    ${-2}        ${7}
                       .          (     ).
                                ${6}  ${10}
                                 .     ).
                                     ${11}
                                     (.
                                     ${3}
                                           ).
                                           ${4}
                `,
            },
        ],
        [
            {
                p1p2: tag`
                          ${1}
                       (        ).
                    ${-2}        ${7}
                       .          (     ).
                                ${6}  ${10}
                                 .     ).
                                     ${11}
                                     (.
                                     ${3}
                                           .
                                           ${4}
                `,
            },
        ],
        [
            {
                p1p2: tag`
                        ${1}
                     (        ).
                  ${-2}        ${7}
                     .               .
                              ${6}  ${10}
                               .     ).
                                   ${11}
                                   (.
                                   ${3}
                                         ).
                                         ${4}
                `,
            },
        ],
    ])(
        "throws error when the total number of branches are different than the total number of placeholders for a branchRow-placeholderRow diplet",
        ({ p1p2 }) => {
            expect(() =>
                validateBranchPlaceholderRelationship(extractBranches(...p1p2), extractPlaceholders(...p1p2))
            ).toThrow(errorMessages.badBranchPlaceholderRelationship);
        }
    );
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
            },
        ],
    ])("does not throw error when the template literal is valid", ({ p1p2 }) => {
        expect(() =>
            validateBranchPlaceholderRelationship(extractBranches(...p1p2), extractPlaceholders(...p1p2))
        ).not.toThrow();
    });
});
