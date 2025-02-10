const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

describe("MongoDB connexion", () => {
    it("Should connect to MongoDB database with success", async () => {
        const connectSpy = jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(true);
        await mongoose.connect(process.env.MONGO_URI);
        expect(connectSpy).toHaveBeenCalledWith(process.env.MONGO_URI);

        connectSpy.mockRestore();
    });

    it("Should capture error if connection to MongoDB database fails", async () => {
        const connectSpy = jest.spyOn(mongoose, 'connect').mockRejectedValueOnce(new Error("Failed connection"));

        try {
            await mongoose.connect('invalid_uri');
        } catch (error) {
            expect(error.message).toBe("Failed connection");
        }

        connectSpy.mockRestore();
    });
})