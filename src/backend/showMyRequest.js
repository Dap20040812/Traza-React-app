import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'

function showMyRequest (idp,dispatch){

    db.collection("request").where("publication","==",idp).onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setPublis(tempPublis));
    })
    
}

export default showMyRequest