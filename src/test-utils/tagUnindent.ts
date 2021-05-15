import { unindent } from "../common/es-utils/unindent";
import { getLastLineOfString } from "./getLastLineOfString";

/**
 * @description
 * Tag function that returns the template literal it is provided as a string, but
 * with its common minimum indentation removed. The placeholders that are provided
 * as single string element arrays are multi-line indented.
 *
 * It throws if :
 *
 * - non an empty string first line
 * - last line is not only space characters
 * - the string contains `\s` characters that are not `` tab characters in its indentation
 *
 * @example
 * expect(
 *      tagUnindent`
 *          path : (${`"./some/where"`})
 *          index : ${0}
 *          message :
 *              ${["hello\nworld"]}
 *      `
 * ).toBe(
 *     `path : ("./some/where")\n` +
 *     `index : 0\n` +
 *     `message : \n` +
 *     `    hello\n` +
 *     `    world`
 * );
 */
export function tagUnindent(
    stringArray: TemplateStringsArray,
    ...placeholders: (number | string | [string])[]
): string {
    return unindent(
        ((): string => {
            if (placeholders.length === 0) return stringArray[0];
            let toReturn = "";
            for (let i = 0; i < placeholders.length; i++) {
                const currentPlaceholder = placeholders[i];
                if (Array.isArray(currentPlaceholder)) {
                    const lastStringArrayLineLength = getLastLineOfString(stringArray[i]).length;
                    const [placeholderSingleElementArrayString] = currentPlaceholder;
                    toReturn =
                        toReturn +
                        stringArray[i] +
                        placeholderSingleElementArrayString
                            .split("\n")
                            .map((line, i) => {
                                if (i === 0) return line;
                                return " ".repeat(lastStringArrayLineLength) + line;
                            })
                            .join("\n");
                } else {
                    toReturn = toReturn + stringArray[i] + currentPlaceholder;
                }
            }
            return toReturn + (stringArray.length > 1 ? stringArray[stringArray.length - 1] : "");
        })()
    );
}
