/**
 * @description
 * It adds the minimum amount of spaces in the end of each line
 * so that the provided string has rows that all have the same length.
 * @example
 * //in the following example consider "." as space
 * rectanglify(`.o
 * |_..o
 * |..|_..o
 * |.....|_..o
 * |........|_..o
 * |........|..|_..o
 * |........|_..o
 * |...........|_..o
 * |_..o`)
 * //returns
 * `.o...............
 * |_..o............
 * |..|_..o.........
 * |.....|_..o......
 * |........|_..o...
 * |........|..|_..o
 * |........|_..o...
 * |...........|_..o
 * |_..o............`
 */
export function rectanglify(s: string): string {
    let maxLength = 0;
    const lines = s.split("\n");
    lines.forEach((l) => {
        if (l.length > maxLength) maxLength = l.length;
    });
    return lines
        .map((l) => l + " ".repeat(maxLength - l.length))
        .reduce((a, c) => a + "\n" + c, "")
        .slice(1);
}
