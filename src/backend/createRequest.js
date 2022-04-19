import db from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app'; 



function createRequest(uid,idr,requestDate,embalajeRequest,descriptionRequest,packageHeight,packageWidth,packageLength,packageUnidades,products,prodDescription){
    let uuidr = uuidv4();
    db.collection('request').doc(uuidr).set({

        publication:idr,
        requestDate:requestDate,
        embalaje:embalajeRequest,
        description:descriptionRequest,
        packageDimensions:{
            packagHeight:packageHeight,
            packageWidth:packageWidth,
            packageLength:packageLength,
            packageUnidades:packageUnidades
        },
        products:products,
        prodDescription: prodDescription
    })

    db.collection('empresas').doc(uid).update( {
        request:firebase.firestore.FieldValue.arrayUnion(uuidr)       
     });
}

export default createRequest