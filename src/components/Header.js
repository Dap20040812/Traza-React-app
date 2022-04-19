import React, {useState, useEffect} from 'react'
import { auth, provider} from "../firebase"
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import {
    selecUserName,
    selecUserPhoto,
    selecUserUid,
    setUserLogin,
    setSignOut
} from "../features/user/userSlice"
import {useDispatch, useSelector} from "react-redux"

function Header() {
    const[burgerStatus, setBurgerStatus] = useState(false);
    const dispatch = useDispatch()
    const history = useHistory()
    const userPhoto = useSelector(selecUserPhoto);
    

    useEffect(() => {
      auth.onAuthStateChanged(async (user) =>{
          if(user){
              dispatch(setUserLogin({
                  name: user.displayName,
                  email: user.email,
                  uid: user.uid,
                  photo: user.photoURL
              }))
              history.push("/")
          }else{
            history.push("/intro") 
          }
      })
    },[])     
    
    const userName = useSelector(selecUserName);

  
    const signOut = () => {
        auth.signOut()
        .then(()=> {
            dispatch(setSignOut());
            history.push("/intro")
        })
    }
  return (
    <Nav>
        <Logo src="/images/traza.png"/>
        {!userName ? (
          <LoginContainer>
            <StyledLink to={`/login`}>
              <Login >Login</Login>
            </StyledLink>
          </LoginContainer>
           ):
         <>
          <NavMenu>
            <a>
              <StyledLink to={`/`}>
                  <img src='/images/Home.png'></img> 
                  <span>INICIO</span>  
              </StyledLink>                                
            </a>
                
            <a>
              <StyledLink to={`/homepubli`}>
                <img src='/images/search.png'></img>    
                <span>BUSCAR</span>   
              </StyledLink>
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
              <UserImg src={userPhoto} onClick={()=> setBurgerStatus(true)}/>
          </RightMenu>
          <BurgerNav show={burgerStatus}  onClick={()=> setBurgerStatus(false)}>
              <CloseWrapper>
                  <CustomClose onClick={()=> setBurgerStatus(false)}/>
              </CloseWrapper>
              <UserImg src={userPhoto}/>
              <StyledLink1 to={`/publimy`}><li>Mis Publicaciones</li></StyledLink1>
              <StyledLink1  to={`/publi/make`}><li>Realiza una Publicación</li></StyledLink1>
              <StyledLink1 to={`/profile`}><li>Perfil</li></StyledLink1>
              <StyledLink1 onClick={signOut} ><li>Cerrar Sesión</li></StyledLink1>
          </BurgerNav>
         </> 
      }  
        
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
   margin: 1vh;
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

const BurgerNav = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background: white;
  border: 3px solid rgba(136, 148, 122, 0.7); 
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
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
    &:hover {
        border-radius: 0.6vh;
        border-color: rgba(249, 249, 249 , 0.8);
        color: white;
        background-color: #0000003D;
        opacity: 0.9;
    }
  }
`

const CustomClose = styled(CloseIcon)`
  cursor: pointer;  
  color: black;
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
`
const StyledLink1 = styled(Link)`
    text-decoration: none;
    color: black;
    font-weight: bold;


    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

`
const Login = styled.div`
   border: 1px solid #f9f9f9;
   padding: 8px 16px;
   border-radius: 4px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   background-color: rgba(0, 0, 0, 0.6);
   transition: all 0.2s ease 0s;
   cursor: pointer;

   &:hover {
       background-color: #f9f9f9;
       color: #000;
       border-color: transparent;
   }
`

const LoginContainer = styled.div`
   flex:1;
   display: flex;
   justify-content: flex-end;
`