import db from '../firebase'

/**
 * Esta función sirve para cambiar la publicación de estado (Active, inPrgoress, cancelled, ended)
 * @param {String} idp id de la publicación a la que se le quiere hacer el cambio de estado
 */

function publicationInProgress(idp)
{
    db.collection('publications').doc(idp).update({
        state:'In progress'
    })

    db.collection('publications').where('id','==',idp).get().then((snapshot)=>{
        snapshot.forEach((doc) =>{
            db.collection('publicationInProgress').doc(idp).set(doc.data())
            db.collection('publications').doc(idp).delete()
        })
    })
}
function publicationEnded(idp)
{
    console.log('test')
    db.collection('publicationInProgress').doc(idp).update({
        state:'Ended'
    })
    db.collection('publicationInProgress').where('id','==',idp).get().then((snapshot)=>{
        snapshot.forEach((doc) =>{
            db.collection('publicationEnded').doc(idp).set(doc.data())
            db.collection('publicationInProgress').doc(idp).delete()
        })
    })
}
function publicationCancelled(idp)
{
    db.collection('publications').doc(idp).update({
        state:'Cancelled'
    })

    db.collection('publications').where('id','==',idp).get().then((snapshot)=>{
        snapshot.forEach((doc) =>{
            db.collection('publicationsCancelled').doc(idp).set(doc.data())
            db.collection('publications').doc(idp).delete()
        })
    })
}
export {publicationInProgress,publicationEnded,publicationCancelled}