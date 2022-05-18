import React , {useState}from 'react'
import styled from 'styled-components'
import Form from "react-bootstrap/Form"
import { acceptedRequest } from '../backend/statusRequest'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


function AcceptRequest(props) {
  const [ errors, setErrors ] = useState({})
  const [ form, setForm ] = useState({})
  const {id} = useParams();
  const history = useHistory()

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
    const {price} = form
    const newErrors = {}
    // name errors
    if(!price || price === "") newErrors.price = "Ingresa el precio final para continuar."
    return newErrors
  }

  function handleSubmit (e) {

    e.preventDefault();

    const comentarios = e.target.elements.comen.value;
    const price = e.target.elements.price.value;
  
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
        setErrors(newErrors)
    }else 
    {
        acceptedRequest(id,comentarios,price)
        window.alert("Solicitud aceptada con éxito.")
        history.push("/mypubly") 
    }
}

   return(
     <Container>
       <Background/>
       <Data>
         <Form1 onSubmit={handleSubmit}>
          <Title>Aceptar Solicitud</Title> 
          <Form.Group className='col-md-4 w-100'>
              <Form.Label id="comen1" className="form-label">Comentarios Finales :</Form.Label>
              <textarea id="comen" rows="3" placeholder="Comentarios Finales" className="form-control" onChange={ e => setField('comentarios', e.target.value) } required/>
          </Form.Group>
          <Form.Group className='col-md-6'>
            <Form.Label className='form-label' > Propuesta de Precio Final : </Form.Label>
              <Form.Control id='price' type='number' min='100' className='form-control' onChange={e => setField('price', e.target.value)} isInvalid={!!errors.price} />
              <Form.Control.Feedback type='invalid' >
                {errors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
              <Input type="submit" value="SOLICITAR"></Input>
          </Form.Group>
         </Form1>
       </Data>
     </Container>
   ) 
}

export default AcceptRequest

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    display: flex;
    flex-direction: row;
    position:relative;
    justify-content: center;
`
const Input = styled.input`
   border: 1px solid #f9f9f9;
   padding: 8px 16px;
   margin: 1vw 1vh;
   border-radius: 4px;
   letter-spacing: 1.5px;
   text-transform: uppercase;
   background-color: #2A3EABED;
   transition: all 0.2s ease 0s;
   cursor: pointer;

   &:hover {
       background-color: #22B14CED;
       color: #000;
       border-color: transparent;
   }

`
const Form1 = styled(Form)`
    max-width: 70vw;
    .Form.Group{
        height: 20vh;
    }  
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
        filter: brightness(50%);
    }
`

const Data = styled.div`
    border-radius: 1vh;
    background-color: #929294BA;
    margin-top: 5vh;
    padding: 2vh;
    opacity: 0.9;
    height: 80vh;
    width: 100vh;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.7); 
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    display: flex;
    flex-direction: column;
  `
const Title = styled.div`
    font-weight: bold;
    font-size: 4vh;
    padding: 2vh;
    text-align: center;
`