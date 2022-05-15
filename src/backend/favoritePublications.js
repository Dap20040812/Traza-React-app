import db from '../firebase'
import { setPublis } from '../features/publi/publiSlice'
import { ExtensionTwoTone } from '@material-ui/icons'
/**
 * Esta función sirve para añadir una publicación como favorita
 * @param {String} idEmpresa ID de la empresa a la cual se quiere agragar la publicación como favorita
 * @param {String} idPublication Id de la publicación a la cual se quiere agregar como favorita
 */
function addFavoritePublication(idEmpresa,idPublication)
{
    db.collection('publications').where('id','==',idPublication).get().then((snapshot)=>{
        snapshot.forEach((doc) =>{
            db.collection('empresas').doc(idEmpresa).collection('favoritePublications').doc(idPublication).set(doc.data())
        })
    })

}
/**
 * Esta función sirve para mostrar las publicaciones favoritas de una empresa
 * @param {String} idEmpresa ID de la empresa a la cual se quieren visualizar las publicaciones favoritas
 * @param {String} dispatch Variable de react
 */
function showFavoritePublication(idEmpresa,dispatch)
{
    db.collection("empresas").doc(idEmpresa).collection('favoritePublications').limit(4).where('state','==','active').onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setPublis(tempPublis));
    })
}
/**
 * Esta funcion sirve para eliminar de favoritos a alguna publicacion de una empresa
 * @param {String} idEmpresa ID de la empresa a la cual qse quiere elminiar de favoritos una publicacion
 * @param {String} idp ID de la publicacion de la cual se quire eliminar de favoritos
 */
function deleteFavoritePulication(idEmpresa,idp)
{
    db.collection('empresas').doc(idEmpresa).collection('favoritePublications').doc(idp).delete();
}
<<<<<<< HEAD

function searchFavoritePublication(idEmpresa,idp)
{   
    var exists=false;
=======
let exists = false;
async function searchFavoritePublication(idEmpresa,idp)
{
    function setExists(a)
    {
        exists = a
    }
>>>>>>> 4abdb52e85c725d4556ad8dd6ad82a8d6f95d625

    db.collection('empresas').doc(idEmpresa).collection('favoritePublications').doc(idp).get().then(doc =>{

        if (doc.exists)
        {
<<<<<<< HEAD
            exists=true;
            console.log(exists)
        }else{
            exists=false;
            console.log(exists)
        }
    })
    return exists;
=======
            setExists(true)
        }
        else
        {
            setExists(false)
        }
    })
    return exists
>>>>>>> 4abdb52e85c725d4556ad8dd6ad82a8d6f95d625
}

export {addFavoritePublication,showFavoritePublication,deleteFavoritePulication,searchFavoritePublication}
