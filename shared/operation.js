
// const createOperation = ( type, position,text,clientId,version
// ) => {
//     return {
//         type,
//         position,
//         text,
//         clientId,
//         version
//     };
// };
const operation = {
    type: "insert",
    position: 5,
    text: "X",
    version: 0
};
const validateOperation = ( operation) => {
    const { type, position, text } = operation;
     if (type !== "insert" && type !== "delete") {
        throw new Error("Invalid operation type");
    }
     if (typeof position !== "number" || position < 0) {
        throw new Error("Invalid position");
    }
      if (typeof text !== "string") {
        throw new Error("Text must be a string");
    }
    if (type === "delete" && text.length === 0) {
        throw new Error("Delete text cannot be empty");
    }
   
  return true;
    
}
export{
    validateOperation,operation
}