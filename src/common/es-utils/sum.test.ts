import { sum, _errorMessages } from "./sum";

describe(sum.name, () => {
    it.each([
        [
            {
                array: [1],
                result: 1,
            },
        ],
        [
            {
                array: [1, 2],
                result: 3,
            },
        ],
        [
            {
                array: [1, 2, 3],
                result: 6,
            },
        ],
        [
            {
                array: [1, 2, 3, 4],
                result: 10,
            },
        ],
    ])("returns the sum of the provided array", ({ array, result }) => {
        expect(sum(array)).toBe(result);
    });
    it("throws when provided with length 0 array", () => {
        expect(() => sum([])).toThrow(_errorMessages.badLength);
    });
});
