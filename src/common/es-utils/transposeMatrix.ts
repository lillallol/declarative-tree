/**
 * @description
 * It transposes the provided matrix.
 * @example
 * transposeMatrix([
 *  [1,2],
 *  [3,4]
 * ]);
 * //returns
 * [
 *  [1,3],
 *  [2,4]
 * ];
 */
export function transposeMatrix<T>(m: T[][]): T[][] {
    const toReturn: T[][] = [];
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            if (toReturn[j] === undefined) toReturn[j] = [];
            toReturn[j][i] = m[i][j];
        }
    }
    return toReturn;
}
