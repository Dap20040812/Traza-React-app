import db from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app'; 

function createRandomPublication()
{
    
    let uuidP = uuidv4() 

    db.collection("publications").doc(uuidP).set({
        id: uuidP,
        empresaName: 'DapTech',
        empresaPhoto: 'https://firebasestorage.googleapis.com/v0/b/prueba-traza.appspot.com/o/portada-alpina-imagenes-brandemia-blog_0.jpg?alt=media&token=ce548318-da2e-4336-a077-239e5bb5b988',
        empresaUid:'nmWTt5OChHRGbjIZNgQw4aNaksC3',
        originPlace: 'Barranquilla',
        originAddress: 'Barbados',
        destinationPlace: 'Honduras',
        destinationAddress: 'Personas',
        departureDate: 'Departure',
        price: 'Precio',
        serviceDescription: 'Descripción',
        products: 'Productos',
        productsDescription: 'Prod Description',
        embalaje: 'Embalaje',
        truckDimensions: {
    
            truckHeight: '2',
            truckWidth: '3',
            truckLength: '4',
            truckUnidades:'5'
        },
        truckFreeSpace: {
            
            freeSpaceHeight: '3',
            freeSpaceWidth: '5',
            freeSpaceLength: '4',
            freeSpaceUnidades: '5'
        },
        restrictions: 'Sin restricciones',
        publiImg: 'https://firebasestorage.googleapis.com/v0/b/prueba-traza.appspot.com/o/3884935.png?alt=media&token=167063e0-bea0-47a2-8ffd-b679f4e22170',
        state: "active",
        fechaDeCreacion:firebase.firestore.Timestamp.fromDate(new Date())
    })
}

export default createRandomPublication