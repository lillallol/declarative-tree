module.exports = {
    printWidth: 120,
    tabWidth: 4,
    overrides: [
        {
            files: ["src/examples/*.ts"],
            options: {
                printWidth: 80,
                tabWidth: 4,
            },
        },
    ],
};
