const { generateRestTest } = require("../generateRestTest");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating rest tests with valid input`, () => {
    beforeAll(() => {
        fs.writeFileSync.mockClear();
        generateRestTest(["generate", "tests", "car", "make:String", "model:String"]);
    });

    it(`"fs.mkdirSync" should be called with "tests" `, () => {
        expect(fs.mkdirSync).toHaveBeenNthCalledWith(1, `tests`, {
            recursive: true,
        });
    });

    it(` "fs.mkdirSync" to be called 1 times`, () => {
        expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    });

    it(`"fs.writeFileSync" should be called with " "tests", expect.any(String)" and "server.js, expect.any(String)" `, () => {
        expect(fs.writeFileSync).toHaveBeenNthCalledWith(
            1,
            `tests/car.rest`,
            expect.any(String)
        );

    });

    it(` "fs.writeFileSync" to be called 2 times`, () => {
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    it(`"fs.writeFileSync" should return with undefined`, () => {
        expect(fs.writeFileSync).toHaveLastReturnedWith(undefined);
    });
});

describe(`Test generating rest tests with undefined or null input`, () => {
    beforeAll(() => {
        fs.mkdirSync.mockClear();
        fs.writeFileSync.mockClear();
        generateRestTest(["generate", "tests", undefined]);
        generateRestTest(["generate", "tests", null]);
    });

    it(` "fs.mkdirSync" to be called 0 times`, () => {
        expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
    });

    it(` "fs.writeFileSync" to be called 0 times`, () => {
        expect(fs.writeFileSync).toHaveBeenCalledTimes(0);
    });
});
