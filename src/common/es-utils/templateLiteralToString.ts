/**
 * @description
 * Tag function that returns the string that correspond to the template literal. Placeholders of
 * non string type are stringified via JSON.
 * @example
 * templateLiteralToString`${"Hello"} ${"world"}!`
 * //returns
 * "Hello world!";
 */
export function templateLiteralToString(stringArray: TemplateStringsArray, ...placeholders: unknown[]): string {
    let stringToReturn = stringArray[0];
    for (let i = 0; i < placeholders.length; i++) {
        stringToReturn =
            stringToReturn +
            (typeof placeholders[i] === "string" ? placeholders[i] : JSON.stringify(placeholders[i])) +
            stringArray[i + 1];
    }
    return stringToReturn;
}
