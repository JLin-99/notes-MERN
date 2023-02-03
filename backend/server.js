require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

mongoose.set("strictQuery", false);
connectDB();

app.use(logger);

app.use(express.json());

app.use(express.static("public"));

app.use("/", require("./routes/root"));
app.use("/api/users", require("./routes/userRoutes"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  logEvents(
    `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
    "mongoErrorLog.log"
  );
});
