import db from '../firebase'
import { setRequests } from '../features/request/requestSlice'

function showRequest(uid,dispatch)
{
    db.collection('empresas').doc(uid).collection('myRequests').onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setRequests(tempPublis));
    })
}

export default showRequest