import db from '../firebase'
import { publicationEnded } from './changePublication'

function endOrderInProgress(ido,idp)
{
    db.collection('orderInProgress').where('id','==',ido).get().then((snapshot)=>{
        snapshot.forEach((doc) =>{
            db.collection('orderEnded').doc(ido).set(doc.data())
            db.collection('orderInProgress').doc(ido).delete()
        })
    })
    publicationEnded(idp)
}
export default endOrderInProgress