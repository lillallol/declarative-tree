import { avlTreeFromVerticalTreeString } from "./avlTreeFromVerticalTreeString";
import type { IAvlTree, IAvlTreeNode } from "./avlTreeFromVerticalTreeString";
import { IGetChildren, IGetRoot } from "../publicApi";

export const avlTree = avlTreeFromVerticalTreeString`
        ${1}
        (  ).
    ${-2}  ${7}
       .   (   ).
          ${6}${10}
           .      ).
               ${11}
               (.
               ${3} 
                  ).
                  ${4}
`;

export const avlTreeGetChildren: IGetChildren<IAvlTreeNode> = ({ treeNode }) => {
    const { left, right } = treeNode;
    const toReturn = [];
    if (left !== null) toReturn.push(left);
    if (right !== null) toReturn.push(right);
    return toReturn;
};

export const avlTreeGetRoot: IGetRoot<IAvlTree, IAvlTreeNode> = ({ tree }) => {
    return tree.root;
};
