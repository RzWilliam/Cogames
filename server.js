const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const next = require("next");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);
  const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Un utilisateur est connecté");

    socket.on("message", (data) => {
      const { username, message } = data;
      console.log(`${username} a envoyé un message : ${message}`);

      // Diffuse le message à tous les clients, avec le pseudo
      io.emit("message", { username, message });
    });

    socket.on("disconnect", () => {
      console.log("Utilisateur déconnecté");
    });
  });

  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
