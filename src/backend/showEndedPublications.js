function showEndedPublications(uid)
{
    db.collection("publicationEnded").where('empresaUid','==',uid).onSnapshot((snapshot)=>{
        let tempPublis = snapshot.docs.map((doc)=>{
            return {id: doc.id, ...doc.data()}
        }) 
        dispatch(setPublis(tempPublis));
    })
}

export default showEndedPublications