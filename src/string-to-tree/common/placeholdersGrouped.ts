import { constants } from "../../constants";

/**
 * @description Returns the placeholders grouped.
 * @example
 * //tree
 * `
 *       ${1}
 *       (  ).
 *    ${-2}  ${7}
 *       .  (     ).
 *          ${6}  ${10}
 *           .     ).
 *               ${11}
 *               (.
 *               ${3}
 *                     ).
 *                     ${4}
 * `;
 * //branch rows
 * [
 *  ['(',')','.'],
 *  ['.','(',')','.'],
 *  ['.',')','.'],
 *  ['(','.'],
 *  [')','.']
 * ];
 * //placeholders grouped
 * [
 *  [[1]],
 *  [[2,7]],
 *  [[],[6,10]],
 *  [[],[11]],
 *  [[3]],
 *  [[4]]
 * ]
 * //tree
 * `
 *         ${1}
 *       (      ).
 *   ${-2}      ${7}
 *   (   ).     (  ).
 * ${-3}${-1}${6}  ${10}
 *    .   .    .   (   ).
 *               ${8} ${11}
 * `
 * //branch rows
 * [
 *  ["(", ")", "."],
 *  ["(", ")", ".", "(", ")", "."],
 *  [".", ".", ".", "(", ")", "."],
 * ]
 * //placeholders grouped
 * [
 *  [[1]],
 *  [[-2, 7]],
 *  [[-3,-1], [6, 10]],
 *  [[],[],[],[8,11]],
 * ]
 * @todo code is repeated with branches grouped , find a way to dry them
 */
export function placeholdersGrouped<T>(placeholders: T[], branches: string[][]): T[][][] {
    const toReturn: T[][][] = [[[placeholders[0]]]];
    let placeholderIndex = 1;
    for (let i = 0; i < branches.length; i++) {
        toReturn[i + 1] = [];
        let J = 0;
        for (let j = 0; j < branches[i].length ; j++) {
            if (branches[i][j] !== constants.separator) {
                if (toReturn[i + 1][J] === undefined) {
                    toReturn[i + 1][J] = [];
                }
                toReturn[i + 1][J].push(placeholders[placeholderIndex]);
                placeholderIndex++;
                if (branches[i][j + 1] === constants.separator) {
                    j++;
                    J++;
                }
            } else {
                toReturn[i + 1][J] = [];
                J++;
            }
        }
    }
    return toReturn;
}
