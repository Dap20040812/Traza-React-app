import db from '../firebase'
/**
 * Esta funcion sirve para cambiar el email de una empresa
 * @param {String} uid ID de la empresa
 * @param {String} newEmail Email por el que se quiere cambiar 
 */
function changeEmailCompany(uid,newEmail)
{
    db.collection('empresas').doc(uid).update({
        correoEmpresa:newEmail
    })
}
/**
 * Esta función sirve para cambiar el número de telefono de una empresa
 * @param {String} uid ID de la empreas
 * @param {String} newPhone Número de teléfono por el cual se quiere cambiar
 */
function changePhoneCompanu(uid,newPhone)
{
    db.collection('empresas').doc(uid).update({
        telefonoEmpresa:newPhone
    })
}

export default updateCompany