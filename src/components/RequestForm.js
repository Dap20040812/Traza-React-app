import React from 'react'
import styled from 'styled-components'

function RequestForm() {
  return (
    <Container>
      <PubliTitle>
          Solicitud de Pedido
      </PubliTitle>
    </Container>
  )
}

export default RequestForm

const Container = styled.div``
const PubliTitle = styled.div`
    margin: 10px;
    padding: 10px;
    font-size: 30px;
    color: white;
    font-weight: bold;


`

