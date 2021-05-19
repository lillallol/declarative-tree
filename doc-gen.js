const { tsDocGenMd } = require("ts-doc-gen-md");
const { format } = require("prettier");

tsDocGenMd({
    format: (src) =>
        format(src, {
            tabWidth: 4,
            useTabs: false,
            printWidth: 74,
            parser: "typescript",
        }),
    output: "./documentation.md",
});
