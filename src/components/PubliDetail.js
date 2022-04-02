import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import Info from './Info'
import RequestForm from './RequestForm';
import db from '../firebase'
import { useParams } from 'react-router-dom'


function Detail() {

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
  
  const [page, setPage] = useState('Info')
  const getContent = () => {
    if(page === 'Info'){
      return(
        <Info/> 
      )
    }
    else if (page === 'Request'){
      return(
        <RequestForm/>
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
                <LeftData>
                    <ImageTitle>
                        <img src="https://us.123rf.com/450wm/putracetol/putracetol1805/putracetol180502430/101057512-dise%C3%B1o-del-icono-del-logotipo-de-entrega.jpg?ver=6"/>
                    </ImageTitle>
                    <Price>
                        $ {publi.price}
                    </Price>
                        <Controls>
                            <PlayButton  onClick={toPage('Request')}>
                                <span>SOLICITAR</span>
                            </PlayButton>
                            <TrailerButton  onClick={toPage('Info')}>
                                <span>+ INFO</span>
                            </TrailerButton>
                        </Controls>
                        <SubTitle>
                            Nombre de la empresa
                        </SubTitle>
                        <Description>
                            {publi.serviceDescription}
                        </Description>

                </LeftData> 
                <RigthData>
                    {getContent()}
                </RigthData> 
           </> 
        )

        }
         
    </Container>
  )
}

export default Detail

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
    opacity: 0.8;

    img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
`
const ImageTitle = styled.div`
    height: (100vh - 65vh);
    width: (100vh - 65vh);

    img{
        width: calc(100vh - 65vh);
        height: calc(100vh - 65vh);
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

const TrailerButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249,249)
  
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

