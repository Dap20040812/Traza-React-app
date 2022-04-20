import db from '../firebase'
import firebase from 'firebase/compat/app'; 

function recentPublications(uuidEmpresa,idReciente)
{
    db.collection('empresas').doc(uuidEmpresa).update( {
        recentPublications:firebase.firestore.FieldValue.arrayUnion(idReciente)
     });
}

export default recentPublications