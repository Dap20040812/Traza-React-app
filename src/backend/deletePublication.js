import db from '../firebase'



<<<<<<< HEAD
function deletePublication(idp,uuid)

{
    db.collection('publications').doc(idp).delete()
    db.colllection('empresas').doc(uuid).collection('publicacionesRecientes').doc(idp).delete()
=======
function deletePublication(idp,idempresa)

{
    db.collection('publications').doc(idp).delete();
    db.collection('empresas').doc(idempresa).collection('publicacionesRecientes').doc(idp).delete();
    db.collection('empresas').doc(idempresa).collection('favoritePublications').doc(idp).delete();
>>>>>>> 9b5113fabc48d576f7cfb5affd9f18f313b8e6ab
}



export default deletePublication