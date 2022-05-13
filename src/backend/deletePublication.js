import db from '../firebase'



function deletePublication(idp,idempresa)

{
    db.collection('publications').doc(idp).delete();
    db.collection('empresas').doc(idempresa).collection('publicacionesRecientes').doc(idp).delete();
    db.collection('empresas').doc(idempresa).collection('favoritePublications').doc(idp).delete();
}



export default deletePublication