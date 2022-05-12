import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {selecUserUid, selecUserPhoto} from "../features/user/userSlice"
import {useSelector} from "react-redux"
import db from '../firebase'
import {auth} from "../firebase"
import {storage} from '../firebase'
import { useDispatch } from "react-redux"
import {Spinner} from "reactstrap"
import {setUserLogin} from "../features/user/userSlice"




function Profile() {
    const userUid = useSelector(selecUserUid);
    const photo = useSelector(selecUserPhoto);
    const [company, setCompany] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    useEffect(() =>{
        db.collection("empresas")
        .doc(userUid)
        .get()
        .then((doc) => {
            if(doc.exists){
                setCompany(doc.data());
            }else {
    
            }
        })
      },[])
    

      const archivoMandler = async (e)=>{

        setLoading(true)
        const archivo = e.target.files[0];
        const storageRef = storage.ref();
        const archivoPath = storageRef.child(archivo.name);
        await archivoPath.put(archivo);
        console.log(archivo.name);
        const url =  await archivoPath.getDownloadURL();
        auth.currentUser.updateProfile({
            photoURL: url
        }).then(function(){
            setLoading(false);
            dispatch(setUserLogin({
                name: auth.currentUser.displayName,
                email: auth.currentUser.email,
                uid: auth.currentUser.uid,
                photo: auth.currentUser.photoURL
                
            }))
        },function(error) {
            window.alert("No se puedo cargar la imagen")
         });
        
    }

  return (
    <Container>
        { company && (
           <>
            <Background>
            <img src="https://ibertransit.com/wp-content/uploads/camiones.png" />
            </Background>
            <Data>
                <Title>Perfil Empresa</Title>
                <ImageTitle className='imgage'>
                    <label for="file-input">
                        <img className='img1' src={photo}/>
                        <img className='img2' src='images/ci.jpg'/>
                    </label>
                    <input id="file-input" type="File" accept="image/png, image/jpeg, image/jpg"  onChange={archivoMandler}/>
                    {loading ? <Spinner/> : ""}
                </ImageTitle>
                <Texts>
                    <SubTitle>Nombre : </SubTitle>
                    <Text>{company.nombreEmpresa}</Text>
                </Texts>
                <Texts>
                    <SubTitle>Nit : </SubTitle>
                    <Text>{company.nit}</Text>
                </Texts>
                <Texts>
                    <SubTitle>Email : </SubTitle>
                    <Text>{company.correoEmpresa}</Text>
                </Texts>
            </Data>
           </>
        )} 
    </Container>
  )
}

export default Profile

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    flex-direction: row;
    position:relative;
    justify-content: center;

`
const ImageTitle = styled.div`
    max-height: 35vh;
    max-width: 35vh;
    position: relative;
    >input{
        display: none;
    }   
    .img1{ 
        width: 30vh;
        height: 30vh;
        border-radius: 50%;
    }
    .img2 {
        position: absolute;  
        top: 0;  
        left: 0;
        opacity: 0;
        transition: .5s;
        width: 30vh;
        height: 30vh;
        border-radius: 50%;
    }
    .Spinner{
        position: absolute;  
        top: 0;  
        left: 0;
        opacity: 0;
    }

    &:hover .img2{
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: rgba(249, 249, 249 , 0.8);
        color: white;
        opacity: 0.9;
    }




`
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.8;

    img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
`
const Title = styled.div`
    color: rgb(249, 249, 249);
    font-size: 6vh;
    min-height: 3vh;
    margin: 3vh;
` 
const Data = styled.div`
    border-radius: 1vh;
    background-color: #929294BA;
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2vh;
    max-height: 200vh;
    max-width: 100vh;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`
const Texts = styled.div`

    display: flex;
    flex-direction: row;

`
const SubTitle = styled.div`
    color: white;
    font-weight: bold;
    font-size: 4vh;
    padding:2vh;
`
const Text = styled.div`
    color: white;
    font-size: 4vh;
    padding:2vh;    
`  
