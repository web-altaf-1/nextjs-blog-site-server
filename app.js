const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
// import routes
const userRoute = require("./routes/user.route");

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

app.use("/api/v1/user", userRoute);


module.exports = app;