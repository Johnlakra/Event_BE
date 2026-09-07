require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

// Routes
const deanery = require("./routes/deanery");
const position = require("./routes/position");
const event = require("./routes/event");
const leaderBoard = require("./routes/leaderBoard");
const parish = require("./routes/parish");
const dropdown = require("./routes/dropdown");
const stage = require('./routes/stage')
const liveonstage = require('./routes/liveonstage')

const { logger } = require("./middleware/logEvents");
const port = process.env.PORT || 3500;

app.get("/test", (req, res) => {
  return res.json({ data: "Testing" });
});
app.use(logger);
app.use("/deanery", deanery);
app.use("/position", position);
app.use("/event", event);
app.use("/leaderBoard", leaderBoard);
app.use("/parish", parish);
app.use("/dropdown", dropdown);
app.use("/stage", stage);
app.use('/liveonstage',liveonstage)

app.use((req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ message: "Server Error" });
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
