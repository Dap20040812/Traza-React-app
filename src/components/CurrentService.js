import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import db from '../firebase'

function CurrentService() {

    const {id} = useParams();
    const [publi, setPubli] = useState()

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
      },[])

  return (
    <Container>
        { publi && (
            <>
        <Background>
            <img src="https://gates.scene7.com/is/image/gates/truck-and-bus?$Image_Responsive_Preset$&scl=1"/>
        </Background>
        <Data>
            <LeftData>

            </LeftData>
            <RightData>
                <h3>{publi.originPlace} - {publi.destinationPlace}</h3>
                <Price>
                    {publi.price}
                </Price>
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
    color: black;
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