import db from '../firebase'

function cancelRequest(idr)
{
    db.collection('request').doc(idr).update({
        state: 'Cancel'
    })
    db.collection('request').where('id','==',idr).get().then(snapshot=>{
        snapshot.forEach(doc=>{
            db.collection('requestCancelled').doc(idr).set(doc.data())
            db.collection('request').doc(idr).delete()
        })
    })
}

export default cancelRequest