import React, { useEffect, useState } from "react";
import styled from "styled-components";
import createCompany from "../backend/createCompany";
import EmbalajeData from "../data/EmbalajeData";
import {auth} from "../firebase"
import {useDispatch, useSelector} from "react-redux"
import {storage} from '../firebase'
import { useHistory } from 'react-router-dom'
import {setUserLogin} from "../features/user/userSlice"
import Form from "react-bootstrap/Form"
import {Spinner} from "reactstrap"


function Login() {
  const [isRegistrando, setIsRegistrando] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  const [publiImg, setPubliImg] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})
  const [loading, setLoading] = useState(false);


  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const {email,password,name,razonSocial,nit,nit2,sector,tel} = form
    const newErrors = {}
    // name errors
    if ( !email || email === '' ) newErrors.email = 'Ingresa un correo para continuar.'
    if ( !password || password === '' ) newErrors.password = 'Ingresa una contraseña para continuar.'
    if ( !name || name === '' ) newErrors.name = 'Ingresa el nombre de la empresa para continuar.'
    if ( !razonSocial || razonSocial === '' ) newErrors.razonSocial = 'Ingresa la razón social de la empresa para continuar.'
    if ( !nit || nit === '' ) {
      newErrors.nit = 'Ingresa el NIT del empresa para continuar.'
    }
    else if (nit.length != 9) {
      newErrors.nit = 'Este NIT no es válido.'
    }
    if ( !nit2 || nit2 === '' ) {
      newErrors.nit2 = 'Ingresa el número de verificación del NIT del empresa para continuar.'
    }
    else if (nit2.length != 1) {
      newErrors.nit2 = 'Este número de verificación del NIT no es válido.'
    }
    if ( !sector || sector === '' ) newErrors.sector = 'Ingresa el sector de la empresa para continuar.'
    if ( !tel || tel === '' ) { 
      newErrors.tel = 'Ingresa un teléfono válido para continuar.'
    }
    else if (tel.length != 10) {
      newErrors.tel = 'Télefono no válido.'
    }

    return newErrors
}
  /**
   * Registra una empresa en la base de datos
   * @param {*} name 
   * @param {*} nit 
   * @param {*} razonSocial 
   * @param {*} sectorEconomico 
   * @param {*} email 
   * @param {*} phone 
   * @param {*} password 
   * @param {*} elem2 
   */
  async function registrarUsuario(name,nit,razonSocial,sectorEconomico,email,phone,password) {
    const newErrors = findFormErrors()
    const infoUsuario = await auth.createUserWithEmailAndPassword(
      email,
      password,

    ).then((usuarioFirebase) => {
      usuarioFirebase.user.updateProfile({
        displayName: name,
        phoneNumber: phone,
        photoURL: publiImg
        
      })
      return usuarioFirebase;
      
    }).catch(FirebaseAuthUserCollisionException => {

      newErrors.email = "Este correo ya existe"
      setErrors(newErrors) 
  })
  .catch(FirebaseAuthWeakPasswordException => {
    newErrors.password = "La contraseña debe contener más de 6 caracteres"
    setErrors(newErrors) 
  })

    createCompany(infoUsuario.user.uid,name,nit,razonSocial,sectorEconomico,email,phone,password)
    history.push("/login")
  }

  /**
   * Verifica los datos ingresados por la empresa en el registro y login
   * @param {*} e 
   */

  function submitHandler (e) {
    e.preventDefault();
    

    if (isRegistrando) {
      
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      const name = e.target.elements.name.value;
      const razonSocial = e.target.elements.social.value;
      const sectorEconomico = e.target.elements.sector.value;
      const nit = (e.target.elements.nit.value + "-" + e.target.elements.nit2.value);
      const phone = e.target.elements.tel.value;
      const newErrors = findFormErrors()
      if ( Object.keys(newErrors).length > 0 ) {
        // We got errors!
        setErrors(newErrors)
      }else{
          registrarUsuario(name,nit,razonSocial,sectorEconomico,email,phone,password);
          
        }    
      } else {
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      const newErrors = findFormErrors()
      if(newErrors.email  !== "Ingresa un correo para continuar."  && newErrors.password !== "Ingresa una contraseña para continuar."){
          auth.signInWithEmailAndPassword(email, password)
          .then((result) => {
                let user = result.user
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photo: user.photoURL
                }))
                history.push("/")

            }).catch(ERROR_INVALID_EMAIL => {
              newErrors.email = "Correo no válido."
              setErrors(newErrors)
              }).catch(ERROR_WRONG_PASSWORD => {
                newErrors.password = "Contraseña no válida."
                setErrors(newErrors)
              })
        }
    }
  }

  /**
   * Guarda la imagen registrada por el usuario en el storage y genera un URL con la que se mostrará en la plataforma
   * @param {*} e 
   */
  const archivoMandler = async (e)=>{

    setLoading(true)
    setPubliImg("");
    const archivo = e.target.files[0];
    const storageRef = storage.ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log(archivo.name)
    const url =  await archivoPath.getDownloadURL();
    setPubliImg(url);
    setLoading(false)
}
  return (
    <Container>
      <Background>
      </Background>
      <Data>
        <Form1 onSubmit={submitHandler} className={isRegistrando ? "row g-3" : "col "}> 
        <Title>{isRegistrando ? "Regístrate" : "Inicia sesión"}</Title>
        {isRegistrando ? (
          <>
          <Form.Group className='col-md-4 w-25'>
            <Form.Label id="name1" className="form-label">Nombre de la Empresa :</Form.Label>
            <Form.Control id="name" type="text"  placeholder="Nombre de la Empresa" className="form-control" onChange={ e => setField('name', e.target.value) } isInvalid={ !!errors.name }/>
            <Form.Control.Feedback type='invalid'>
              { errors.name }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='col-md-4 w-25'>
            <Form.Label id="social1" className="form-label">Razon Social :</Form.Label>
            <Form.Control id="social" type="text"  placeholder="Razon Social" className="form-control" onChange={ e => setField('razonSocial', e.target.value) } isInvalid={ !!errors.razonSocial }/>
            <Form.Control.Feedback type='invalid'>
              { errors.razonSocial }
            </Form.Control.Feedback>
          </Form.Group>
          <div className="col-md-4 w-50">
          <Form.Group className='row'>
            <Form.Label id="nit1" className="form-label">Nit :</Form.Label>
            <div className="col-md-4 w-75">
            <Form.Control type="number" min="0" id="nit" placeholder="Nit" className="form-control" onChange={ e => setField('nit', e.target.value) } isInvalid={ !!errors.nit }/>
            <Form.Control.Feedback type='invalid'>
              { errors.nit }
            </Form.Control.Feedback>
            </div>
            <div className="col-md-4 w-25">
            <Form.Control type="number" min="0" id="nit2" placeholder="#" className="form-control" onChange={ e => setField('nit2', e.target.value) } isInvalid={ !!errors.nit2 }/>
            <Form.Control.Feedback type='invalid'>
              { errors.nit2 }
            </Form.Control.Feedback>
            </div>
          </Form.Group>
          </div>
          <Form.Group className='col-md-6'>
            <Form.Label id="sector1" className="form-label">Sector :</Form.Label>
            <Form.Select id="sector" placeholder="Sector" className="form-control" onChange={ e => setField('sector', e.target.value) } isInvalid={ !!errors.sector }> 
            {
                EmbalajeData.map((e, key) => {
                  return <option key={key}>{e.name}</option>;
                })
              }
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              { errors.sector }
            </Form.Control.Feedback>  
          </Form.Group>
          <Form.Group className='col-md-6'>
            <Form.Label id="tel1" className="form-label">Teléfono :</Form.Label>
            <Form.Control id="tel" type="num" min="1"  placeholder="Teléfono" className="form-control" onChange={ e => setField('tel', e.target.value) } isInvalid={ !!errors.tel }/>
            <Form.Control.Feedback type='invalid'>
              { errors.tel }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='col-md-6'>
            <Form.Label color="white" id="email1" className="form-label">Email :</Form.Label>
            <Form1.Control  id="email" type="email" placeholder="Email address" autoComplete="username" className="form-control" onChange={ e => setField('email', e.target.value) } isInvalid={ !!errors.email }/>
            <Form.Control.Feedback type='invalid'>
              { errors.email }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='col-md-6'> 
            <Form.Label id="password1" className="form-label">Contraseña :</Form.Label>
            <Form.Control id="password" type="password" placeholder="Password" autoComplete="current-password" className="form-control" onChange={ e => setField('password', e.target.value) } isInvalid={ !!errors.password }/>
            <Form.Control.Feedback type='invalid'>
              { errors.password }
            </Form.Control.Feedback>
          </Form.Group>
          <Inputs1>
                <Form.Label id='img' className="form-label">Foto Perfil :  </Form.Label>
                <Input7 type="file" accept="image/png, image/jpeg, image/jpg"  onChange={archivoMandler} />
                 {loading ? <Spinner/> : ""}
          </Inputs1>
          </>
        ): <>
          <Form.Group className="mb-3">
            <Form.Label color="white" id="email1" className="form-label">Email :</Form.Label>
            <Form1.Control  id="email" type="email" placeholder="Email address" autoComplete="username" className="form-control" onChange={ e => setField('email', e.target.value) } isInvalid={ !!errors.email }/>
            <Form.Control.Feedback type='invalid'>
              { errors.email }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3"> 
            <Form.Label id="password1" className="form-label">Contraseña :</Form.Label>
            <Form.Control id="password" type="password" placeholder="Password" autoComplete="current-password" className="form-control" onChange={ e => setField('password', e.target.value) } isInvalid={ !!errors.password } required/>
            <Form.Control.Feedback type='invalid'>
              { errors.password }
            </Form.Control.Feedback>
          </Form.Group>
        </>}
        <Inputs>
            <Input4 type="submit" value={isRegistrando ? "Regístrate" : "Inicia sesión"} />
        </Inputs>
        </Form1>
        <Button onClick={() => {setIsRegistrando(!isRegistrando)
        setErrorMessage("")}}>
          {isRegistrando ? "Ingresa con tu cuenta" : "Registrarme"}
        </Button>
      </Data>
    </Container>
  );
}
  


export default Login;

const Container = styled.div`
    padding: 3vh calc(3.5vw + 1vh);
    min-height: calc(100vh - 70px);
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
    background: url("/images/home-background.png") center center /cover 
    no-repeat fixed;
    content: "";
    position: absolute;

    img{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
`
const Data = styled.div`
  border-radius: 1vh;
  background-color: #929294BA;
  display: grid;
  place-items: center center;
  justify-content: center;
  margin-top: 2vh;
  padding: 2vh;
  opacity: 0.9;
  max-height: 200vh;
  min-width: 40vw;
  max-width: 200vw;
  overflow: hidden;
  border: 3px solid rgba(249, 249, 249, 0.7); 
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`
const Form1 = styled(Form)`
    max-width: 70vw;  
`
const Title = styled.div`
  margin: 1vh;
  padding: 1vh;
  font-size: 4vh;
  color: white;
  font-weight: bold;
  text-align: center;

`
const Text = styled.div`
    color: white;
    font-size: 2vh;
    font-weight: bold;

`     
const Input1 = styled.input`
    font-size: 2vh;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
`
const Input2 = styled.input`
    font-size: 2vh;
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
  background-color: #336699ED;
  border-radius: 0.5vh;
  font-weight: bold;
  font-size: 2.5vh;
  margin-top: 2vh;
  margin-right: 3vh;
  display: flex;
  width: 20vh;
  height: 6vh;
  background: #ffffff;
  border: none;
  letter-spacing: 0.15vh;
  cursor: pointer;
  justify-content: center;
  &:hover {
    background: #336699ED;
  }
`
const Input5 = styled.select`
    font-size: 2vh;
    margin: 2vh;
    font-size: max(16px, 1em);
    font-family: inherit;
    background-color: #fff;
    border: 2px solid var(--input-border);
    border-radius: 0.5vh;
`
const Inputs = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    
`
const Inputs1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`
const Input7 = styled.input`
    margin: 2vh;
   
    
`
const Button = styled.button`
    border-radius: 1vh;
    font-size: 2vh;
    text-align:center;
    margin-top: 3vh;
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
        background: #336699ED;
    }
`
const Error = styled.div`
  color: red;
` 