import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImgSliderPubli() {
  let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
  }  
  return (
    <Carousel {...settings}>
        <Wrap>
            <img src="https://img.freepik.com/foto-gratis/camion-remolque-contenedor-carga-carga-mercancias-paletas-almacen-logistica-industria-carga-transporte_36860-663.jpg"/>
        </Wrap>
        <Wrap>
            <img src="https://media.istockphoto.com/photos/the-truck-container-docking-load-shipment-goods-pallet-hand-pallet-picture-id1195393617?k=20&m=1195393617&s=170667a&w=0&h=euPjGmZjL_Vu3H04XYdXX1HhVITFFmbx_td_DVXZo48="/>
        </Wrap>
    </Carousel>
  )
}

export default ImgSliderPubli

const Carousel = styled(Slider)`

    ul li button{
        &:before{
            font-size: 10px;
            color: rgb(150, 158, 171); 
             
        }
    }    
    li.slick-active button:before{
        color: white;
    }
    button {
        z-index: 1;
    }


`

const Wrap = styled.div`
    cursor: pointer;
    img{
        border: 4px solid transparent;
        border-radius: 4px;
        width: 100%;
        height: 100%;
        box-shadow: rgb(0 0 0/69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
        transition-duration:300ms;

        &:hover {
            border: 4px solid rgba(249, 249, 249, 0.8);
        }
    }

`