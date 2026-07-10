
import { document } from "./document.js";
import { operation } from "./operation.js";
import { applyOperation } from "./engine.js";

const newDocument = applyOperation(document, operation);

console.log(newDocument);
const document = {

    content: "HelloA",

    version: 1

};
const history={
    type: "insert",
        position: 5,
        text: "A",
        version: 0
};
const operation = {
    type: "insert",
    position: 5,
    text: "B",
    version: 0
};


