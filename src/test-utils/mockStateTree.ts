import { serializableReference } from "./serializableReference";
import { serializableValue } from "./serializableValue";
import { isObjectOrArrayLiteral } from "./isObjectOrArrayLiteral";
import { IGetChildren, IGetRoot } from "../publicApi";

export const stateTree: serializableReference = {
    obj: {
        a: [1, 2],
    },
    a: 1,
    b: "3",
};

export const stateTreeGetChildren: IGetChildren<IStateTreeNode> = ({ treeNode: node }) => {
    const { v } = node;
    if (isObjectOrArrayLiteral(v)) {
        return Reflect.ownKeys(v).map((key) => {
            if (typeof key === "string") {
                if (Array.isArray(v)) {
                    if (key === "length") {
                        return { t: v, p: key, v: v[key] };
                    } else {
                        //stupid ts
                        return { t: v, p: key, v: v[Number(key)] };
                    }
                } else {
                    return { t: v, p: key, v: v[key] };
                }
            } else throw Error("no symbol are allowed as keys in the state tree");
        });
    } else {
        return [];
    }
};

export const stateTreeGetRoot: IGetRoot<IStateTree, IStateTreeNode> = ({ tree }) => {
    return {
        t: { root: tree },
        p: "root",
        v: tree,
    };
};

export type IStateTreeNode = { t: serializableReference; p: string; v: serializableValue };
export type IStateTree = serializableReference;
