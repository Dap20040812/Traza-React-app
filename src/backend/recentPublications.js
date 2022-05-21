import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'
import firebase from 'firebase/compat/app';

/**
 * Esta función sirve para mostrar las publicaciones recientes por cada empresa
 * @param {String} uuidEmpresa uid de la emrpesa de la cual se queire ver las publicaciones recientes
 * @param {String} idReciente id de la publicaciones que se van a mostrar como publicaciones recientes 
 */

function saveRecentPublications(uuidEmpresa,idReciente)
{
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day);

    var hour = now.getHours().toString();


    db.collection('publications').where('id','==',idReciente).get().then((snapshot)=>{
        snapshot.forEach((doc) =>{
            db.collection('empresas').doc(uuidEmpresa).collection('publicacionesRecientes').doc(idReciente).set(doc.data())
            db.collection('empresas').doc(uuidEmpresa).collection('publicacionesRecientes').doc(idReciente).update({
                fechaDeVisualizacion: firebase.firestore.Timestamp.fromDate(new Date)
            })
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
    db.collection("empresas").doc(uuidEmpresa).collection('publicacionesRecientes').orderBy('fechaDeVisualizacion','desc').limit(4).where('idle','==',true).onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setPublis(tempPublis));
    })
    
}

export {saveRecentPublications,showRecentPublication}