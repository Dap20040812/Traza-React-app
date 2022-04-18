import React, { useState } from "react";
import styled from "styled-components";
import createCompany from "../backend/createCompany";
import EmbalajeData from "../data/EmbalajeData";
import {auth} from "../firebase"
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from 'react-router-dom'
import {
  selecUserName,
  selecUserPhoto,
  setUserLogin,
  setSignOut
} from "../features/user/userSlice"


function Login() {
  const [isRegistrando, setIsRegistrando] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  async function registrarUsuario(name,nit,razonSocial,secotrEconomico,email,phone,password) {
    const infoUsuario = await auth.createUserWithEmailAndPassword(
      email,
      password

    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario)
    createCompany(name,nit,razonSocial,secotrEconomico,email,phone,password)

    
  }

  function sumitHandler (e) {
    e.preventDefault();
    

    if (isRegistrando) {
      var elem1 = document.getElementById("email1");
      var elem2 = document.getElementById("password1");
      var elem3 = document.getElementById("name1");
      var elem4 = document.getElementById("social1");
      var elem5 = document.getElementById("sector1");
      var elem6 = document.getElementById("nit1");
      var elem7 = document.getElementById("tel1");
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      const name = e.target.elements.name.value;
      const razonSocial = e.target.elements.social.value;
      const secotrEconomico = e.target.elements.sector.value;
      const nit = e.target.elements.nit.value;
      const phone = e.target.elements.tel.value;
      if(email=== "")
        {
            window.alert("Ingresa una dirección de correo valida para continuar")
            elem1.style.color = "red";
        }else if(password=== ""){
            window.alert("Ingresa una contraseña para continuar")
            elem2.style.color = "red";
        }else if(name=== ""){
          window.alert("Completa el Nombre de la empresa para continuar")
          elem3.style.color = "red";
        }
        else if(razonSocial=== ""){
          window.alert("Completa la razon social para continuar")
          elem4.style.color = "red";
        }else if(secotrEconomico=== ""){
          window.alert("Completa el Sector economico de la empresa para continuar")
          elem5.style.color = "red";
        }else if(nit=== ""){
          window.alert("Completa el NIT de la empresa para continuar")
          elem6.style.color = "red";
        }
        else if(phone=== ""){
          window.alert("Completa el Teléfono de la empresa para continuar")
          elem7.style.color = "red";
        }
        else{
          registrarUsuario(name,nit,razonSocial,secotrEconomico,email,phone,password);
        }    
    } else {

      var elem1 = document.getElementById("email1");
      var elem2 = document.getElementById("password1");
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      if(email=== "")
        {
            window.alert("Ingresa una dirección de correo valida para continuar")
            elem1.style.color = "red";
        }else if(password=== ""){
            window.alert("Ingresa una contraseña para continuar")
            elem2.style.color = "red";
        }else{
     auth.signInWithEmailAndPassword(email, password)
     .then((result) => {
          let user = result.user
          dispatch(setUserLogin({
              name: user.uid,
              email: user.email,
              photo: "https://img.a.transfermarkt.technology/portrait/big/28003-1631171950.jpg?lm=1"
          }))
          history.push("/")

      })
    }
    }
  }
  return (
    <Container>
      <Background>
      </Background>
      <Data>
        <Form onSubmit={sumitHandler}> 
        <Title>{isRegistrando ? "Regístrate" : "Inicia sesión"}</Title>
        {isRegistrando ? (
          <>
          <Inputs >
            <Text id="name1">Nombre de la Empresa : </Text>
            <Input1 id="name" type="text"/>
          </Inputs>
          <Inputs >
            <Text id="social1">Razon Social : </Text>
            <Input1 id="social" type="text"/>
          </Inputs>
          <Inputs >
            <Text id="nit1">Nit : </Text>
            <Input1 id="nit" type="number" min="1"/>
          </Inputs>
          <Inputs>
            <Text id="sector1">sector : </Text>
            <Input5 id="sector">
              {
                EmbalajeData.map((e, key) => {
                  return <option key={key}>{e.name}</option>;
                })
              }
            </Input5>
          </Inputs>
          <Inputs >
            <Text id="tel1">Teléfono : </Text>
            <Input1 id="tel" type="number" min="1"/>
          </Inputs>
          <Inputs >
            <Text id="email1">Email</Text>
            <Input1 id="email" type="email"/>
          </Inputs>
          <Inputs>
            <Text id="password1">Contraseña :</Text>
            <Input2 id="password" type="password"/>
          </Inputs>
          
          </>
        ): <>
          <Inputs >
            <Text id="email1">Email</Text>
            <Input1 id="email" type="email"/>
          </Inputs>
          <Inputs>
            <Text id="password1">Contraseña :</Text>
            <Input2 id="password" type="password"/>
          </Inputs>
        </>}
        <Inputs>
            <Input4 type="submit" value={isRegistrando ? "Regístrate" : "Inicia sesión"} />
          </Inputs>
        </Form>
        <Button onClick={() => setIsRegistrando(!isRegistrando)}>
          {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
        </Button>
      </Data>
    </Container>
  );
}

export default Login;

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
const Data = styled.div`
  border-radius: 1vh;
  background-color: #929294BA;
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  padding: 2vh;
  opacity: 0.9;
  max-height: 200vh;
  width: 70vh;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.7); 
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`
const Form = styled.form`
`
const Title = styled.div`
  margin: 1vh;
  padding: 1vh;
  font-size: 4vh;
  color: white;
  font-weight: bold;

`
const Text = styled.div`
    color: white;
    font-weight: bold;

`     
const Input1 = styled.input`
    font-size: 2vh;
    type: email;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
`
const Input2 = styled.input`
    font-size: 2vh;
    type: password;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
    
`
const Input3  = styled.input`
    font-size: 2vh;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;

`
const Input4 = styled.input`
  border-radius: 1vh;
  font-size: 2vh;
  margin-top: 2vh;
  text-align:center;
  margin-right: 3vh;
  display: flex;
  align-items: center;
  max-width: 15vh;
  height: 4vh;
  background: rgb(249, 249, 249);
  border: none;
  letter-spacing: 0.15vh;
  cursor: pointer;
  text-align: center; 

  &:hover {
      background: rgb(198, 198, 198);
  }
`
const Input5 = styled.select`
    font-size: 2vh;
    type: password;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
`
const Inputs = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
`
const Button = styled.button`
    border-radius: 1vh;
    font-size: 2vh;
    margin-top: 2vh;
    text-align:center;
    margin-right: 3vh;
    display: flex;
    align-items: center;
    max-width: 20vh;
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