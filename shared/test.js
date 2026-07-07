
import { document } from "./document.js";
import { operation } from "./operation.js";
import { applyOperation } from "./engine.js";

const newDocument = applyOperation(document, operation);

console.log(newDocument);