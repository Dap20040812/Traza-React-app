import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'

function queryMyPublications(nit,dispatch)
{
    db.collection("publications").where('empresaUid','==',nit).onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setPublis(tempPublis));
    })
}
export default queryMyPublications

