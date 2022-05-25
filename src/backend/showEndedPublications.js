import db from '../firebase'
import { setPublis} from "../features/publi/publiSlice"

function showEndedPublications(uid,dispatch)
{
    db.collection("publicationEnded").where('empresaUid','==',uid).onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setPublis(tempPublis));
    })
}

export default showEndedPublications