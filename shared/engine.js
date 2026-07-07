import { validateOperation } from "./operation.js";

const applyOperation = (document, operation) => {

    validateOperation(operation);

    const { type, position, text } = operation;
    const { content, version } = document;

    if (type === "insert") {

        if (position > content.length) {
            throw new Error("Insert position out of bounds");
        }

        const newContent =
            content.slice(0, position) +
            text +
            content.slice(position);

        return {
            content: newContent,
            version: version + 1
        };
    }

    if (type === "delete") {

        if (position >= content.length) {
            throw new Error("Delete position out of bounds");
        }

        const actualText = content.slice(
            position,
            position + text.length
        );

        if (actualText !== text) {
            throw new Error("Delete text mismatch");
        }

        const newContent =
            content.slice(0, position) +
            content.slice(position + text.length);

        return {
            content: newContent,
            version: version + 1
        };
    }

    throw new Error("Unknown operation");
};

export {
    applyOperation
};