import { tag } from "../../test-utils/index";
import { errorMessages } from "../../errorMessages";
import { validateShape } from "./validateShape";

describe(validateShape.name, () => {
    it.each([
        [
            {
                p1p2: tag`
            a    ${1}
              (       )|
           ${-2}        ${7}
              |        (     )|
                       ${6}  ${10}
                        |     )|
                            ${11}
                            (|
                            ${3} 
                                  )|
                                  ${4}
     `,
            },
        ],
        [
            {
                p1p2: tag`a
                 ${1}
              (       )|
           ${-2}        ${7}
              |        (     )|
                       ${6}  ${10}
                        |     )|
                            ${11}
                            (|
                            ${3} 
                                  )|
                                  ${4}
     `,
            },
        ],
    ])("throws error when the template literal first string is not \\s*", ({ p1p2 }) => {
        expect(() => validateShape(...p1p2)).toThrow(errorMessages.badStartingStringV);
    });
    it.each([
        [
            {
                p1p2: tag`
            ${1}
         (       )|
      ${-2}        ${7}
         |        (     )|
                  ${6}  ${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                             ${4}
a`,
            },
        ],
        [
            {
                p1p2: tag`
            ${1}
         (       )|
      ${-2}        ${7}
         |        (     )|
                  ${6}  ${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                             ${4}a
    `,
            },
        ],
    ])("throws error when the template literal last string is not \\s*", ({ p1p2 }) => {
        expect(() => validateShape(...p1p2)).toThrow(errorMessages.badEndingStringV);
    });
    it.each([
        [
            {
                p1p2: tag`
            ${1}
         (       )|
      ${-2}   b    ${7}
         |        (     )|
                  ${6}  ${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                             ${4}
        `,
            },
        ],
        [
            {
                p1p2: tag`
            ${1}
         (       )|
         ${-2}       ${7}
         |        (     )|
                  ${6} a${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                             ${4}
        `,
            },
        ],
    ])(
        "throws error when the string between two placeholders that are in the same line has non space or non tab characters",
        ({ p1p2 }) => {
            expect(() => validateShape(...p1p2)).toThrow(errorMessages.badStringBetweenPlaceholdersV);
        }
    );
    it.each([
        [
            {
                p1p2: tag`
            ${1}
         (       )|${-2}        ${7}
         |        (     )|
                  ${6}  ${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                             ${4}
        `,
            },
        ],
    ])("throws error when the string that corresponds to a branch rows has only one break line", ({ p1p2 }) => {
        expect(() => validateShape(...p1p2)).toThrow(errorMessages.oneMoreLineBreakNeededInBranchRowV);
    });
    it.each([
        [
            {
                p1p2: tag`
            ${1}
         (       )|
         
      ${-2}        ${7}
         |        (     )|
                  ${6}  ${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                             ${4}
        `,
            },
        ],
        [
            {
                p1p2: tag`
            ${1}

         (       )|
      ${-2}        ${7}
         |        (     )|
                  ${6}  ${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                             ${4}
        `,
            },
        ],
    ])("throws error when the string that corresponds to a branch rows has only one break line", ({ p1p2 }) => {
        expect(() => validateShape(...p1p2)).toThrow(errorMessages.tooManyLineBreaksInBranchRowV);
    });

    it.each([
        [
            {
                p1p2: tag`
            ${1} a
         (       )|
      ${-2}        ${7} 
         |        (     )|
                  ${6}  ${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                             ${4}
        `,
            },
        ],
        [
            {
                p1p2: tag`
            ${1}
         (       )|
      ${-2}        ${7}
         |        (     )|
             b    ${6}  ${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                             ${4}
        `,
            },
        ],
        [
            {
                p1p2: tag`
            ${1}
         (       )|
         ${-2}        ${7}
         |        (     )|
                  ${6}  ${10}
                   |     )|
                       ${11}
                       (|
                       ${3} 
                             )|
                          c  ${4}
        `,
            },
        ],
    ])("throws error when the trailing lines of a branch row have a non \\s character", ({ p1p2 }) => {
        expect(() => validateShape(...p1p2)).toThrow(errorMessages.badBranchRowTrailingLinesV);
    });

    it.each([
        [
            {
                p1p2: tag`
                 ${1}
              (       )|
           ${-2}        ${7}
              |        (     )|
                       ${6}  ${10}
                        |     )|
                            ${11}
                            (|
                            ${3} 
                                  )|
                                  ${4}
     `,
            },
        ],
        [
            {
                p1p2: tag`
                ${1}
                (        )|
             ${-2}        ${7}
             (   )|     (     )|
           ${-3}${-1}  ${6}  ${10}
              |   |      |   (     )|
                            ${8}  ${11}
     `,
            },
        ],
    ])("does not throw error when the template literal is valid", ({ p1p2 }) => {
        expect(() => validateShape(...p1p2)).not.toThrow();
    });
});
