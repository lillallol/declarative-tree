import { tag } from "../../test-utils/index";
import { extractPlaceholderRows } from "./extractPlaceholderRows";

describe(extractPlaceholderRows.name, () => {
    it.each([
        [
            {
                p1p2: tag`
                ${1}
                |) ${7}
                |  |) ${10}
                |  |  |) ${11}
                |  |     |( ${10.5}
                |  |        |) ${10.75}
                |  |( ${6}
                |( ${-2}  
            `,
                result: [[1], [-2, 7], [6, 10], [11], [10.5], [10.75]],
            },
        ],
        [
            {
                p1p2: tag`
                ${"+"}
                |_ ${"p"}
                |  |_ ${"a"}
                |
                |_ ${"o"}
                   |_ ${"t"}
                      |_ ${"h"}
            `,
                result: [["+"], ["o", "p"], ["t", "a"], ["h"]],
            },
        ],
    ])("returns the placeholder rows for the provided tree", ({ p1p2, result }) => {
        const returned = extractPlaceholderRows(
            p1p2[0],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            p1p2[1]
        );
        expect(returned).toStrictEqual(result);
    });
});
