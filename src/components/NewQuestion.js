import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
		toHome: false,
	}
	
	handleChange = (e) => {
		switch(e.target.id) {
			case 'optionOne' : 
				let optionOne = ''
				optionOne = e.target.value
				this.setState(() => ({
					optionOne
				}))
				return optionOne
			case 'optionTwo' :
				let optionTwo = ''
				optionTwo = e.target.value
				this.setState(() => ({
					optionTwo
				}))
				return optionTwo
			default :
				return this.state
		}
	}
	
	handleSubmit = (e) => {
		e.preventDefault()
			
		const { optionOne, optionTwo } = this.state
		const { dispatch, id } = this.props
		
		dispatch(handleAddQuestion( {optionOne, optionTwo, id} ))
				
		this.setState(() => ({
			optionOne: '',
			optionTwo: '',
			toHome: id ? false : true
		}))
	}
	
	render() {
		const { optionOne, optionTwo, toHome } = this.state
		
		if (toHome === true) {
			return <Redirect to='/' />
		}
		
		return (
			<div>
				<h3 className='center'>Create New Question</h3>
				<p>Complete the question:</p>
				<p>Would you rather...</p>
				<form className='new-question' onSubmit={this.handSubmit}>
					<input
						id='optionOne'
						placeholder='Enter Option One Text Here'
						value={optionOne}
						onChange={this.handleChange}
						className='input'
						size={60}
					/>
					<div>OR</div>
					<input
						id='optionTwo'
						placeholder='Enter Option Two Text Here'
						value={optionTwo}
						onChange={this.handleChange}
						className='input'
						size={60}
					/><br/>
					<button
						className='btn'
						type='submit'
						disabled={optionOne === '' || optionTwo === ''}>
							Submit
					</button>
				</form>
			</div>
		)
	}
}

export default connect()(NewQuestion)