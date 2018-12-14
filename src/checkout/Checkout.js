import React  from 'react'
import Container from 'react-storefront/Container'
import Row from 'react-storefront/Row'

export default function Checkout() {
  return (
    <Container>
      <Row>
        <form method="post" action="/order">
        	<button>Submit Order</button>
        </form>
      </Row>
    </Container>
  )
}