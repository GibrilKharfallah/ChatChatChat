const mongoose = require("mongoose");
const Message = require("../models/Messages.js");
const User = require ("../models/userSchema.js");

const dotenv = require("dotenv");
dotenv.config();

describe("Message Saving", () => {
    let channel;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI,{
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });

        channel = await Message.create({ channel: "general", messages: [] });
    });

    afterAll(async () => {
        await Message.deleteMany();
        await mongoose.connection.close();
    });

    test("Sould save a message inside a channel", async () => {
        const newMessage = {
            sender: "testUser",
            content: "Salut Salut !",
        };

        channel.messages.push(newMessage);
        await channel.save();

        const updatedChannel = await Message.findOne({ channel: "general" });

        expect(updatedChannel.messages.length).toBe(1);
        expect(updatedChannel.messages[0].sender).toBe("testUser");
        expect(updatedChannel.messages[0].content).toBe("Salut Salut !");
        expect(updatedChannel.messages[0].timestamps).toBeDefined();
    });
});