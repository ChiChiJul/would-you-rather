import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

class Login extends Component {
	state = {
		toHome: false,
		loginUser: ''
	}
	
	handleOnChange = (option) => {
		this.setState(() => ({
			loginUser: option.uid
		}))
	}
	
	handleOnClick = () => {
		const { dispatch } = this.props
		
		console.log('in handleOnClick')
		
		if (this.state.loginUser !== null) {
			dispatch(setAuthedUser(this.state.loginUser))
		}
		this.setState(()=> ({
			toHome: true
		}))
	}
	
	render () {
		const { firstUser, existingUsers } = this.props
		const { toHome } = this.state

		if (toHome === true) {
			console.log('inside toHome if loop')
			return <Redirect to='/' />
		}
		
		return (
			<div className='login'>
				<h3 className='welcome'>Welcome to the Would You Rather App!</h3>
				<p>Please sign in to continue</p>
				<div>
					{firstUser !== undefined
						? <Select id={'dropdown'}
							options={existingUsers}
							onChange={this.handleOnChange}
							isOptionDisabled={(option) => option.disabled === true}>
						</Select> : null}
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

function mapStateToProps ({ users }) {
	const firstUser = Object.values(users)[0]
	const existingUsers = []
	
	Object.values(users).map(user => {
		if (user.id === firstUser) {
			existingUsers.push({
				label: user.name,
				value: user.id,
				uid: user.id,
				disabled: true
			})
		}
		else (
			existingUsers.push({
				label: user.name,
				value: user.id,
				uid: user.id
			})
		)
		return existingUsers
	})
	
	return {
		firstUser,
		users,
		existingUsers
	}
}

export default withRouter(connect(mapStateToProps)(Login))