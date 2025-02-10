const request = require('supertest');
const mongoose = require("mongoose");
const { http, io } = require("../index.js");

describe("Test de démarrage du serveur", () => {
    afterAll(async () => {
        //io.close();
        http.close();
        await mongoose.connection.close();
    });

    test("Devrait démarrer le serveur et répondre sur le port 4000", async () => {
        const res = await request(http).get("/");
        expect(res.statusCode).toBe(404);
    });
});