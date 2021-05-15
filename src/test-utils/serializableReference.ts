import { serializableValue } from "./serializableValue";

/**
 * @description
 * Type for deep serializable reference.
 */
export type serializableReference =
    | {
          [x: string]: serializableValue;
      }
    | serializableValue[];
