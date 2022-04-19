import db from '../firebase'

function queryMyPublications(nit)
{
    
    db.collection('publications').where('empresaNit','==',nit).get().then((snapshot)=>{snapshot.docs.forEach(doc =>{
        console.log(doc.originAddres)
    })})
    
}

export default queryMyPublications