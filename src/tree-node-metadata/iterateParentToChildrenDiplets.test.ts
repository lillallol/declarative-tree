import { extractBranches } from "../string-to-tree/vertical/extractBranches";
import { iterateParentToChildrenDiplets } from "./iterateParentToChildrenDiplets";
import { ijkToIndex } from "./ijkToIndex";
import { placeholdersGrouped } from "../string-to-tree/common/placeholdersGrouped";
import { tag } from "../test-utils/index";

describe(iterateParentToChildrenDiplets.name, () => {
    it.each([
        [
            {
                p1p2: tag`
                           ${1}
                         (      ).
                      ${-2}      ${7}
                      (   ).     (  ).
                    ${-3}${-1}${6}  ${10}
                       .   .    .   (   ).
                                  ${8} ${11}
                `,
                //placeholderGroupsIndex
                //[[0]],
                //[[1, 2]],
                //[[3, 4],[5, 6]],
                //[[], [], [], [7, 8]],
                result: [
                    [
                        {
                            i: 2,
                            j: 1,
                            jBot: 3,
                            k: 1,
                            parent: 10,
                            children: [8, 11],
                            parentIndex: 6,
                            childrenIndex: [7, 8],
                        },
                    ],
                    [
                        {
                            i: 2,
                            j: 1,
                            jBot: 2,
                            k: 0,
                            parent: 6,
                            children: [],
                            parentIndex: 5,
                            childrenIndex: [],
                        },
                    ],
                    [
                        {
                            i: 2,
                            j: 0,
                            jBot: 1,
                            k: 1,
                            parent: -1,
                            children: [],
                            parentIndex: 4,
                            childrenIndex: [],
                        },
                    ],
                    [
                        {
                            i: 2,
                            j: 0,
                            jBot: 0,
                            k: 0,
                            parent: -3,
                            children: [],
                            parentIndex: 3,
                            childrenIndex: [],
                        },
                    ],
                    [
                        {
                            i: 1,
                            j: 0,
                            jBot: 1,
                            k: 1,
                            parent: 7,
                            children: [6, 10],
                            parentIndex: 2,
                            childrenIndex: [5, 6],
                        },
                    ],
                    [
                        {
                            i: 1,
                            j: 0,
                            jBot: 0,
                            k: 0,
                            parent: -2,
                            children: [-3, -1],
                            parentIndex: 1,
                            childrenIndex: [3, 4],
                        },
                    ],
                    [
                        {
                            i: 0,
                            j: 0,
                            jBot: 0,
                            k: 0,
                            parent: 1,
                            children: [-2, 7],
                            parentIndex: 0,
                            childrenIndex: [1, 2],
                        },
                    ],
                ],
            },
        ],
    ])("iterates the parent children diplets of the provided tree", ({ p1p2, result }) => {
        const placeholderGroups = placeholdersGrouped(p1p2[1], extractBranches(...p1p2));
        const mockCb = jest.fn(() => undefined);
        const _placeholderGroupsIndex = ijkToIndex(placeholderGroups);
        iterateParentToChildrenDiplets({
            direction: "bottom-right-to-top-left",
            cb: mockCb,
            placeholderGroups: placeholderGroups,
            placeholderGroupsIndex: _placeholderGroupsIndex,
        });
        //@TODO find out why it fails for toStrictEqual
        expect(mockCb.mock.calls).toEqual(result);
        mockCb.mockClear();
        iterateParentToChildrenDiplets({
            direction: "top-left-to-bottom-right",
            cb: mockCb,
            placeholderGroups: placeholderGroups,
            placeholderGroupsIndex: _placeholderGroupsIndex,
        });
        expect(mockCb.mock.calls).toEqual(result.reverse());
    });
});
