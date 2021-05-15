import { tag } from "../../test-utils/index";
import { errorMessages } from "../../errorMessages";
import { extractBranches } from "../vertical/extractBranches";
import { extractPlaceholders } from "../vertical/extractPlaceholders";
import { validateSeparatorPlaceholderRelationship } from "./validateSeparatorPlaceholderRelationship";

describe(validateSeparatorPlaceholderRelationship, () => {
    it.each([
        [
            {
                p1p2: tag`
                          ${1}
                       (       ).
                    ${-2}        ${7}
                                  (     ).
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
                       (       )
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
                       (       ).
                    ${-2}        ${7}
                      .          (     ).
                                ${6}  ${10}
                                  .    ).
                                     ${11}
                                     (.
                                     ${3}
                                           )
                                           ${4}
                `,
            },
        ],
    ])(
        "throws error when the number of the total number of separators of a branches line is different than the total number of placeholders of the placeholder row that it corresponds",
        ({ p1p2 }) => {
            expect(() =>
                validateSeparatorPlaceholderRelationship(extractBranches(...p1p2), extractPlaceholders(...p1p2))
            ).toThrow(errorMessages.badSeparatorPlaceholderRelationship);
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
            validateSeparatorPlaceholderRelationship(extractBranches(...p1p2), extractPlaceholders(...p1p2))
        ).not.toThrow();
    });
});
