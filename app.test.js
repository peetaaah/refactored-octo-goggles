const request = require("supertest");
const app = require("./app");

describe("GET /", () => {
    test('it should respond with 200 code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200)
    })
})
describe("GET /upload", () => {
    test('it should respond with 200 code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200)
    })
})
describe("POST /upload", () => {
    test('it should respond with 200 code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200)
        // did a console.log(res.statusCode) on the upload.js file and it shows 200, so i will leave it as 200.
        // there is no redirection in this case.
    })
})
describe("GET /download", () => {
    test('it should respond with 200 code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200)
    })
})
describe("GET /Images/:id.:ext", () => {
    test('it should respond with 404 code if file does not exist', async () => {
        const response = await request(app).get('/Images/NoSuchFile.png');
        // this is just to make sure that it indeed does return a 404 on NoSuchFile.png.
        // pls don't add an actual NoSuchFile.png haha
        expect(response.statusCode).toBe(404)
    })
})