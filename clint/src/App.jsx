import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { applyOperation } from "../../shared/engine.js";

const socket = io("http://localhost:3000");

function App() {
    const [document, setDocument] = useState({
        content: "Hello",
        version: 0,
    });

    useEffect(() => {

        // Initial document from server
        socket.on("document", (doc) => {
            setDocument(doc);
        });

        // Operations from other clients
        socket.on("operation", (operation) => {

            setDocument((prevDocument) => {
                return applyOperation(prevDocument, operation);
            });

            console.log("Received:", operation);
        });

        // Cleanup
        return () => {
            socket.off("document");
            socket.off("operation");
        };

    }, []);

    return (
        <>
            <h1>Live Coder</h1>

            <h2>{document.content}</h2>

            <button
                onClick={() => {

                    // Create operation using latest document
                    const operation = {
                        type: "insert",
                        position: document.content.length,
                        text: "A",
                        version: document.version,
                    };

                    // Optimistic update (update self immediately)
                    const newDocument = applyOperation(document, operation);
                    setDocument(newDocument);

                    // Send to server
                    socket.emit("operation", operation);

                    console.log("Operation Sent");

                }}
            >
                Send Operation
            </button>
        </>
    );
}

export default App;