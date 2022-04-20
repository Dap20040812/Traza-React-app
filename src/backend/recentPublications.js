import db from '../firebase'
import firebase from 'firebase/compat/app';

/**
 * 
 * @param {String} uuidEmpresa uid de la emrpesa de la cual se queire ver las publicaciones recientes
 * @param {String} idReciente id de la publicaciones que se van a mostrar como publicaciones recientes 
 */
function recentPublications(uuidEmpresa,idReciente)
{
    db.collection('empresas').doc(uuidEmpresa).update( {
        recentPublications:firebase.firestore.FieldValue.arrayUnion(idReciente)
     });
}

export default recentPublications