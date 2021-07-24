const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

require("dotenv").config({ path: "./.env.local" });
const connectDb = require("./utilsServer/connectDb");

connectDb();

app.use(express.json());

const dev = process.env.NODE_ENV !== "production";

const PORT = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Server is up and running.");
  });
});
