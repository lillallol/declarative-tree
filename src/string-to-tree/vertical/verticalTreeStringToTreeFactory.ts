import { stringToTreeFactoryFactory } from "../common/stringToTreeFactoryFactory";
import { extractBranches } from "./extractBranches";
import { extractPlaceholders } from "./extractPlaceholders";
import { validateShape } from "./validateShape";

export const stringToTreeVerticalFactory = stringToTreeFactoryFactory(
    validateShape,
    extractPlaceholders,
    extractBranches
);
