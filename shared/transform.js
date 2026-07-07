const transform = (incomingOp, existingOp) => {

    if(incomingOp.position>= existingOp.position){
        incomingOp.position++;
    }
};

export {

    transform

};