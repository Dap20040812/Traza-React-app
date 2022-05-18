import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import { finalAcceptance } from '../backend/statusRequest'
import {useSelector} from "react-redux"
import { useParams } from 'react-router-dom';
import createOrderInProgress from '../backend/createOrderInProgress';
import { useHistory } from 'react-router-dom'
import db from '../firebase'

function Pay() {

    const [publi, setPubli] = useState()
    const [request, setRequest] = useState()
    const {id} = useParams();
    const {id1} = useParams();
    const history = useHistory()



    useEffect(() =>{
        db.collection("request")
        .doc(id)
        .get()  
        .then((doc1) => {
            if(doc1.exists){
                setRequest(doc1.data());
            }else {
    
            }
        })
        db.collection("publications")
        .doc(id1)
        .get()  
        .then((doc) => {
            if(doc.exists){
                setPubli(doc.data());
            }else {
    
            }
        })
      },[])

  const starts = () => {
      createOrderInProgress(publi.empresaUid,request.EmpresaUid,publi.originPlace,publi.destinationPlace,publi.departureDate,request.finalPrice)
      finalAcceptance(id,id1)
      history.push("/inprogress")

  }  
  return (  
    <Container>
        <Background/>
        <Data>
            <Title>Método de pago</Title>
            <Payments>
                <Payment><div style={{margin: "2vh"}}>PSE</div><img width={'20%'} src='https://eca.edu.co/wp-content/uploads/2020/04/logo-pse-300x300.png'/></Payment>
                <Payment><div style={{margin: "2vh"}}>Tarjeta</div><img width={'20%'} src='https://cdn-icons-png.flaticon.com/512/82/82219.png'/></Payment>
                <Payment><div style={{margin: "2vh"}}>PayPal</div><img width={'30%'} src='https://www.actualidadecommerce.com/wp-content/uploads/2020/10/paypal.png'/></Payment>
                <Payment><div style={{margin: "2vh"}}>Nequi</div><img width={'20%'} src='https://artesla.com.co/wp-content/uploads/2021/01/nequi-logo.png'/></Payment>
            </Payments>
            <Button1 onClick={starts}>PAGAR</Button1>
        </Data>
    </Container>
  )
}

export default Pay

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
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
    border-radius: 1vh;
    background-color: #929294BA;
    margin-top: 5vh;
    padding: 2vh;
    opacity: 0.9;
    height: 80vh;
    width: 100vh;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Title = styled.div`
    color: rgb(249, 249, 249);
    font-size: 8vh;
    min-height: 3vh;
    margin: 3vh;
    text-align: center;
`  
const Payments = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Payment = styled.div`
    border: Solid black;
    width: 20vw;
    height: 10vh;
    background-color: #336699;
    &:hover {
        background-color: #FBB03B;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
   width: 10vw;
   height: 8vh;

   &:hover {
       background-color: #22B14CED;
       color: #000;
       border-color: transparent;
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