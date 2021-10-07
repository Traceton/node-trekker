const { generateEmptyRouter } = require("../generateEmptyRouter");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating empty-router with valid input`, () => {
    beforeAll(() => {
        fs.mkdirSync.mockClear();
        fs.writeFileSync.mockClear();
        generateEmptyRouter(["generate", "empty-router", "car"]);
    });

    it(`"fs.mkdirSync" should be called with "routes" `, () => {
        expect(fs.mkdirSync).toHaveBeenNthCalledWith(1, `routes`, {
            recursive: true,
        });
    });

    it(` "fs.mkdirSync" to be called 1 time`, () => {
        expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    });

    it(`"fs.mkdirSync" should return with undefined`, () => {
        expect(fs.mkdirSync).toHaveLastReturnedWith(undefined);
    });

    it(`"fs.writeFileSync" should be called with "routes/Cars.js, expect.any(String)" `, () => {
        expect(fs.writeFileSync).toHaveBeenNthCalledWith(
            1,
            `routes/Cars.js`,
            expect.any(String)
        );
    });

    it(` "fs.writeFileSync" to be called 1 time`, () => {
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    it(`"fs.writeFileSync" should return with undefined`, () => {
        expect(fs.writeFileSync).toHaveLastReturnedWith(undefined);
    });
});

describe(`Test generating empty-router with undefined or null input`, () => {
    beforeAll(() => {
        fs.mkdirSync.mockClear();
        fs.writeFileSync.mockClear();
        generateEmptyRouter(["generate", "empty-router", undefined]);
        generateEmptyRouter(["generate", "empty-router", null]);
    });

    it(` "fs.mkdirSync" to be called 0 times`, () => {
        expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
    });

    it(` "fs.writeFileSync" to be called 0 times`, () => {
        expect(fs.writeFileSync).toHaveBeenCalledTimes(0);
    });
});
