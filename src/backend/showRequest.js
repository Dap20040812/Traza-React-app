import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'

function showRequest(uid,dispatch)
{
    db.collection('empresas').doc(uid).collection('myRequests').onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setPublis(tempPublis));
    })
}

export default showRequest