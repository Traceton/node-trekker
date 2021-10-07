const { generateEmptyServer } = require("../generateEmptyServer");

const fs = require("fs");

jest.mock("fs");

describe(`Test generating empty-server with valid input(no input needed)`, () => {
    beforeAll(() => {
        fs.writeFileSync.mockClear();
        generateEmptyServer(["generate", "empty-server"]);
    });

    it(` "fs.mkdirSync" to be called 0 times`, () => {
        expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
    });

    it(`"fs.writeFileSync" should be called with ".env, expect.any(String)" and "server.js, expect.any(String)" `, () => {
        expect(fs.writeFileSync).toHaveBeenNthCalledWith(
            1,
            `.env`,
            expect.any(String)
        );
        expect(fs.writeFileSync).toHaveBeenNthCalledWith(
            2,
            `server.js`,
            expect.any(String)
        );
    });

    it(` "fs.writeFileSync" to be called 2 times`, () => {
        expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
    });

    it(`"fs.writeFileSync" should return with undefined`, () => {
        expect(fs.writeFileSync).toHaveLastReturnedWith(undefined);
    });
});

describe(`Test generating empty-server with undefined or null input`, () => {
    beforeAll(() => {
        fs.mkdirSync.mockClear();
        fs.writeFileSync.mockClear();
        generateEmptyServer(["generate", "empty-server", undefined]);
        generateEmptyServer(["generate", "empty-server", null]);
    });

    it(` "fs.mkdirSync" to be called 0 times`, () => {
        expect(fs.mkdirSync).toHaveBeenCalledTimes(0);
    });

    it(` "fs.writeFileSync" to be called 0 times`, () => {
        expect(fs.writeFileSync).toHaveBeenCalledTimes(4);
    });
});
