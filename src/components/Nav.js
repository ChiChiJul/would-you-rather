import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
	state = {
		login: 'Login',
	}
	
	handleOnClick = () => {
		const { dispatch, authedUser } = this.props
		this.setState(() => ({
			login: authedUser !== null ? 'Logout' : 'Login' // Logout
		}))
		
		if (authedUser !== null && this.state.login === 'Login') {
			dispatch(setAuthedUser(null))
			this.setState(() => ({
				login: 'Login'
			}))
		}
	}
	
	render() {
		const { authedUser, user } = this.props
		const { login } = this.state
		
		return (
			<nav className='nav'>
				<ul>
					<li>
						<NavLink to='/' exact activeClassName='active'>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to='/add' exact activeClassName='active'>
							New Question
						</NavLink>
					</li>
					<li>
						<NavLink to='/leaderboard' exact activeClassName='active'>
							Leader Board
						</NavLink>
					</li>
					<li className='login'>
						{authedUser !== null ?
							<NavLink 
								to={{
									pathname: '/login'
								}} 
								exact 
								onClick={() => this.handleOnClick() } 
								activeClassName='active'>
								<span>
									Hello, {user.name}
								</span>
								<span>
									<img 
										src={user.avatarURL}
										alt={`Avatar of ${user.name}`}
										className='avatar'
									/>
								</span>
								<span>
									{authedUser !== null ? 'Logout' : login}
								</span>
							</NavLink>
						: null}
					</li>
				</ul>
			<hr/>
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