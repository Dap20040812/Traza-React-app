import db from '../firebase'
import { publicationInProgress } from './changePublication'
import deleteRequest from './deleteRequest'

function acceptedRequest(idr,com,price)
{
    db.collection('request').doc(idr).update({
        accepted: true,
        comentarios: com,
        finalPrice: price
    })
}

function finalAcceptance(idr,idp)
{
    publicationInProgress(idr)
    db.collection('request').where('id','==',idr).get().then(snapshot=>{
        
        snapshot.forEach(doc=>{
            if(doc.data().accepted)
        {
            console.log("SI")
            db.collection('request').doc(doc.data().id).update({
                finalAcceptance: true,
    

            })
        
                db.collection('publications').doc(idp).update({
                    request: idr
            })

            deleteRequest(idr)
        }
        else
        {
            console.log("NO")
        }
        })
    })
}

function rejectRequest(idr,mo)
{
    db.collection('request').doc(idr).update({
        accepted: false,
        motivosR: mo
    })
}

function finalRejection(idr)
{
    db.collection('request').doc(idr).update({
        finalacceptance: false,
    })

}

export {acceptedRequest,finalAcceptance,rejectRequest,finalRejection}