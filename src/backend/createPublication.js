import db from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app'; 

function createPublication(uid,name,photo,origin,oriAddress,destination,destAddress,date,price,description,products,prodDescription,embalaje,truckHeight,truckWidth,truckLength,truckUnidades, freeSpaceHeight,freeSpaceWidth,freeSpaceLength,freeSpaceUnidades,restrictions,publiImgs){

    let uuidP = uuidv4() 

    db.collection("publications").doc(uuidP).set({
        id: uuidP,
        empresaName: name,
        empresaPhoto: photo,
        empresaUid:uid,
        originPlace: origin,
        originAddress: oriAddress,
        destinationPlace: destination,
        destinationAddress: destAddress,
        departureDate: date,
        price: price,
        serviceDescription: description,
        products: products,
        productsDescription: prodDescription,
        embalaje: embalaje,
        truckDimensions: {
    
            truckHeight: truckHeight,
            truckWidth: truckWidth,
            truckLength: truckLength,
            truckUnidades: truckUnidades
        },
        truckFreeSpace: {
            
            freeSpaceHeight: freeSpaceHeight,
            freeSpaceWidth: freeSpaceWidth,
            freeSpaceLength: freeSpaceLength,
            freeSpaceUnidades: freeSpaceUnidades
        },
        restrictions: restrictions,
        publiImg: publiImgs,
        state: "active"
    })
    
    db.collection('empresas').doc(uid).update( {
        publications:firebase.firestore.FieldValue.arrayUnion(uuidP)

     });
}

export default createPublication