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
		const { dispatch, authedUser, users } = this.props
		this.setState(() => ({
			loginUser: option.uid
		}))
	}
	
	handleOnClick = () => {
		const { dispatch, authedUser, users } = this.props
		
		console.log('in handleOnClick')
		
		if (this.state.loginUser !== null) {
			dispatch(setAuthedUser(this.state.loginUser))
		}
		this.setState(()=> ({
			toHome: true
		}))
		//this.props.history.push('/')
	}
	
	render () {
		const { firstUser, users, loginUsers } = this.props
		const { toHome } = this.state
		
		console.log('toHome: ', toHome)
		
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
							options={loginUsers}
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
	const loginUsers = []
	
	{Object.values(users).map(user => {
		console.log('uid: ', user.id)
		if (user.id === firstUser) {
			loginUsers.push({
				label: user.name,
				value: user.id,
				uid: user.id,
				disabled: true
			})
		}
		else (
			loginUsers.push({
				label: user.name,
				value: user.id,
				uid: user.id
			})
		)
	})}
	
	return {
		firstUser,
		users,
		loginUsers
	}
}

export default withRouter(connect(mapStateToProps)(Login))