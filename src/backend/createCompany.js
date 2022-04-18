import db from '../firebase'

function createCompany(nombre,nit,razonSocial,secotrEconomico,correo,telefono,contraseña)
{
    db.collection('empresas').doc(nit).set({
        nombreEmpresa:nombre,
        razon:razonSocial,
        sectorEco:secotrEconomico,
        correoEmpresa:correo,
        telefonoEmpresa:telefono,
        contraseñaEmpresa:contraseña,
        publications:{},
        request:{}
    })
}

export default createCompany