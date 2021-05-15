import { stringTo2DMatrix } from "./stringTo2DMatrix";

describe(stringTo2DMatrix.name, () => {
    it("converts a string to a 2D matrix", () => {
        expect(
            stringTo2DMatrix(
                `abcde
12345`
            )
        ).toStrictEqual([
            ["a", "b", "c", "d", "e"],
            ["1", "2", "3", "4", "5"],
        ]);
    });
});
