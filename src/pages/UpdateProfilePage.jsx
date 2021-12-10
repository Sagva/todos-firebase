import React, { useRef, useState } from 'react'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'


const UpdateProfilePage = () => {
	const displayNameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(null)
	const { updateUserName, updateUserEmail, updateUserPassword} = useAuthContext()
	const navigate = useNavigate()


	const handleSubmit = async (e) => {
		e.preventDefault()

		// make sure user has entered the same password in both input fields
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match")
		}

		setError(null);

		// update user profile
		try {
			// disable update-button while updating is in progress
			setLoading(true)

			// update displayName *ONLY* if it has changed
			if(displayNameRef.current.value) {
				updateUserName(displayNameRef.current.value)
				console.log(`displayNameRef`, displayNameRef.current.value)
				setLoading(false)
				displayNameRef.current.value=''
			}
			

			// update email *ONLY* if it has changed
			if(emailRef.current.value) {
				
				updateUserEmail(emailRef.current.value)
				console.log(`emailRef`, emailRef.current.value)
				setLoading(false)
				emailRef.current.value=''
			}

			// update password *ONLY* if the user has provided a new password to set
			if(passwordRef.current.value.length >= 6 && passwordConfirmRef.current.value.length >= 6 && passwordRef.current.value === passwordConfirmRef.current.value) {
				updateUserPassword(passwordRef.current.value)
				
				console.log(`passwordRef.current.value.length`, passwordRef.current.value.length)
				setLoading(false)
				passwordRef.current.value=''
				passwordConfirmRef.current.value=''
			}

			// when all tasks are done, show a message to the user that everything has been saved

		} catch (e) {
			setError("Error updating profile. Try logging out and in again.")
			setLoading(false)
		}
		
	}

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Header as="h5">Update Profile</Card.Header>
						<Card.Body>
							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>
								{/*
									Fill the displayName and email form fields with their current value!
								*/}

								<Form.Group id="displayName" className="mb-3" >
									<Form.Label>Name</Form.Label>
									<Form.Control type="text" ref={displayNameRef} />
								</Form.Group>

								<Form.Group id="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef}  />
								</Form.Group>

								<Form.Group id="password" className="mb-3">
									<Form.Label>New Password</Form.Label>
									<Form.Control type="password" ref={passwordRef}  />
								</Form.Group>

								<Form.Group id="password-confirm" className="mb-3">
									<Form.Label>Confirm New Password</Form.Label>
									<Form.Control type="password" ref={passwordConfirmRef}  />
								</Form.Group>

								<Button disabled={loading} type="submit">Update</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default UpdateProfilePage
