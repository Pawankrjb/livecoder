import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { processOperation } from "../shared/engine.js";
let document = {
    content: "Hello",
    version: 0
};

let history = [];

const app = express();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);
    socket.emit("document", document);   
    socket.on("operation", (operation) => {
        document = processOperation(
            document,
            operation,
            history
        );
        history.push(operation);
        socket.broadcast.emit("operation", operation);
    });


    socket.on("disconnect", () => {
        console.log("Client Disconnected:", socket.id);
    });

});

server.listen(3000, () => {
    console.log("Server Running");
});