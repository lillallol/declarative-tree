import { extendedTreeNodeMetadata } from "../extendedTreeNodeMetadata";
import { nodeGroups } from "../../common/nodeGroups";
import { preOrderTraverseTree } from "../../traverse-tree/preOrderTraverseTree";

import type { ITreeNodeMetadataTreeToString, ITreeToStringHorizontalFactory } from "../../publicApi";
import { internalErrorMessages } from "../../errorMessages";
import { constants } from "../../constants";

export const treeToStringHorizontalFactory: ITreeToStringHorizontalFactory = function treeToStringHorizontalFactory(
    strategy
) {
    const { getChildren, getRoot, nodeToString } = strategy;
    const { stem, twig } = constants;

    type N = ReturnType<typeof getRoot>;
    return (_) => {
        const { tree } = _;

        if (twig.length - stem.length < 0) throw Error(internalErrorMessages.badTwigAndStemLength);

        const root = getRoot({ tree });

        const allExtendedTreeNodeMetadata = extendedTreeNodeMetadata({
            nodeGroups: nodeGroups({
                getChildren: getChildren,
                root: root,
            }),
        });

        let stringToReturn = nodeToString({ treeNodeMetadata: allExtendedTreeNodeMetadata[0] });

        const intend: string[] = [];

        const twigTypeSeparator = " ";

        let index = 0;

        const preOrderedMetadata: ITreeNodeMetadataTreeToString<N>[] = [];
        preOrderTraverseTree<ITreeNodeMetadataTreeToString<N>>({
            getChildren: ({ treeNode }) => treeNode.childrenGroup,
            root: allExtendedTreeNodeMetadata[0],
            cb: ({ currentNode }) => {
                preOrderedMetadata.push(currentNode);
            },
        });

        //@TODO find a way to use pre order traversal module here
        // careful because the way I iterate here is not the one that it should be
        (function recurse(currentNode: N, identString: string) {
            index++;
            const children = getChildren({ treeNode: currentNode });

            const lastI = children.length - 1;

            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                stringToReturn +=
                    "\n" +
                    intend.join("") +
                    twig +
                    twigTypeSeparator +
                    nodeToString({ treeNodeMetadata: preOrderedMetadata[index] });

                if (i === lastI) {
                    intend.push(" ".repeat(twig.length) + twigTypeSeparator);
                    recurse(child, identString);
                    intend.pop();
                } else {
                    intend.push(stem + " ".repeat(twig.length - stem.length) + twigTypeSeparator);
                    recurse(child, identString);
                    intend.pop();
                }
            }
        })(root, "");

        return stringToReturn;
    };
};
