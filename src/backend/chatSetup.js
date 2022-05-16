import db from "../firebase"
import firebase from 'firebase/compat/app'; 


function chatSetupp(empresaId,inputValue)
{
    db.collection('empresas').doc(empresaId).collection('supportChat').add({
        text:inputValue,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        company:empresaId
    })
    db.collection('supportChat').add({
        text:inputValue,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        company:empresaId
    }) 
}

export default chatSetupp