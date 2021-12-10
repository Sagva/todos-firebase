import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useAuthContext } from '../../contexts/AuthContext'


const Navigation = () => {
	const { user } = useAuthContext()

	useEffect(() => {
		console.log(`user in Navigator`, user)
	}, [user]);
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Link to="/" className="navbar-brand">
					<span role="img" aria-label="A note with a pen">📝</span> Firestore Todos
				</Link>
				

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" >
					<Nav>

						<NavLink to="/todos" className="nav-link">Todos</NavLink>

					</Nav>
					<Nav>

						<NavLink to="/login" className="nav-link">Login</NavLink>

					</Nav>
					<Nav>

						<NavLink to="/signup" className="nav-link">Signup</NavLink>

					</Nav>
					{user && <Nav>
						<NavLink to="/logout" className="nav-link">logout</NavLink>
					</Nav> }
					<Nav>

						{user && <span className="nav-link" >{user} </span>}

					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
