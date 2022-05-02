import db from '../firebase'



function deletePublication(idp)

{

    db.collection('publications').doc(idp).delete()

}



export default deletePublication