import React from 'react'
import styled from 'styled-components'

function CurrentService() {
  return (
    <Container>
        <Background>
            <img src="https://gates.scene7.com/is/image/gates/truck-and-bus?$Image_Responsive_Preset$&scl=1"/>
        </Background>
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