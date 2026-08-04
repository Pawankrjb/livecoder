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
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.send("🚀 Live Collaborative Code Editor Backend is Running!");
});

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Deployment ke baad frontend URL yaha de dena
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

// Azure App Service ke liye PORT
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
