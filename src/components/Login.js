import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Login extends Component {
	state = {
		toHome: false,
		loginUser: ''
	}
	
	// first time loggin in doesn't setState toHome to true? Why?
	handleOnChange = (e) => {
		e.preventDefault()
		console.log(this.props)
		const { dispatch, authedUser, users } = this.props
		console.log(`toHome: ${this.state.toHome}`)
		console.log(`authedUser: ${authedUser}`)
		console.log(`e.target.value: ${e.target.value}`)
		console.log(`toHome: ${this.state.toHome}`)
		//this.props.handleOnClick()
		this.setState(() => ({
			loginUser: e.target.value
		}))
	}
	
	handleOnClick = (e) => {
		e.preventDefault()
		const { dispatch, authedUser, users } = this.props
		console.log('e.target.value: ', e.target.value)
		if (this.state.loginUser !== null) {
			dispatch(setAuthedUser(this.state.loginUser))
		}
		this.setState(()=> ({
			toHome: e.target.value ? true : false,
		}))
		this.props.history.push('/')
	}
	
	render () {
	//console.log('this.props: ', this.props)
		const { users } = this.props
		console.log('toHome: ', this.state)
		const { toHome } = this.state
		console.log('Object.values(users): ', Object.values(users))
		
		const userArr = Object.values(users)
		console.log('first user: ', Object.values(users)[0])
		
		const firstUser = Object.values(users)[0]
		console.log('first user: ', firstUser)
		//console.log('first user name: ', firstUser.name)
		
		//const firstUserName = firstUser.name
		//console.log('first user name: ', firstUserName)
		
		//const { firstUserName } = firstUser
		
		/*if (toHome === true) {
			return <Redirect to='/' />
		}*/
		return (
			<div className='login'>
				<h3 className='welcome'>Welcome to the Would You Rather App!</h3>
				<p>Please sign in to continue</p>
				<div>
					{firstUser !== undefined
						? <select 
							name='users' 
							id='users' 
							defaultValue={this.props.default} 
							onChange={this.handleOnChange}
						>
							<option disabled>{firstUser.name}</option>
								{Object.values(users).map(user => (
									<option key={user.id} value={user.id}>{user.name}</option>
								))}
						</select>
						: null}
				</div>
						<button 
							className='btn' 
							type='submit' 
							onClick={this.handleOnClick}>
								Sign In
						</button>
			</div>
		)
	}
}

//////////////////// ?????????????? //////////////////////////////////////
// why the function takes only one arg, otherwise redux state value error?
function mapStateToProps ({ authedUser, users, questions }, props) {
		//console.log('authedUser: ', authedUser)
		console.log('users: ', users)
		console.log('authedUser: ', authedUser)
		console.log('props: ', props) //history object
	return {
		authedUser,
		users
	}
}

export default withRouter(connect(mapStateToProps)(Login))