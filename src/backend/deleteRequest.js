import db from '../firebase'
import cancelRequest from './changeRequest'


function deleteRequest(idr)
{
    cancelRequest(idr)
    db.collection('request').doc(idr).delete()

}

function timedeleteRequest(idr,idp)
{
    var now = new Date()
    var day = ("-1" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var yesterday = now.getFullYear()+"-"+(month)+"-"+(day) ;
    db.collection("request").where("id","==",idr).get().then(snapshot =>{
        snapshot.forEach(doc1=>{
            db.collection("publications").where("id","==",doc1.data().publication).get().then(snapshot=>{
                snapshot.forEach(doc2=>{
                    if(doc2.data().departureDate>yesterday)
                    {

                    }
                })
            })
        })
    })
}



export default deleteRequest