import db from '../firebase'
import { publicationInProgress } from './changePublication'
<<<<<<< HEAD
import { deleteOnlyPublication } from './deletePublication'
=======
import deleteRequest from './deleteRequest'
>>>>>>> e23aabeba0bca2b49dfa3ae04042062654bd02b1

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
    publicationInProgress(idp)
<<<<<<< HEAD
    deleteOnlyPublication(idp)
=======
>>>>>>> e23aabeba0bca2b49dfa3ae04042062654bd02b1
    db.collection('request').where('id','==',idr).get().then(snapshot=>{
        
        snapshot.forEach(doc=>{
            if(doc.data().accepted)
        {
            console.log("SI")
            db.collection('request').doc(doc.data().id).update({
                finalAcceptance: true,

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