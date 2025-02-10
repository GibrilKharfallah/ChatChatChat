const io = require("socket.io-client");

describe("Socket.IO Connection", () => {
    let socket;

    beforeEach((done) => {
        socket = io("http://localhost:4000");
        socket.on("connect", () => {
            done();
        });
    });

    afterEach(() => {
        socket.disconnect();
    });

    test("Should connect to the server", (done) => {
        expect(socket.connected).toBe(true);
        done();
    });
});