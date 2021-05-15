import { tag } from "../../test-utils/index";
import { extractPlaceholders } from "./extractPlaceholders";

describe(extractPlaceholders.name, () => {
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
                placeholderRows: [[1], [-2, 7], [6, 10], [11], [3], [4]],
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
                placeholderRows: [[1], [-2, 7], [-3, -1, 6, 10], [8, 11]],
            },
        ],
    ])("returns the correct placeholderRows and branchRows values", ({ p1p2, placeholderRows }) => {
        expect(extractPlaceholders(...p1p2)).toStrictEqual(placeholderRows);
    });
});
