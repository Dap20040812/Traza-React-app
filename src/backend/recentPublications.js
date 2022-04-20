import db from '../firebase'
import firebase from 'firebase/compat/app';

/**
 * 
 * @param {String} uid uid de la emrpesa de la cual se queire ver las publicaciones recientes
 * @param {String} id id de la publicaciones que se van a mostrar como publicaciones recientes 
 */

function recentPublications(uid,id)
{
    /*
    db.collection('empresas').doc(uid).get().then((doc)=>{
        console.log(doc.data().recentPublications)
    })
    */

    
    db.collection('empresas').doc(uid).update( {
        publications:firebase.firestore.FieldValue.arrayUnion(id)
     });

     
}
export default recentPublications