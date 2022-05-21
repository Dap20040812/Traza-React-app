import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'
import {setOrdersInProgress} from '../features/inProgress/orderInProgressSlice'

function showOrderInProgress(dispatch)
{
    db.collection("orderInProgress").onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setOrdersInProgress(tempPublis));
    })
    console.log('SiEstoy')
}

export default showOrderInProgress