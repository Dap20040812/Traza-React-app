import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'

/**
 * Esta función sirve para mostrar las publicaciones recientes por cada empresa
 * @param {String} uuidEmpresa uid de la emrpesa de la cual se queire ver las publicaciones recientes
 * @param {String} idReciente id de la publicaciones que se van a mostrar como publicaciones recientes 
 */

function saveRecentPublications(uuidEmpresa,idReciente,date,hour)
{
    db.collection('publications').doc(idReciente).update({
        fechaDeVisualizacion:date,
        horaDeVisualizacion:hour
    })
    db.collection('publications').where('id','==',idReciente).get().then((snapshot)=>{
        snapshot.forEach((doc) =>{
            db.collection('empresas').doc(uuidEmpresa).collection('publicacionesRecientes').doc(idReciente).set(doc.data())
        })
    })
}
/**
 * Esta función para mostrar las publicaciones recientes cliqueadas por el usuario
 * @param {String} uuidEmpresa uuid de la empresa
 * @param {Dispatch()} dispatch variable que usa react
 */
function showRecentPublication(uuidEmpresa,dispatch)
{
    db.collection("empresas").doc(uuidEmpresa).collection('publicacionesRecientes').where('state','==','active').limit(4).onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setPublis(tempPublis));
    })
    
}

export {saveRecentPublications,showRecentPublication}