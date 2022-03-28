import React from 'react'
import styled from 'styled-components' 


function Login() {
  return (
    <Container>
        <CTA>
            <CTALogoOne src="/images/TrazaLogo.png"/>
            <SigUp>GET ALL THERE</SigUp>
            <Description>
                Obten los beneficios de compartir los espacios de almacenamiento, descubre esta nueva forma de transportar tus productos de forma segura y economica para tu empresa    
            </Description>
        </CTA>
    </Container>
  )
}

export default Login

const Container = styled.div`
    position: relative;
    height: calc(100vh - 70px);
    display: flex;
    align-items: top;
    justify-content: center;

    &:before {
        background-position: top;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url("/images/fondointro.jpg");
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.7;
        z-index: -1;
    }

`

const CTA = styled.div`
    max-width: 650px;
    padding: 80px 40px;
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    align-items: center;

`

const CTALogoOne = styled.img``

const CTALogoTwo = styled.img`
    width: 90%;
`



const SigUp = styled.a`
    width: 100%;
    background-color: #FFAD66;
    font-weight: bold;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    trasition: all 250ms;
    letter-spacing: 1.5px;
    margin-top: 8px;
    margin-bottom: 12px;

    &:hover {
        background: #d18040;
    }

    
`

const Description = styled.p`
    font-size: 11px;
    letter-spacing: 1.5px;
    text-align: center;
    line-height: 1.5;

`