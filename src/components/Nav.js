import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
	state = {
		login: 'Login',
	}
	
	// if authedUser is not empty, then user has logged in and can log out.
	componentDidMount() {
	//	const authedUser = this.props.dispatch(setAuthedUser())
		const { authedUser } = this.props
		console.log(`before setState() ${this.state.login}`)
		this.setState(() => ({ 
			login: authedUser !== null ? (this.login: 'Logout') : 'Login'
		}))
		console.log(`after setState() ${this.state.login}`)
	}
	
	render() {
		const { authedUser } = this.props
		const { login } = this.state

		console.log(login)
		
		//{authedUser !== null ? (login : 'Logout') : 'Login'}
		
		return (
			<nav className='nav'>
				<ul>
					<li>
						<NavLink to='/' exact activeClassName='active'>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to='/new' exact activeClassName='active'>
							New Question
						</NavLink>
					</li>
					<li>
						<NavLink to='/leader_board' exact activeClassName='active'>
							Leader Board
						</NavLink>
					</li>
					<li>
						<NavLink to='/login' exact activeClassName='active'>
							Login
						</NavLink>
					</li>
				</ul>
			</nav>
		)
	}
}

function mapStateToProps( { authedUser } ) {
	return { authedUser }
}

export default connect(mapStateToProps)(Nav)