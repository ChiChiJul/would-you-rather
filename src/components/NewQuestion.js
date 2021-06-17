import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
	state = {
		optionOneText: '',
		optionTwoText: '',
		toHome: false,
	}
	
	handleChange = (e) => {
		switch(e.target.id) {
			case 'optionOneText' : 
				let optionOneText = ''
				optionOneText = e.target.value
				return this.setState(() => ({
					optionOneText
				}))
			case 'optionTwoText' :
				let optionTwoText = ''
				optionTwoText = e.target.value
				return this.setState(() => ({
					optionTwoText
				}))
			default :
				return this.state
		}
	}
	
	handleSubmit = (e) => {
		e.preventDefault()
			
		const { optionOneText, optionTwoText } = this.state
		const { dispatch, authedUser } = this.props
		
		dispatch(handleAddQuestion({ optionOneText, optionTwoText }))
				
		this.setState(() => ({
			optionOneText: '',
			optionTwoText: '',
			toHome: authedUser ? true : false
		}))
	}
	
	render() {
		const { optionOneText, optionTwoText, toHome } = this.state
		
		if (toHome === true) {
			return <Redirect to='/' />
		}
		
		return (
			<div className='newQuestionContainer'>
				<h3 className='center'>Create New Question</h3>
				<p>Complete the question:</p>
				<p>Would you rather...</p>
				<form className='newQuestion' onSubmit={this.handleSubmit}>
					<input
						id='optionOneText'
						placeholder='Enter Option One Text Here'
						value={optionOneText}
						onChange={this.handleChange}
						className='input'
						size={50}
					/>
					<div>OR</div>
					<input
						id='optionTwoText'
						placeholder='Enter Option Two Text Here'
						value={optionTwoText}
						onChange={this.handleChange}
						className='input'
						size={50}
					/><br/>
					<button
						className='btn'
						type='submit'
						disabled={optionOneText === '' || optionTwoText === ''}>
							Submit
					</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps( {authedUser} ) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(NewQuestion)