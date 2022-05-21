import React from 'react'
import styled from 'styled-components' 


function Login() {
  return (
    <Container>
        <CTA>
            <CTALogoOne src="/images/Traza.png"/>
            <SigUp>UNETE A LA FAMILIA TRAZA</SigUp>
            <Description>
                Brindamos una experiencia eficiente, confiable e innovadora a empresas de productos tangibles, siendo social y ambientalmente responsables.
                {/* Obten los beneficios de compartir los espacios de almacenamiento, descubre esta nueva forma de transportar tus productos de forma segura y economica para tu empresa     */}
            </Description>
        </CTA>
    </Container>
  )
}

export default Login

const Container = styled.div`
    position: relative;
    height: 120vh;
    display: flex;
    align-items: top;
    justify-content: center;
    &:before {
      background: url("/images/home-background.png") center center /cover 
       no-repeat fixed;
       content: "";
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       z-index: -1;
   }

`

const CTA = styled.div`
    max-width: 650px;
    padding: 80px 40px;
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-top: 4vh;
    align-items: center;

`

const CTALogoOne = styled.img`
    width: 70%;
`

const CTALogoTwo = styled.img`
    width: 90%;
`



const SigUp = styled.a`
    width: 100%;
    background-color: #336699ED;
    font-weight: bold;
    padding: 17px 0;
    color: #f9f9f9;
    border-radius: 4px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    letter-spacing: 1.5px;
    margin-top: 8px;
    margin-bottom: 12px;
    text-decoration: none;

    &:hover {
        background: #FBB03BED;
    }

    
`

const Description = styled.p`
    font-size: 11px;
    letter-spacing: 1.5px;
    text-align: center;
    line-height: 1.5;
    color: white;

`