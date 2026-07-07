const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


io.on("connection", (socket) => {

    console.log("Connected:", socket.id);

    socket.on("message", (msg) => {

        console.log("Received:", msg);

        socket.emit("reply", "Hello Client");

    });

});

server.listen(3000, () => {

    console.log("Server Started");

});