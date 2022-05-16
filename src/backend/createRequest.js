import db from '../firebase'
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/compat/app'; 

/**
 * Esta función sirve para crear una solicitud
 * @param {String} uid uid de la empresa relacionada con la petición correspondiente
 * @param {String} idr iid de la peteición
 * @param {String} requestDate Fecha de la petición
 * @param {String} embalajeRequest Embalaje de la petición 
 * @param {String} descriptionRequest Descripción de la petición
 * @param {String} packageHeight Altura del paquete de la petición
 * @param {String} packageWidth Anchura del paquete de la petición
 * @param {String} packageLength Longitud del paquete de la petición
 * @param {String} packageUnidades Unidades de las dimensiones del paquete de la petición
 * @param {String} products Productos de la petición
 * @param {String} prodDescription Descripción de los productos
 */

function createRequest(name,uid,idr,requestDate,embalajeRequest,descriptionRequest,packageHeight,packageWidth,packageLength,packageUnidades,products,prodDescription){
    let uuidr = uuidv4();
    db.collection('request').doc(uuidr).set({

        NombreEmpresa: name,
        EmpresaUid:uid,
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
        prodDescription: prodDescription,
        state:'Unaccepted',
        id:uuidr,
        comentarios:"",
        finalPrice:"",
        motivosr:""
        
    })


    db.collection('request').where('id','==',uuidr).get().then(snapshot=>{
        snapshot.forEach(doc=>{
            db.collection('empresas').doc(uid).collection('myRequests').doc(uuidr).set(doc.data())
        })
    })
}

export default createRequest