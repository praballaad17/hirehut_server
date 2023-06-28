const express = require("express");

const http = require("http");
const socketIO = require("socket.io");
require("dotenv").config();

const auth = require("./routes/auth");
const profile = require("./routes/profile");
const employeer = require("./routes/employeer");
const jobseeker = require("./routes/jobseeker");

const app = express();
require("./startups/cors")(app);
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
  },
});

module.exports = { io };
require("./controllers/messageController")();

app.use(express.json({ limit: "50mb" }));
require("./startups/dotenv")();
const { mongofunction } = require("./startups/mongodb");
mongofunction(app);

app.get("/", (req, res) => {
  res.send("server is up and running!");
});

const message = require("./routes/message");

app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/employeer", employeer);
app.use("/api/jobseeker", jobseeker);
app.use("/api/message", message);

const port = process.env.PORT || 3003;
server.listen(port, () => console.log(`Listening on port ${port}...`));
