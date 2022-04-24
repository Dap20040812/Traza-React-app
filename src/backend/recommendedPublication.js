import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'

/**
 * Esta función sirve para mostrar las publicación recomendadas
 * @param {String} dispatch Variable de react que funciona para que las publicaciones se vean
 */

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