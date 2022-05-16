import db from "../firebase"
import firebase from 'firebase/compat/app'; 


function chatSetupp(ido,inputValue,empresaId)
{
    db.collection("orderInProgress").doc(ido).collection("chat").add({
        text:inputValue,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        company:empresaId
    })
}

export default chatSetupp