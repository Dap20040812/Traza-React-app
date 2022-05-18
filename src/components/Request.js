import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {selectRequests} from '../features/request/requestSlice'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import deleteRequest from '../backend/deleteRequest'
import { finalRejection } from '../backend/statusRequest'

function Request(props) {
    const requests = useSelector(selectRequests);  
    const[cancelStatus, setCancelStatus] = useState(false);
    const[fCancelStatus, setFCancelStatus] = useState(false);
    const[detailStatus, setDetailStatus] = useState(false);
    const[idRe, setidRe] = useState();
    

    const cancel = () =>  {
        setCancelStatus(true); 
    }


    const deleteRe =() => {
        console.log(idRe);
        deleteRequest(idRe);
        setCancelStatus(false);
        window.alert("Solicitud Elmiminada con Exito")
      }
      const fdeleteRe =() => {
        finalRejection(idRe)
        console.log(idRe)
        setDetailStatus(false);
        window.alert("Solicitud Rechazada con Exito")
      }    
      const ffDeleteRe =() => {
        deleteRequest(idRe)
        setFCancelStatus(false);
        window.alert("Solicitud Elmiminada con Exito")
      }   
      const re =(idr) => {
        setidRe(idr)
        setDetailStatus(true)
      } 
      const ro =(idr) => {
        setidRe(idr)
        setFCancelStatus(true)
      }

  return (
    <Container> 
        <Alert show={cancelStatus}>
            <h2>¡Advertencia!</h2>
            <h4>La solicitud se eliminará permanentemente.</h4>
            <p>¿Desea continuar?</p>
            <ButtonContent1>
                <Button1 onClick={deleteRe}>Continuar</Button1>
                <Button2 onClick={()=> setCancelStatus(false)}>Cancelar</Button2>
            </ButtonContent1>
        </Alert>
        <Alert show={detailStatus}>
            <p>¿Estas seguro que deseas rechazar la solicitud?</p>
            <ButtonContent1>
                <Button1 onClick={fdeleteRe}>Continuar</Button1>
                <Button2 onClick={()=> setDetailStatus(false)}>Cancelar</Button2>
            </ButtonContent1>
        </Alert>
        <Alert show={fCancelStatus}>
            <p>La empresa rechazó tu solicitud</p>
            <ButtonContent1>
                <Button1 onClick={ffDeleteRe}>Aceptar</Button1>
            </ButtonContent1>
        </Alert>
        <Content>
             { requests && 
                requests.map((request) => (
                    <>
                    <Wrap key={request.id}>
                        
                        <h3>Id: {request.id}</h3>
                        <Data>
                            <PubliContent>
                                <p>Empresa que realiza la solicitud : {request.NombreEmpresa}</p>
                                <p>Descripción : {request.description}</p>
                                <p>Producto : {request.products}</p>
                                <p>Descripción del Producto : {request.prodDescription}</p>
                                <p>Dimensiones : {request.packageDimensions.packagHeight} x {request.packageDimensions.packageWidth} x {request.packageDimensions.packageLength} {request.packageDimensions.packageUnidades}</p>
                                <p>Fecha de creación de la solicitud: {request.requestDate}</p>
                                <p>{request.finalAcceptance}</p>
                                {request.accepted === false ?
                                    <p style={{color: "red"}}>Motivos de rechazo : {request.motivosR}</p>
                                    : <></>
                                }
                                {request.accepted ? 
                                 <>
                                   <p style={{color: "green"}}>Comentarios : {request.comentarios}</p>
                                   <p style={{color: "green"}}>Precio Final : {request.finalPrice}</p> 
                                 </>
                                 : <></>
                                }
                            </PubliContent>
                            <ButtonContent>
                                {props.myrequest === true ? 
                                 <>
                                 {request.accepted ? 
                                 <>
                                    {request.finalacceptance === false?
                                      <>
                                        <Button>Rechazada</Button>
                                      </>
                                      :
                                      <>
                                            <StyledLink to={`/pay/${request.id}/${request.publication}`}><Button1>Aceptar</Button1></StyledLink>
                                            <Button2 onClick={() => re(request.id)}>Rechazar</Button2>
                                      </>
                                      }  

                                    
                                 </>
                                 : 
                                 <>
                                    {request.accepted === false ? 
                                    <>
                                       <Button2 onClick={() => ro(request.id)}>Solicitud Rechazada</Button2>
                                    </>
                                    :
                                    <>
                                        <Button2 onClick={cancel} onClickCapture={() => setidRe(request.id)}>Cancelar</Button2>
                                    </>
                                    }

                                 </>
                                }    
                                 </>
                                 :
                                <>
                                 {request.accepted ? 
                                    <>
                                      {request.finalacceptance === false?
                                      <>
                                        <Button2 onClick={() => ro(request.id)}>Solicitud Rechazada</Button2>
                                      </>
                                      :
                                      <>
                                      </>
                                      }  
                                    </>
                                    :
                                    <>
                                        {request.accepted === false? 
                                        <>
                                        </>
                                        :
                                        <>
                                            <StyledLink to={`/accept/${request.id}`}><Button1>Aceptar</Button1></StyledLink>
                                            <StyledLink to={`/reject/${request.id}`}><Button2>Rechazar</Button2></StyledLink>
                                        </>
                                        }
                                    </>
                                    }
                                    
                                </>    
                                }
                                

                            </ButtonContent>
                        </Data>
                        
                    </Wrap>
                    </>
                    ))
                }
        </Content>
    </Container>
  )
}

export default Request

const Container = styled.div`
    h4{
        color: #ff7300;
        font-size: 5vh;
    }
    padding: 2vw 2vh;
`
const Content = styled.div`
    width: 100%;
    display: grid;
    grid-gap: 8vh; 
`
const Wrap = styled.div`
    padding: 2vw 2vh;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    width: 100%;
    color: black;
    max-height: calc(100vw - 25vh);
    width: 100%;
    border: 3px solid rgba(249, 249, 249, 0.1); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    background-color: #FFFFFFBA;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img{
        height: 45vh;
        width: 20vw;
        object-fit: cover;
    }

    &:hover {
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: rgba(249, 249, 249 , 0.8);
        color: white;
        background-color: #4A4A4AED;
        opacity: 0.9;
    }
`
const PubliContent = styled.div`
    padding: calc(0.5vw + 0.5vh);
    text-decoration: none;
    font-size: calc(0.8vh + 0.8vw);
    h2{
        font-size: calc(2vw3vh);
    }
    
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        
    }
    &:hover{
        color: white;
    }
`;
const Title = styled.div`
    color: rgb(249, 249, 249);
    font-size: 5vh;
    min-height: 3vh;
    margin: 3vh;
    font-weight: bold;
` 
const Data = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
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

const Detail = styled.div`
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
    flex-direction: column;
    justify-content: center;
`
const ButtonContent1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`