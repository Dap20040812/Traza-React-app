import db from '../firebase'
/**
 * Esta función sirve para crear una empresa
 * @param {String} uid Uid de la empresa
 * @param {String} nombre Nombre de la empresa
 * @param {String} nit Nit de la empresa
 * @param {String} razonSocial Razon solcial de la empresa
 * @param {String} secotrEconomico Sector económico de la empresa
 * @param {String} correo correo de la empresa
 * @param {String} telefono teléfono de la empresa
 * @param {String} contraseña contraseña de la empresa
 */
function createCompany(uid,nombre,nit,razonSocial,secotrEconomico,correo,telefono,contraseña)
{
    db.collection('empresas').doc(uid).set({
        nombreEmpresa:nombre,
        razon:razonSocial,
        sectorEco:secotrEconomico,
        nit: nit,
        correoEmpresa:correo,
        telefonoEmpresa:telefono,
        contraseñaEmpresa:contraseña,
        publications:{},
        request:{},
        recentPublications:{}
    })
}

export default createCompany