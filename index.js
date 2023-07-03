const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");


const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log('Database is connected successfully'.blue.bold);
    } catch (error) {
        console.error('Database connection error:', error);
        setTimeout(connectToDatabase, 5000);
    }
};

connectToDatabase();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});

