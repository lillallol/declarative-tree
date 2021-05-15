import { constants } from "../../constants";

/**
 * @description Returns the branches grouped.
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
 * //branches grouped
 * [
 *  [['(',')']],
 *  [[],['(',')']],
 *  [[],[')']],
 *  [['(']],
 *  [[')']]
 * ];
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
 * //branches grouped
 * [
 *  [["(", ")"]],
 *  [["(", ")"], ["(", ")"]],
 *  [[],[],[],["(", ")"]],
 * ]
 * @todo code is repeated with placeholders grouped , find a way to dry them
 */
export function branchesGrouped(branches: string[][]): string[][][] {
    const toReturn: string[][][] = [];
    for (let i = 0; i < branches.length; i++) {
        toReturn[i + 1] = [];
        let J = 0;
        for (let j = 0; j < branches[i].length; j++) {
            if (branches[i][j] !== constants.separator) {
                if (toReturn[i + 1][J] === undefined) {
                    toReturn[i + 1][J] = [];
                }
                toReturn[i + 1][J].push(branches[i][j]);
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
    toReturn.shift();
    return toReturn;
}
