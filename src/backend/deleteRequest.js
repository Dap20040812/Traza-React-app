import db from '../firebase'



function deleteRequest(idr)

{

    db.collection('request').doc(idr).delete()

}



export default deleteRequest