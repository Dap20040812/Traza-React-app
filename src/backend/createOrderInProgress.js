import db from '../firebase'
import { v4 as uuidv4 } from 'uuid';

function createOrderInProgress(empresaP,empresaR,uid,oriAddress,destination,date,price,idp)
{
    let uuidO = uuidv4() 
    db.collection("orderInProgress").doc(uuidO).set({
        id:uuidO,
        empresaPublication: empresaP,
        empresaRequest: empresaR,
        userId: uid, 
        idBusqueda:{empresaP,empresaR},    
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        origin: oriAddress,
        destination: destination,
        date: date,
        precioFinal: price,
        publiid: idp

    })
}

export default createOrderInProgress