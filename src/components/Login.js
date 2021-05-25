import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
	state = {
		toHome: false,
	}
	
	handleOnChange = (e) => {
		const { dispatch } = this.props
		console.log(`this.props.authedUser: ${this.props.authedUser}`)
		dispatch(setAuthedUser(e.target.value))
		this.setState(()=> ({
			toHome: e.target.value ? true : false,
		}))
	}
	
	render () {
	//console.log('this.props: ', this.props)
		const { authedUser, users } = this.props
		console.log('toHome: ', this.state)
		const { toHome } = this.state
		
		if (toHome === true) {
			return <Redirect to='/' />
		}
		return (
			<div>
				<h3 className='welcome'>Welcome to the Would You Rather App!</h3>
				<label className='login'>Sign in</label>
				<select name='users' id='users' onChange={this.handleOnChange}>
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
function mapStateToProps (users) {
		//console.log('authedUser: ', authedUser)
		console.log('users: ', users)
	return (
		users
	)
}

export default connect(mapStateToProps)(Login)