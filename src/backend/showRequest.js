import db from '../firebase'
import { setRequests } from '../features/request/requestSlice'

function showUnacceptedRequest(uid,dispatch)
{
    db.collection('request').where('EmpresaUid','==',uid).where('state','==','Unaccepted').onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setRequests(tempPublis));
    }) 
}
function showAcceptedRequest(uid,dispatch)
{
    db.collection('request').where('EmpresaUid','==',uid).where('state','==','Accepted').onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setRequests(tempPublis));
    }) 
}

export {showAcceptedRequest,showUnacceptedRequest}