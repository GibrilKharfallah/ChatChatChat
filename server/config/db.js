const mongoose = require("mongoose");

require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            //useNewUrlParser: true,
            //useUnifiedTopolgy: true,
        });
        console.log("MongoDB connectée avec succès !");
    } catch (error) {
        console.log(`Erreur: ${error.message}`);
        process.exit(1);
    }
};

module.exports = ("connectDB", connectDB);