const { generateModel } = require("../generateModel");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating mongoose model with valid input`, () => {
    beforeAll(() => {
        fs.mkdirSync.mockClear();
        fs.writeFileSync.mockClear();
        generateModel(["generate", "model", "car", "make:String", "model:String"]);
    });

    it(`"fs.mkdirSync" should be called with "models" `, () => {
        expect(fs.mkdirSync).toHaveBeenNthCalledWith(1, `models`, {
            recursive: true,
        });
    });

    it(` "fs.mkdirSync" to be called 1 time`, () => {
        expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    });

    it(`"fs.mkdirSync" should return with undefined`, () => {
        expect(fs.mkdirSync).toHaveLastReturnedWith(undefined);
    });

    it(`"fs.writeFileSync" should be called with "models/Car.js, expect.any(String)" `, () => {
        expect(fs.writeFileSync).toHaveBeenNthCalledWith(
            1,
            `models/Car.js`,
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

describe(`Test generating mongoose model with undefined or null input`, () => {
    beforeAll(() => {
        fs.mkdirSync.mockClear();
        fs.writeFileSync.mockClear();
        generateModel(["generate", "model", undefined]);
        generateModel(["generate", "model", null]);
    });

    it(` "fs.mkdirSync" to be called 0 times`, () => {
        expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
    });

    it(` "fs.writeFileSync" to be called 0 times`, () => {
        expect(fs.writeFileSync).toHaveBeenCalledTimes(0);
    });
});
