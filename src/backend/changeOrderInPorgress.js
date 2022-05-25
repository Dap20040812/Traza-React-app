import db from '../firebase'
import { publicationEnded } from './changePublication'

function endOrderInProgress(ido,idp)
{
    db.collection('orderInProgress').where('id','==',ido).get().then((snapshot)=>{
        snapshot.forEach((doc) =>{
            db.collection('OrderEnded').doc(idp).set(doc.data())
            db.collection('OrderInProgress').doc(idp).delete()
        })
    })
    publicationEnded(idp)
}