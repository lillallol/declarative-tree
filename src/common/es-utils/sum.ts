/**
 * @description
 * Return the sum of the provided array.
 * @example
 * sum([1, 2, 3, 4]);
 * //returns
 * 10;
 * sum([]);//throws error
 */
export function sum(a: number[]): number {
    if (a.length === 0) throw Error(_errorMessages.badLength);
    return a.reduce((a, c) => a + c);
}

export const _errorMessages = {
    badLength: "The array has to not have length 0.",
};
