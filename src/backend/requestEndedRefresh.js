import db from '../firebase'

function requestEndedRefresh()
{
    db.collection('request').where('state','==','Ended').get().then(snapshot=>{
        snapshot.forEach(doc=>{
            db.collection('request').where('id','==',doc.data().id).get().then((snapshot)=>{
                snapshot.forEach((doc) =>{
                    db.collection('requestEnded').doc(doc.data().id).set(doc.data())
                    db.collection('request').doc(doc.data().id).delete()
                })
            })
        })
    })
}

export default requestEndedRefresh