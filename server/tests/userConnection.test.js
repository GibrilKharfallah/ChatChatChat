const io = require("socket.io-client");

describe("User connection", () => {
    let socket;

    beforeEach((done) => {
        socket = io("http://localhost:4000");
        socket.on("connect", done);
    });

    afterEach(() => {
        socket.close();
    });

    test("Should broadcast user connection", (done) => {
        const pseudo = "newUser";

        socket.emit("user-connected", pseudo);

        socket.on("display-connection", (connectedPseudo) => {
            expect(connectedPseudo).toBe(pseudo);
            done();
        });
    });
});