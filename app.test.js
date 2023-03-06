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
describe("GET /download", () => {
    test('it should respond with 200 code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200)
    })
})