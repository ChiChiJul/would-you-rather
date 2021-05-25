import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import { handleQuestionToggle } from '../actions/questions'

class Question extends Component {
	handleQuestion = (e) => {
		e.preventDefault() 
		
		console.log(this.props)
		
		const { dispatch, question, authedUser } = this.props
		
		dispatch(handleQuestionToggle({
			id: question.id,
			authedUser,
			option: question.option
		}))
	}
	
	render() {
		const { authedUser, question } = this.props
		
		if (question === null) {
			return <p>This Question does not exist</p>
		}
		
		console.log(question)
		
		const { id, avatarURL, timestamp, optionOne, optionTwo } = question
		
		console.log(`optionOne: ${optionOne.text}`)
		
		return (
			<div>
				<p>Name:</p>
				<div>
					<span>
						<img
							src={avatarURL}
							alt={`Avatar of`}
							className='avatar'
						/>
					</span>
					<div>
						<h3>Would You Rather...</h3>
						<form>
							<input 
								type='radio' 
								id='optionOne' 
								name='optionOne' 
								value='optionOne'
								size='30'
							/>
							<input
								type='radio' 
								id='optionTwo' 
								name='optionTwo' 
								value={optionTwo.text}
							/>
							<button className='btn' onClick={this.handleQuestion}></button>
						</form>	
					</div>
				</div>
			</div>
		)
	}
}

// whats returned are args to Question component
function mapStateToProps({authedUser, users, questions}, {id}) {
	const question = questions[id]
	
	console.log(`authedUser: ${authedUser}`)
	
	if (authedUser === null) {
		authedUser = 'somename'
	}
	
	return {
		authedUser,
		question: question
			? formatQuestion(question, authedUser)
			: null
	}
}

export default connect(mapStateToProps)(Question)