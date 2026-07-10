const transform = (incomingOp, existingOp) => {

    if(incomingOp.type==="insert"&& existingOp.type==="insert"){
        if(incomingOp.position>=existingOp.position){
            incomingOp.position++;
        }
    }
    if(incomingOp.type==="insert"&& existingOp.type==="delete"){
        if(incomingOp.position>=existingOp.position){
            incomingOp.position--;
        }
    }
     if(incomingOp.type==="delete"&& existingOp.type==="insert"){
        if(incomingOp.position>=existingOp.position){
           incomingOp.position++;
        }
    }
    if(incomingOp.type==="delete"&& existingOp.type==="delete"){
        if(incomingOp.position>existingOp.position){
           incomingOp.position--;
        }
         if(incomingOp.position==existingOp.position){
           return null;
        }
    }
    return incomingOp;
};




export {

    transform

};