/**
 * @description
 * Return the last line of the provided string.
 * @example
 * lastLine(`
 * Hello
 * world!`);
 * //returns
 * "world!";
 */
export function lastLine(s: string): string {
    const array = s.split("\n");
    return array[array.length - 1];
}
