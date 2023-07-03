const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
// import routes

// const qusAnsRoute = require("./routes/qusAns.route");

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

// app.use("/api/v1/user", userRoute);
// app.use("/api/v1", productRoute);
// app.use("/api/v1/category", categoryRoute);
// app.use("/api/v1/order", orderRoute);
// app.use("/api/v1/currency", currencyRoute);
// app.use("/api/v1/review", reviewRoute);
// app.use("/api/v1/question", qusAnsRoute);

module.exports = app;