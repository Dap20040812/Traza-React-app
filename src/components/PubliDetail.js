import React, { useState } from 'react';
import styled from 'styled-components'
import Info from './Info'
import RequestForm from './RequestForm';

function Detail() {
  
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
        <Background>
            <img src="https://gates.scene7.com/is/image/gates/truck-and-bus?$Image_Responsive_Preset$&scl=1"/>
        </Background>
        <LeftData>
            <ImageTitle>
                <img src="https://us.123rf.com/450wm/putracetol/putracetol1805/putracetol180502430/101057512-dise%C3%B1o-del-icono-del-logotipo-de-entrega.jpg?ver=6"/>
            </ImageTitle>
            <Price>
                $ 234556666.79
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
                    Datos del envio: no que escribir asi que estoy poniendo lo que estoy pensando en este momento pero ahorita mi mente no funciona , me quiero morir porque ser millonario es tan dificil.     
                </Description>

        </LeftData> 
        <RigthData>
            {getContent()}
        </RigthData>   
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
    align-items: center;
`

const PlayButton = styled.button`
    border-radius: 4px;
    font-size: 15px;
    padding: 0px 24px;
    margin-right: 22px;
    display: flex;
    align-items: center;
    height: 56px;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 1.8px;
    cursor: pointer;

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
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);
    max-width: 760px;
`

const LeftData = styled.div`
    border-radius: 10px;
    background-color: #929294BA;
    margin-top: 50px;
    padding: 10px;
    opacity: 0.9;
    max-height: 100vh;
    max-width: 100vh;
    overflow: hidden;
    max-width: 350px;
    color: black;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

`
const RigthData = styled.div`
    border-radius: 10px;
    background-color: #929294BA;
    margin-top: 50px;
    width: 130vh;
    margin-left: 70px;
    max-height: 150vh;
    overflow: hidden;
    color: black;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`
const Price = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 35px;
`
const PubliTitle = styled.div`
    margin: 10px;
    padding: 10px;
    font-size: 30px;
    color: white;
    font-weight: bold;


`

