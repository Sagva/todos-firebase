import React, { useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const LogoutPage = () => {
	const navigate = useNavigate()
	const { logout,  user  } = useAuthContext()

	useEffect(async () => {
		try {
			logout()
			
			setTimeout(()=> {
				navigate('/')
			}, 3000)
		} catch (e) {
			console.log(`error`, e)
		} 
		
	}, [])

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Log Out</Card.Title>

							{user ? <Card.Text>Please wait while you're being logged out...</Card.Text> : <Card.Text>You were logged out... You are going to be redirected to the main page</Card.Text>}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default LogoutPage
