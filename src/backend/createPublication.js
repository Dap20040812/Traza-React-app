import db from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app'; 

/**
 * Esta función dirve para crear una publicación
 * @param {String} uid El uid de la empresa asignada a esta publicaión
 * @param {String} name Nombre de la empresa
 * @param {String} photo Foto de la empresa
 * @param {String} origin Lugar de origen de la publicación
 * @param {String} oriAddress Dirección de origen de la publicación
 * @param {String} destination Lugar de destino de la publicación
 * @param {String} destAddress Dirección del destino de la publicaicón
 * @param {String} date Fecha de la publicación
 * @param {String} price Preción de la publicación
 * @param {String} description Descripción de la publicación
 * @param {String} products Productos de la publicación
 * @param {String} prodDescription Descripción de los productos
 * @param {String} embalaje Tipo de embalaje de la publicación
 * @param {String} truckHeight Altura del camión pretado para la publicación
 * @param {String} truckWidth Anchura del camión prestado para la publicación
 * @param {String} truckLength Longitud del camión prestado para la publicación
 * @param {String} truckUnidades Unidades de las dimensiones del camión prestado para la publicación
 * @param {String} freeSpaceHeight Altura del espacio libre del camión prestado para la publicación
 * @param {String} freeSpaceWidth Anchura del espacio libre del camión prestado para la publicación
 * @param {String} freeSpaceLength Longitud del espacio libre del camión prestado para la publicación
 * @param {String} freeSpaceUnidades Uniddades de las dimensiones del espacio libre del camión prestado para la publicación
 * @param {String} restrictions Restricciones de los productos que no pueden ir en el camión
 * @param {String} publiImgs Link de portada de la publicación
 */

function createPublication(uid,name,photo,origin,oriAddress,destination,destAddress,date,price,description,products,prodDescription,embalaje,truckHeight,truckWidth,truckLength,truckUnidades, freeSpaceHeight,freeSpaceWidth,freeSpaceLength,freeSpaceUnidades,restrictions,publiImgs){

    let uuidP = uuidv4() 

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear()+"-"+(month)+"-"+(day);

    var present = now.getHours().toString()

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
        state: "active",
        fechaDeCreacion:firebase.firestore.Timestamp.fromDate(new Date())
    })
    
    db.collection('empresas').doc(uid).update( {
        publications:firebase.firestore.FieldValue.arrayUnion(uuidP)

     });
}

export default createPublication