const express = require("express");

const http = require("http");
require("dotenv").config();

const auth = require("./routes/auth");

const app = express();
require("./startups/cors")(app);
const server = http.createServer(app);

app.use(express.json({ limit: "50mb" }));
require("./startups/dotenv")();
const { mongofunction } = require("./startups/mongodb");
mongofunction(app);

app.get("/", (req, res) => {
  res.send("server is up and running!");
});

app.use("/api/auth", auth);

const port = process.env.PORT || 3003;
server.listen(port, () => console.log(`Listening on port ${port}...`));
