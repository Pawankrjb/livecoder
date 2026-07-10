import { processOperation } from "./engine.js";

const document = {
    content: "HelloAB",
    version: 2
};

const history = [
    {
        type: "insert",
        position: 5,
        text: "A",
        version: 0
    },
    {
        type: "insert",
        position: 6,
        text: "B",
        version: 1
    }
];

const operation = {
    type: "insert",
    position: 5,
    text: "X",
    version: 0
};

const newDocument = processOperation(
    document,
    operation,
    history
);

console.log(newDocument);
