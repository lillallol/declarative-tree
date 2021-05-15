import { transposeMatrix } from "./transposeMatrix";

describe(transposeMatrix.name, () => {
    it("creates the transposed version of the provided matrix and returns it", () => {
        expect(
            transposeMatrix([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
            ])
        ).toStrictEqual([
            [1, 5],
            [2, 6],
            [3, 7],
            [4, 8],
        ]);
    });
});
