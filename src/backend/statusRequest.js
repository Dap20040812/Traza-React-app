import { Collections } from '@material-ui/icons'
import { CommentsDisabled } from '@mui/icons-material'
import db from '../firebase'

function acceptedRequest(idr)
{
    db.collection('request').doc(idr).update({
        accepted: true
    })
}

function finalAcceptance(idr,idp,com,price)
{
    db.collection('request').where('id','==',idr).get().then(snapshot=>{
        
        snapshot.forEach(doc=>{
            if(doc.data().accepted)
        {
            console.log("SI")
            db.collection('request').doc(doc.data().id).update({
                finalAcceptance: true,
                comentarios: com,
                finalPrice: price

            })
        
                db.collection('publications').doc(idp).update({
                    request: idr
            })
        }
        else
        {
            console.log("NO")
        }
        })
    })
}

function rejectRequest(idr)
{
    db.collection('request').doc(idr).update({
        accepted: false
    })
}

function finalRejection(idr)
{
    db.collection('request').where('id','==',idr).get().then(snapshot=>{
        
        snapshot.forEach(doc=>{
            if(doc.data().accepted)
        {
            console.log("SI")
            db.collection('request').doc(doc.data().id).update({
                finalAcceptance: false
            })
        }
        })
    })
}

export {acceptedRequest,finalAcceptance,rejectRequest,finalRejection}