import { serializablePrimitive } from "./serializablePrimitive";
import type { serializableReference } from "./serializableReference";

/**
 * @description
 * Type for a strict serializable value.
*/
export type serializableValue = serializablePrimitive | serializableReference;
