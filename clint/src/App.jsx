import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io("http://localhost:3000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
  }, []);

  return (
    <>
      <h1>Live Coder</h1>

      <button
        onClick={() => {
          socket.emit("operation", {
            type: "insert",
            position: 5,
            text: "A",
            version: 0,
          });

          console.log("Operation Sent");
        }}
      >
        Send Operation
      </button>
    </>
  );
}

export default App;
