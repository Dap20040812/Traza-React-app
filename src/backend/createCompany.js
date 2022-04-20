import db from '../firebase'

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
        request:{}
    })
}

export default createCompany