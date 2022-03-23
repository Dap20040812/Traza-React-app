import React from 'react'
import styled from 'styled-components'

function Publi() {
  return (
    <Container>
        <h4>Recomendados: </h4>
        <Content>
            <Wrap>
                <img src='https://img.lalr.co/cms/2021/07/02092052/NRR2351-6-Alta-JPG.jpg?size=sm&ratio=sq&f=jpg'/>
            </Wrap>
            <Wrap>
                <img src='https://auteco.vteximg.com.br/arquivos/ids/212961-1000-1000/Camion_STARK_E-TRUCK4_0T_Blanco_foto01.jpg'/>
            </Wrap>
            <Wrap>
                <img src='http://centrodiesel.cl/wp-content/uploads/2018/01/seguridad_camion.jpg'/>
            </Wrap>
            <Wrap>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzvQO-6wmHPH8gq8bkudTtvb_KUJSub8s5SQnn14XERui66lospz6N5HWFyaEm6odYGhc&usqp=CAU'/>
            </Wrap>

        </Content>
    </Container>
  )
}

export default Publi

const Container = styled.div`
    h4{
        color: #ff7300;
        font-size: 35px;
    }
`
const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0,1fr));
`
const Wrap = styled.div`
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.1); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: rgba(249, 249, 249 , 0.8);
    }

`