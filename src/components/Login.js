import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
	state = {
		toHome: false,
	}
	
	// first time loggin in doesn't setState toHome to true? Why?
	handleOnChange = (e) => {
		console.log(this.props)
		const { dispatch, authedUser, users } = this.props
		dispatch(setAuthedUser(e.target.value))
		console.log(`toHome: ${this.state.toHome}`)
		console.log(`authedUser: ${authedUser}`)
		console.log(`e.target.value: ${e.target.value}`)
		this.setState(()=> ({
			toHome: e.target.value ? true : false,
		}))
		console.log(`toHome: ${this.state.toHome}`)
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
		
		if (toHome === true) {
			return <Redirect to='/' />
		}
		return (
			<div>
				<h3 className='welcome'>Welcome to the Would You Rather App!</h3>
				<label className='login'>Sign in</label>
				<select name='users' id='users' onChange={this.handleOnChange}>
						{/*<option disabled selected value>firstUserName</option>*/}
					{Object.values(users).map(user => (
						<option key={user.id} value={user.id}>{user.name}</option>
					))}
				</select>
			</div>
		)
	}
}

//////////////////// ?????????????? //////////////////////////////////////
// why the function takes only one arg, otherwise redux state value error?
function mapStateToProps ({ authedUser, users, questions }) {
		//console.log('authedUser: ', authedUser)
		console.log('users: ', users)
		console.log('authedUser: ', authedUser)
	return {
		authedUser,
		users
	}
}

export default connect(mapStateToProps)(Login)