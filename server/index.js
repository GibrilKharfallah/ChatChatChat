const { log } = require("console");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const channelRoutes = require('./routes/channelRoutes');
const app = express();

const http = require("http").createServer(app);
const Message = require("./models/messageSchema.js");
const User = require("./models/userSchema.js");
const connectDB = require('./config/db.js');

dotenv.config();

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

//requete de socket.io
io.on("connection", (socket) => {
    console.log("Un utilisateur est connecté");

    socket.on("user-connected", ({pseudo, isCurrentChannel}) => {
        io.emit("display-connection", {pseudo, isCurrentChannel})
    });

    socket.on("message", async (msg) => {
        try {
            const { pseudo, message } = msg;
            const newMessage = await Message.create({
                sender: pseudo,
                content: message,
            });
            console.log("Message sauvegardé :", newMessage);
            //saveMessage(senderId, message);
        } catch (err) {
            console.log("Erreur lors de l'enregistrement du message : ", err);
        }

        io.emit("message", msg)
        
    });

    socket.on("disconnect", () => {
        console.log("Un utilisateur s'est deconnecté");
    })

    socket.on("create-channel", (rest) => {
        console.log("1");
        
        io.emit("create", rest)
        console.log("2");
    })

    socket.on("delete-channel", (rest) => {
        io.emit("delete", rest)
    })
    
})


//connexion a mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connecté"))
.catch((err) => console.error("Erreur de connexion à MongoDB", err));

app.use('/api', channelRoutes);

http.listen(4000, () => {
    console.log("Serveur demarré sur le port 4000");
})