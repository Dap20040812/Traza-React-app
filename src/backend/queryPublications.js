import db from '../firebase'
import { useDispatch } from "react-redux"
import { setPublis} from "../features/publi/publiSlice"

/**
 * 
 * @param {String} dispatch Variable de react que sirve para que se muestren la publicación
 * @param {String} origin Lugar de origen en el cual se quiere filtrar 
 * @param {String} destination Lugar de destino en el  cual se quiere filtrar
 * @param {String} date Fecha de publicación en el cual se quiere filtrar
 * @param {String} type Tipo de producto por el cual se quiere filtrar
 */

function queryPublications(dispatch,origin,destination,date,type)
{
    
    if(origin!=''&&destination!=''&&date!=''&&type!='')
    {
        console.log('Con todo')
        db.collection("publications").where('originPlace','==',origin).where('destinationPlace','==',destination).where('departureDate','==',date).where('products','==',type).onSnapshot((snapshot)=>{
            let tempPublis = snapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
            }) 
            dispatch(setPublis(tempPublis));
        })
    }      
    else if((origin!=''&&destination!=''&&date!='')||(origin!=''&&destination!=''&&type!='')||(origin!=''&&date!=''&&type!='')||(destination!=''&&date!=''&&type!=''))
    {
        console.log('Sin 1')
        if(origin!=''&&destination!=''&&date!='')
        {
            console.log('Sin type')
            db.collection("publications").where('originPlace','==',origin).where('destinationPlace','==',destination).where('departureDate','==',date).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
        }
        if(origin!=''&&destination!=''&&type!='')
        {
            console.log('Sin date')
            db.collection("publications").where('originPlace','==',origin).where('destinationPlace','==',destination).where('products','==',type).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
        }
        if(origin!=''&&date!=''&&type!='')
        {
            console.log('Sin destination')
            db.collection("publications").where('originPlace','==',origin).where('departureDate','==',date).where('products','==',type).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
        }
        if(destination!=''&&date!=''&&type!='')
        {
            console.log('Sin origin')
            db.collection("publications").where('destinationPlace','==',destination).where('departureDate','==',date).where('products','==',type).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
        }
    } 
    else if((origin!=''&&destination!='')||(destination!=''&&date!='')||(date!=''&&type!='')||(origin!=''&&type!='')||(origin!=''&&date!='')||(destination!=''&&type!=''))
    {
        console.log('Sin 2')
       if(origin!=''&&destination!='')
       {
            console.log('Sin date y type')
            db.collection("publications").where('originPlace','==',origin).where('destinationPlace','==',destination).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
       }
       if(destination!=''&&date!='')
       {
           console.log('Sin origin y type')
        db.collection("publications").where('destinationPlace','==',destination).where('departureDate','==',date).onSnapshot((snapshot)=>{
            let tempPublis = snapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
            }) 
            dispatch(setPublis(tempPublis));
        })
       }
       if(date!=''&&type!='')
       {
           console.log('Sin origin y destination')
        db.collection("publications").where('departureDate','==',date).where('products','==',type).onSnapshot((snapshot)=>{
            let tempPublis = snapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
            }) 
            dispatch(setPublis(tempPublis));
        })
       }
       if(origin!=''&&type!='')
       {
           console.log('Sin destination y date')
           db.collection("publications").where('originPlace','==',origin).where('products','==',type).onSnapshot((snapshot)=>{
            let tempPublis = snapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
            }) 
            dispatch(setPublis(tempPublis));
        })
       }
       if(origin!=''&&date!='')
       {
           console.log('Sin destination y type')
            db.collection("publications").where('originPlace','==',origin).where('departureDate','==',date).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
       }
       if(destination!=''&&type!='')
       {
           console.log('Sin origin y date')
           db.collection("publications").where('destinationPlace','==',destination).where('products','==',type).onSnapshot((snapshot)=>{
            let tempPublis = snapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
            }) 
            dispatch(setPublis(tempPublis));
        })
       }
    }
    else if((origin!='')||(destination!='')||(date!='')||(type!=''))
    {
        console.log('Sin 3')
        if(origin!='')
        {
            console.log('Sin destination,date y type')
            db.collection("publications").where('originPlace','==',origin).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
        }
        if(destination!='')
        {
            console.log('Sin origin,date y type')
            db.collection("publications").where('destinationPlace','==',destination).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
        }
        if(date!='')
        {
            console.log('sin origin,destination y type')
            db.collection("publications").where('departureDate','==',date).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
        }
        if(type!='')
        {
            console.log('Sin origin, destination y date')
            db.collection("publications").where('products','==',type).onSnapshot((snapshot)=>{
                let tempPublis = snapshot.docs.map((doc)=>{
                    return {id: doc.id, ...doc.data()}
                }) 
                dispatch(setPublis(tempPublis));
            })
        }
    }
    else
    {
        console.log('Sin 4')
        db.collection("publications").onSnapshot((snapshot)=>{
            let tempPublis = snapshot.docs.map((doc)=>{
                return {id: doc.id, ...doc.data()}
            }) 
            dispatch(setPublis(tempPublis));
        })
    }
    
}

export default queryPublications