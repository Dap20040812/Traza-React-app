import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Info from './Info'
import RequestForm from './RequestForm';
import db from '../firebase'
import { useParams } from 'react-router-dom'
import {showRecentPublication} from '../backend/recentPublications'
import {selecUserUid} from "../features/user/userSlice"
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import Publi from './Publi';
import recommendedPublications from '../backend/recommendedPublication';
import Request from './Request';
import showRequest from '../backend/showRequest';
import showMyRequest from '../backend/showMyRequest';
import deletePublication from '../backend/deletePublication';


function MyDetail() {

    const {id} = useParams();
    const [publi, setPubli] = useState()
    const userUid = useSelector(selecUserUid);
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() =>{
        db.collection("publications")
        .doc(id)
        .get()  
        .then((doc) => {
            if(doc.exists){
                setPubli(doc.data());
            }else {
    
            }
        })
        showMyRequest(id,dispatch)
      },[])
      console.log(id)
      
   
  const [page, setPage] = useState('Info')
  const[cancelStatus, setCancelStatus] = useState(false);
  

  const cancel = () => {
     setCancelStatus(true); 
  }
  const deletepubli =() => {
<<<<<<< HEAD
    deletePublication(id,'nmWTt5OChHRGbjIZNgQw4aNaksC3');
=======
    deletePublication(id,publi.empresaUid);
>>>>>>> 9b5113fabc48d576f7cfb5affd9f18f313b8e6ab
    setCancelStatus(false);
    window.alert("Publicación Elmiminada con Exito")
    history.push("/publimy")
  }
  /**
   * Llama a otros componentes
   * @returns Información de la publicación o el formulario de solicitud
   */
  const getContent = () => {
    
    if(page === 'Info'){
       return(
            <Info origin={publi.originPlace} oriAddress={publi.originAddress} destination={publi.destinationPlace} destAddress={publi.destinationAddress} date={publi.departureDate} products={publi.products} proDescription={publi.productsDescription} embalaje={publi.embalaje} truckDimensions1={publi.truckDimensions.truckHeight} truckDimensions2={publi.truckDimensions.truckWidth} truckDimensions3={publi.truckDimensions.truckLength} truckDimensions4={publi.truckDimensions.truckUnidades} freeSpaces1={publi.truckFreeSpace.freeSpaceHeight} freeSpaces2={publi.truckFreeSpace.freeSpaceWidth} freeSpaces3={publi.truckFreeSpace.freeSpaceLength} freeSpaces4={publi.truckFreeSpace.freeSpaceUnidades} restrictions={publi.restrictions} uid={publi.empresaUid} name={publi.empresaName}/> 
            
        )
    }
    else if (page === 'Request'){
        return(
            <Request myrequest={false}/>
          ) 
    }
  }
  const toPage = page => event =>{
    event.preventDefault()
    setPage(page) 
  }
  
  return (
    <Container>
        { publi && (
           <>
                <Background>
                    <img src="https://gates.scene7.com/is/image/gates/truck-and-bus?$Image_Responsive_Preset$&scl=1"/>
                </Background>
                <Alert show={cancelStatus}>
                    <h2>Advertencia!!!!!!</h2>
                    <h4>La publicación se eliminara permanentemente</h4>
                    <p>¿Desear continuar?</p>
                    <ButtonContent>
                        <Button1 onClick={deletepubli}>Continuar</Button1>
                        <Button2 onClick={()=> setCancelStatus(false)}>Cancelar</Button2>
                    </ButtonContent>

                </Alert>
                <Data>
                <LeftData>
                    <ImageTitle>
                        <img src={publi.empresaPhoto}/>
                    </ImageTitle>
                    <Price>
                        $ {publi.price}
                    </Price>
                        <Controls>
                            <PlayButton  onClick={toPage('Request')}>
                                <span>Ver solicitudes</span>
                            </PlayButton>
                            <TrailerButton  onClick={toPage('Info')}>
                                <span>+ INFO</span>
                            </TrailerButton>
                            <CancelButton onClick={cancel}>
                                <span>Eliminar</span>
                            </CancelButton>
                        </Controls>
                        <SubTitle>{publi.empresaName}</SubTitle>
                        <Description>
                            {publi.serviceDescription}
                        </Description>

                </LeftData> 
                <RigthData>
                    {getContent()}
                </RigthData> 
                </Data>
           </> 
        )

        }         
    </Container>
  )
}

export default MyDetail

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    flex-direction: column;
    position:relative;
    justify-content: center;
`
const Title = styled.div`
    color: rgb(249, 249, 249);
    font-size: 8vh;
    min-height: 3vh;
    margin: 3vh;
` 
const Data = styled.div`
    display: flex;
    flex-direction: row;
    position:relative;
    justify-content: center;
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
const ImageTitle = styled.div`
    max-height: 35vh;
    max-width: 35vh;

    img{ 
        max-width: 35vh;
        max-height: 35vh;
    }

`
const Controls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
`

const PlayButton = styled.button`
    border-radius: 1vh;
    font-size: 2vh;
    margin-top: 2vh;
    text-align:center;
    padding: 0 3vh;
    margin-right: 3vh;
    display: flex;
    align-items: center;
    width: 100%;
    height: 6vh;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 0.15vh;
    cursor: pointer;
    text-align: center; 
    

    &:hover {
        background: rgb(198, 198, 198);
    }
`
const CancelButton = styled.button`
border-radius: 1vh;
    font-size: 2vh;
    margin-top: 2vh;
    text-align:center;
    padding: 0 3vh;
    margin-right: 3vh;
    display: flex;
    align-items: center;
    width: 100%;
    height: 6vh;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 0.15vh;
    cursor: pointer;
    text-align: center; 
    

    &:hover {
        background: #E80D0DED;
    }
`

const TrailerButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249,249);
  
`
const Alert = styled.div`
  position: fixed;
  top: 0;
  right: 30vw;
  background: white;
  border: 3px solid rgba(136, 148, 122, 0.7); 
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  max-width: 100vh;
  z-index: 16;
  list-style: none;
  padding: 2vw 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: ${props => props.show ===false ? 'translatey(-200%)': 'translatey(0%)'};
  transition: transform 0.2s;
  li{
    padding: 15px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);

    a{
      font-weight: 600; 
    }
    &:hover {
        border-radius: 0.6vh;
        border-color: rgba(249, 249, 249 , 0.8);
        color: white;
        background-color: #0000003D;
        opacity: 0.9;
    }
  }
`
const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 2vh;
    min-height: 3vh;
    margin-top: 3vh;
`

const Description = styled.div`
    line-height: 3vh;
    font-size: 2.5vh;
    margin-top: 1.5vh;
    color: rgb(249, 249, 249);
    max-width: 50vh;
`

const LeftData = styled.div`
    border-radius: 1vh;
    background-color: #929294BA;
    display: flex;
    flex-direction: column;
    margin-top: 5vh;
    padding: 2vh;
    opacity: 0.9;
    max-height: 100vh;
    max-width: 40vh;
    overflow: hidden;
    color: black;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`
const RigthData = styled.div`
    border-radius: 1vh;
    background-color: #929294BA;
    margin-top: 5vh;
    width: 130vh;
    margin-left: 8vh;
    max-height: max-content;
    overflow: hidden;
    color: black;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`
const Price = styled.div`
    margin-top: 3vh;
    margin-bottom: 3vh;
    font-size: 4vh;
`
const Button1 = styled.button`
   border: 1px solid #f9f9f9;
   padding: 8px 16px;
   margin: 1vw 1vh;
   border-radius: 4px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   background-color: #A8A8A8;
   transition: all 0.2s ease 0s;
   cursor: pointer;

   &:hover {
       background-color: #22B14CED;
       color: #000;
       border-color: transparent;
   }

`
const Button2 = styled.button`
   border: 1px solid #f9f9f9;
   padding: 8px 16px;
   border-radius: 4px;
   margin: 1vw 1vh;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   background-color: #A8A8A8;
   transition: all 0.2s ease 0s;
   cursor: pointer;

   &:hover {
       background-color: #E80D0DED;
       color: #000;
       border-color: transparent;
   }

`
const ButtonContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

