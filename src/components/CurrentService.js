import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import {selecUserUid} from "../features/user/userSlice"
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"

function CurrentService() {

    const {id} = useParams();
    const [orderInProgress, setOrderInProgress] = useState()
    const userUid = useSelector(selecUserUid);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const[changeStatus1, setChangeStatus1] = useState(false);
    const[changeStatus2, setChangeStatus2] = useState(false);
    const[changeStatus3, setChangeStatus3] = useState(false);
    const[changeStatus4, setChangeStatus4] = useState(false);

    useEffect(() =>{
        db.collection("orderInProgress")
        .doc(id)
        .get()
        .then((doc) => {
            if(doc.exists){
                setOrderInProgress(doc.data());
            }else {
    
            }
        })
      },[])

    const handleClick1 = (e) => {
        setChangeStatus1(false);
        setChecked1(!checked1);
        setChecked2(false)
        setChecked3(false)
        setChecked4(false)
        return true
    }

    const handleClick2 = (e) => {
        setChecked2(!checked2)
        setChangeStatus2(false);
    }

    const handleClick3 = (e) => {
        setChecked3(!checked3)
        setChangeStatus3(false);
    }

    const handleClick4 = (e) => {
        setChecked4(!checked4)
        setChangeStatus4(false);
    }

    const getContent = (props) => {
        if(orderInProgress.userId !== userUid) {
            return(
                <Wrap>
                    <TimelineItem>
                        <CheckDiv>
                            <Alert show={changeStatus1}>
                                <h4>¿Desea cambiar el estado del servicio?</h4>
                                <ButtonContent1>
                                    <Button1 onClick={handleClick1}>Continuar</Button1>
                                    <Button2 onClick={()=> setChangeStatus1(false)}>Cancelar</Button2>
                                </ButtonContent1>
                            </Alert>
                            {checked1 === false ? <CheckIcon src='/images/check.png' ></CheckIcon> : <CheckIcon1 src='/images/check.png' ></CheckIcon1>}
                             <p>El camión ha salido de la dirección de origen.</p>
                        </CheckDiv>
                        <Input show={checked1 === false} onClick={()=> setChangeStatus1(!changeStatus1)} type='submit' value='REALIZADO' ></Input>
                    </TimelineItem>
                    <TimelineItem>
                    <CheckDiv>
                            <Alert show={changeStatus2}>
                                <h4>¿Desea cambiar el estado del servicio?</h4>
                                <ButtonContent1>
                                    <Button1 onClick={handleClick2}>Continuar</Button1>
                                    <Button2 onClick={()=> setChangeStatus2(false)}>Cancelar</Button2>
                                </ButtonContent1>
                            </Alert>
                        {checked2 === false ? <CheckIcon src='/images/check.png' ></CheckIcon> : <CheckIcon1 src='/images/check.png' ></CheckIcon1>}
                            <p>El camión va en camino a la dirección de destino.</p>
                        </CheckDiv>
                        <Input show={checked1 === true && checked2 === false} onClick={()=> setChangeStatus2(!changeStatus2)} type='submit' value='REALIZADO' ></Input>
                    </TimelineItem>
                    <TimelineItem>
                    <CheckDiv>
                            <Alert show={changeStatus3}>
                                <h4>¿Desea cambiar el estado del servicio?</h4>
                                <ButtonContent1>
                                    <Button1 onClick={handleClick3}>Continuar</Button1>
                                    <Button2 onClick={()=> setChangeStatus3(false)}>Cancelar</Button2>
                                </ButtonContent1>
                            </Alert>
                            {checked3 === false ? <CheckIcon src='/images/check.png' ></CheckIcon> : <CheckIcon1 src='/images/check.png' ></CheckIcon1>}

                            <p>El camión ha llegado a la dirección de destino</p>
                        </CheckDiv>
                        <Input show={checked2 === true && checked3 === false} onClick={()=> setChangeStatus3(!changeStatus3)} type='submit' value='REALIZADO' ></Input>
                    </TimelineItem>
                    <TimelineItem>
                    <CheckDiv>
                            <Alert show={changeStatus4}>
                                <h4>¿Desea cambiar el estado del servicio?</h4>
                                <ButtonContent1>
                                    <Button1 onClick={handleClick4}>Continuar</Button1>
                                    <Button2 onClick={()=> setChangeStatus4(false)}>Cancelar</Button2>
                                </ButtonContent1>
                            </Alert>
                        {checked4 === false ? <CheckIcon src='/images/check.png' ></CheckIcon> : <CheckIcon1 src='/images/check.png' ></CheckIcon1>}

                            <p>El servicio ha sido entregado y finalizado</p>
                        </CheckDiv>
                        <Input show={checked3 === true && checked4 === false} onClick={()=> setChangeStatus4(!changeStatus4)} type='submit' value='REALIZADO' ></Input>
                    </TimelineItem>
                </Wrap>
            )
        }
        else {
            return (
                <Wrap>
                <TimelineItem>
                    <CheckDiv>
                    {checked1 === false ? <CheckIcon src='/images/check.png' ></CheckIcon> : <CheckIcon1 src='/images/check.png' ></CheckIcon1>}
                        <p>El camión ha salido de la dirección de origen.</p>
                    </CheckDiv>
                </TimelineItem>
                <TimelineItem>
                <CheckDiv>
                    {checked2 === false ? <CheckIcon src='/images/check.png' ></CheckIcon> : <CheckIcon1 src='/images/check.png' ></CheckIcon1>}
                        <p>El camión va en camino a la dirección de destino.</p>
                    </CheckDiv>
                </TimelineItem>
                <TimelineItem>
                <CheckDiv>
                    {checked3 === false ? <CheckIcon src='/images/check.png' ></CheckIcon> : <CheckIcon1 src='/images/check.png' ></CheckIcon1>}
                        <p>El camión ha llegado a la dirección de destino</p>
                    </CheckDiv>
                </TimelineItem>
                <TimelineItem>
                <CheckDiv>
                    {checked4 === false ? <CheckIcon src='/images/check.png' ></CheckIcon> : <CheckIcon1 src='/images/check.png' ></CheckIcon1>}
                        <p>El servicio ha sido entregado y finalizado.</p>
                    </CheckDiv>
                </TimelineItem>
            </Wrap>
            )
        }
    }

  return (
    <Container>
        
        { orderInProgress && (
            <>
        <Background>
        </Background>
        <Data>
            <LeftData>
                <DataTitle>Estado Actual del Servicio</DataTitle>
                <TimelineContainer>
                    {getContent()}
                </TimelineContainer>
            </LeftData>
            <RightData>
                 <h3>{orderInProgress.origin} - {orderInProgress.destination}</h3>
                <p>{orderInProgress.date}</p>
                <Price>
                    {orderInProgress.precioFinal}
                </Price>
                <StyledLink to={`/chat`}><Button1>Chat</Button1></StyledLink>
            </RightData>
        </Data>
        </>
        )}
    </Container>
  )
}

export default CurrentService

const Container = styled.div `
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    flex-direction: column;
    position:relative;
    justify-content: center;
`
const StyledLink = styled(Link)`
text-decoration: none;
color: white;

&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
`
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: url("/images/home-background.png") center center /cover 
    no-repeat fixed;
    content: "";
    position: absolute;

    img{
        width: 100%;
        height: 100%;
        object-fit:cover;
        filter: brightness(50%);
    }
`

const Data = styled.div`
    display: flex;
    flex-direction: row;
    position:relative;
    justify-content: center;
`

const RightData = styled.div`
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
    color: white;
    font-weight: 500;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`

const LeftData = styled.div`
    border-radius: 1vh;
    background-color: #929294BA;
    margin-top: 5vh;
    width: 130vh;
    margin-right: 4vh;
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

const TimelineContainer = styled.div `
    margin-right: 30px;
`

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    position:relative;
    justify-content: center;
    margin: 30px 15px;
`

const TimelineItem = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #5C5C5CB1;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    padding: 10px 5px;
    border-radius: 5px;
    margin-top: 8px;
    margin-bottom: 8px;
`

const CheckIcon = styled.img `
    width: 5%;
    filter: grayscale(100%);
`

const CheckIcon1 = styled.img `
    width: 5%;
    filter: grayscale(0%);
`

const Input = styled.input `
   border: 1px solid #f9f9f9;
   padding: 8px 16px;
   margin: 1vw 1vh;
   border-radius: 4px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   background-color: #2A3EABED;
   cursor: pointer;
   transform: ${props => props.show ===false ? 'translatex(200%)': 'translatey(0%)'};
   &:hover {
       background-color: #22B14CED;
       color: #000;
       border-color: transparent;
   }
`

const CheckDiv = styled.div `
    display: flex;
    align-items: center;
`

const DataTitle = styled.div `
    color: white;
    font-size: 38px;
    font-weight: 400;
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