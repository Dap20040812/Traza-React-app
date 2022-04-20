import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'


function recommendedPublications(dispatch)
{
    
    db.collection("publications").orderBy('departureDate').limit(4).onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setPublis(tempPublis));
    })
}

export default recommendedPublications