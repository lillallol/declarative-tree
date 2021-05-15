/**
 * @description
 * Returns the parameters provided to the tag function as an array.
 * @example
 * const age = 28;
 * tag`I am ${age} years of age.`;
 * //returns
 * [
 *  ["I am "," years of age."],
 *  [28]
 * ]
 */
export function tag<T>(strings: TemplateStringsArray, ...placeholders: T[]): [TemplateStringsArray, T[]] {
    return [strings, placeholders];
}
