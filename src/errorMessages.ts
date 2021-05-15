export const errorMessages = {
    treeNodeHasNotBeenSetted:
        "You are trying to get a tree node that has not been yet setted. Did you forget to set any created tree node to the treeNode property of the metadata?",
    badBranchPlaceholderRelationship:
        "Placeholder row has total number of branches not equal to the total number of placeholders.",
    badSeparatorPlaceholderRelationship: `Placeholder row has total number of placeholders not equal to the total number of separator characters its corresponding branch rows has.`,

    //#region //@TODO print the tree and specify exactly where is the mistake in all errors
    badStartingString: "String before first placeholder has to be only of tabs spaces and new lines.",
    badEndingString: "String after last placeholder has to be only of tabs spaces and new lines",
    stringAfterNonLastPlaceholderHasTooManyLines: "String after (non-last) placeholder has to have one line break",
    afterPlaceholderBadString: "String after placeholder should have its first line only with tabs and spaces",
    badBranchStringPattern: `You can use only the following characters : " ","|","_" outside placeholder`,
    //#endregion
    //#region //@TODO print the tree and specify exactly where is the mistake in all errors
    badStartingStringV: "String before first placeholder has to be only of tabs spaces and new lines.",
    badEndingStringV: "String after last placeholder has to be only of tabs spaces and new lines",
    badStringBetweenPlaceholdersV: "There has to be only spaces and tabs between two same line placeholders.",
    oneMoreLineBreakNeededInBranchRowV: "Branch row line has to have two lines breaks.",
    tooManyLineBreaksInBranchRowV: "Branch row has to have only two line breaks",
    badBranchRowTrailingLinesV: "branch row string has to not have characters in its trailing lines",
    //#endregion
};

export const internalErrorMessages = {
    badTwigAndStemLength: "twig length has to be greater than stem length",
};
