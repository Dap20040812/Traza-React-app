import { publicationCancelled } from "./changePublication";
import db from '../firebase'

function cancelledPublicationsRefresh()
{
    var now = new Date()
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    db.collection('publications').where('departureDate','<',today).get().then(snapshot=>{
        snapshot.forEach(doc=>{
            publicationCancelled(doc.data().id)
        })
    })
}

export default cancelledPublicationsRefresh