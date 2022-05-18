import db from '../firebase'
import { v4 as uuidv4 } from 'uuid';

function createOrderInProgress(empresaP,empresaR)
{
    let uuidO = uuidv4() 
    db.collection("orderInProgress").doc(uuidO).set({
        id:uuidO,
        empresaPublication: empresaP,
        empresaRequest: empresaR
    })
}

export default createOrderInProgress