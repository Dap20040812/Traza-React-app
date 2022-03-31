import React, {useState} from 'react'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux' ;


function Header() {
    const[burgerStatus, setBurgerStatus] = useState(false);

  return (
    <Nav>
        <Logo src="/images/traza.png"/>
        <NavMenu>
            <a>
            <StyledLink to={`/`}>
                <img src='/images/Home.png'></img> 
                <span>INICIO</span>  
            </StyledLink>                                
            </a>
            <a>
               <img src='/images/search.png'></img>    
               <span>BUSCAR</span>            
            </a>
            <a>
               <img src='/images/servi.png'></img>    
               <span>SERVICIOS</span>            
            </a>
            <a>
               <img src='/images/support.png'></img>    
               <span>SOPORTE</span>            
            </a>
        </NavMenu>
        <RightMenu>
            <UserImg src='https://img.a.transfermarkt.technology/portrait/big/28003-1631171950.jpg?lm=1'/>
            <CustomMenu onClick={()=> setBurgerStatus(true)}/>
        </RightMenu>
        <BurgerNav show={burgerStatus}>
            <CloseWrapper>
                <CustomClose onClick={()=> setBurgerStatus(false)}/>
            </CloseWrapper>
            <li><a href="#">Existing Inventory</a></li>
            <li><a href="#">Used Inventory</a></li>
            <li><a href="#">Trade-in</a></li>
            <li><a href="#">Cybertruck</a></li>
            <li><a href="#">Roadaster</a></li>
        </BurgerNav>
    </Nav>
  )
}

export default Header

const Nav = styled.nav`
      height: 70px;
      background: #ff7300;
      display: flex;
      align-items: center;
      padding: 0 36px;
      overflow-x: hidden;

`
const Logo = styled.img`
      width: 80px;
     
`

const NavMenu = styled.div`

    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        img{
            height: 20px;
        }
        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            text-decoration: none; 

            &: after{
                content:"";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }

        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`

const UserImg = styled.img`
   width: 48px;
   height: 48px;
   border-radius: 50%;
   cursor: pointer;
`

const RightMenu = styled.div`
display: flex;
align-items: center;
a{
  font-weight: 600;
  text-transform: uppercase;
  padding: 0 10px;
}  
`
const CustomMenu = styled(MenuIcon)`
  cursor: pointer;
`

const BurgerNav = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: white;
  width: 300px;
  z-index: 16;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;
  transform: ${props => props.show ? 'translateX(0)': 'translateX(100%)'};
  transition: transform 0.2s;
  li{
    padding: 15px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);

    a{
      font-weight: 600; 
    }
  }
`

const CustomClose = styled(CloseIcon)`
  cursor: pointer;  
`

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
   
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;