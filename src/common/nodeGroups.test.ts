import { isOfObjectInternalClass } from "../test-utils/index";
import { nodeGroups } from "./nodeGroups";

describe(nodeGroups.name, () => {
    it("returns the tree node groups of the provided tree", () => {
        const tree = {
            a: {
                b: 1,
                c: {
                    cc: 2,
                },
            },
            d: 3,
            f: {
                g: 4,
            },
        };
        type node = { t: { [x: string]: unknown }; p: string };
        const nodeRows = nodeGroups<node>({
            getChildren: ({ treeNode: node }) => {
                const { t, p } = node;
                const v = t[p];
                if (isOfObjectInternalClass(v)) {
                    return Object.keys(v).map((key) => ({
                        t: v,
                        p: key,
                    }));
                } else return [];
            },
            root: { t: { root: tree }, p: "root" },
        });
        expect(nodeRows).toStrictEqual([
            [[{ t: { root: tree }, p: "root" }]],
            [
                [
                    { t: tree, p: "a" },
                    { t: tree, p: "d" },
                    { t: tree, p: "f" },
                ],
            ],
            [
                [
                    {
                        t: {
                            b: 1,
                            c: {
                                cc: 2,
                            },
                        },
                        p: "b",
                    },
                    {
                        t: {
                            b: 1,
                            c: {
                                cc: 2,
                            },
                        },
                        p: "c",
                    },
                ],
                [],
                [
                    {
                        t: {
                            g: 4,
                        },
                        p: "g",
                    },
                ],
            ],
            [
                [],
                [
                    {
                        t: {
                            cc: 2,
                        },
                        p: "cc",
                    },
                ],
                [],
            ],
            [[]]
        ]);
    });
});
