/**
 * @description
 * Returns a 2D matrix from the provided string.
 * @example
 * //input
 * stringTo2DMatrix(`12
 * 34
 * `);
 * //returns
 * [
 *  [1,2],
 *  [3,4]
 * ];
 */
export function stringTo2DMatrix(s: string): string[][] {
    return s.split("\n").map((line) => line.split(""));
}
