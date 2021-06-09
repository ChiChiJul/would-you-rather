import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import Login from './Login'

class Nav extends Component {
	state = {
		login: 'Login',
	}
	
	handleOnClick = () => {
		//e.preventDefault()
		const { dispatch, authedUser } = this.props
		
		console.log('authedUser: ', authedUser)
		console.log('this.state.login: ', this.state.login)
		
		// if logged in, then update login value to logout
		this.setState(() => ({
			login: authedUser !== null ? 'Logout' : 'Login' // Logout
		}))
		
		if (authedUser !== null && this.state.login === 'Login') {
			console.log(`%%%%%% authedUser: ${authedUser} this.state.login: ${this.state.login}`)
			dispatch(setAuthedUser(null))
			this.setState(() => ({
				login: 'Login'
			}))
		}
		
		console.log('authedUser: ', authedUser)
	}
	
	render() {
		const { authedUser, user } = this.props
		const { login } = this.state

		console.log(login) // Logout
		console.log('authedUser: ', authedUser) // johndoe
		console.log('user: ', user)
		
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
						{/*{authedUser !== null ? */}
							<NavLink 
								to={{
									pathname: '/login'
								}} 
								exact 
								onClick={() => this.handleOnClick() } 
								activeClassName='active'>
								{/*<span>Hello {user.name}</span>
								<span>
									<img 
										src={user.avatarURL}
										alt={'Avatar of ${user.name}'}
										className='avatar'
									/>
								</span>*/}
								{authedUser !== null ? 'Logout' : this.state.login}
							</NavLink>
						{/*: null} */}
					</li>
				</ul>
			</nav>
		)
	}
}

function mapStateToProps( { authedUser, users } ) {
	const user = users[authedUser]
	return { 
		authedUser,
		user
	}
}

export default connect(mapStateToProps)(Nav)