const { generateRouter } = require("../generateRouter");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating router with valid input`, () => {
    beforeAll(() => {
        fs.mkdirSync.mockClear();
        fs.writeFileSync.mockClear();
        generateRouter(["generate", "router", "car", "make:String", "model:string"]);
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

    it(`"fs.writeFileSync" should be called with "routes/cars.js, expect.any(String)" `, () => {
        expect(fs.writeFileSync).toHaveBeenNthCalledWith(
            1,
            `routes/cars.js`,
            expect.any(String)
        );
    });

    it(` "fs.writeFileSync" to be called 1 times`, () => {
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    it(`"fs.writeFileSync" should return with undefined`, () => {
        expect(fs.writeFileSync).toHaveLastReturnedWith(undefined);
    });
});

describe(`Test generating router with undefined or null input`, () => {
    beforeAll(() => {
        fs.mkdirSync.mockClear();
        fs.writeFileSync.mockClear();
        generateRouter(["generate", "router", undefined]);
        generateRouter(["generate", "router", null]);
    });

    it(` "fs.mkdirSync" to be called 0 times`, () => {
        expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
    });

    it(` "fs.writeFileSync" to be called 0 times`, () => {
        expect(fs.writeFileSync).toHaveBeenCalledTimes(0);
    });
});
