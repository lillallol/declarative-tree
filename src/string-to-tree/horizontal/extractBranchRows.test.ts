import { tag } from "../../test-utils/index";
import { extractBranchRows } from "./extractBranchRows";

describe(extractBranchRows.name, () => {
    it.each([
        [
            {
                p1p2: tag`
                    ${"+"}
                    |_ ${"p"}
                    |  |_ ${"a"}
                    |_ ${"o"}
                `,
                result: [
                    ["_", "_", "."],
                    [".", "_", "."],
                ],
            },
        ],
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
                result: [
                    ["(", ")", "."],
                    [".", "(", ")", "."],
                    [".", ")", "."],
                    ["(", "."],
                    [")", "."],
                ],
            },
        ],
    ])(
        "returns the branches and the separators for the provided horizontal tree string representation",
        ({ p1p2, result }) => {
            expect(
                extractBranchRows(
                    p1p2[0],
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    p1p2[1]
                )
            ).toStrictEqual(result);
        }
    );
});
