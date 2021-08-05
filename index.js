const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
require("dotenv").config({ path: "./.env.local" });
const cors = require("cors");

const connectDb = require("./utilsServer/connectDb");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

connectDb();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/search", require("./api/search"));
  app.use("/api/posts", require("./api/posts"));

  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is up and running on port ${PORT}.`);
  });
});
