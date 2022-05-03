import db from '../firebase'
import { setRequests} from '../features/request/requestSlice'

function showMyRequest (idp,dispatch){

    db.collection("request").where("publication","==",idp).onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setRequests(tempPublis));
    })    
}

export default showMyRequest