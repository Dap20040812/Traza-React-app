import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'

/**
 * Esta función sirve para mostrar las publicaciones de cada empresa
 * @param {String} nit Nit de la empresa de la cual se quieren ver las publicaciones
 * @param {String} dispatch Variable de react para poder visualizar la publicaciones
 */

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

