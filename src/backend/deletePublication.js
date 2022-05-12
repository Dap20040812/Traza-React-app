import db from '../firebase'



function deletePublication(idp,uuid)

{
    db.collection('publications').doc(idp).delete()
    db.colllection('empresas').doc(uuid).collection('publicacionesRecientes').doc(idp).delete()
}



export default deletePublication