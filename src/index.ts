import { stringToTreeHorizontalFactory as _stringToTreeHorizontalFactory } from "./string-to-tree/horizontal/horizontalTreeStringToTreeFactory";
import { stringToTreeVerticalFactory as _stringToTreeVerticalFactory } from "./string-to-tree/vertical/verticalTreeStringToTreeFactory";

import { treeToStringHorizontalFactory as _treeToStringHorizontalFactory } from "./tree-to-string/horizontal/treeToStringHorizontal";

/**
 * @description
 * Returns a tag function that converts template literals to tree data
 * structures, in accordance to the instructions you have provided to the
 * factory.
 */
export const stringToTreeHorizontalFactory = _stringToTreeHorizontalFactory;
/**
 * @description
 * Returns a tag function that converts template literals to tree data
 * structures, in accordance to the instructions you have provided to the
 * factory.
 */
export const stringToTreeVerticalFactory = _stringToTreeVerticalFactory;
/**
 * @description
 * Returns a function that converts tree data structures to horizontal tree
 * string representations, in accordance to the instructions you have provided
 * to the factory.
 */
export const treeToStringHorizontalFactory = _treeToStringHorizontalFactory;
