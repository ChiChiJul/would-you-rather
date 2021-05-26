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
		const { authedUser, users, question } = this.props
		
		if (question === null) {
			return <p>This Question does not exist</p>
		}
		
		console.log('question: ', question)
		
		const { id, timestamp, optionOne, optionTwo } = question
		
		console.log(`optionOne: ${optionOne.text}`)
		
		return (
			<div>
				{Object.values(users).map((user) => 
					question.author === user.id 
						? (<div>
							<div>{user.name} asks:</div>
							<div>
								<span>
									<img 
										src={user.avatarURL}
										alt={'Avatar of ${user.name}'}
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
											value={optionOne.text}
											size='30'
										/>
										<input
											type='radio' 
											id='optionTwo' 
											name='optionTwo' 
											value={optionTwo.text}
											size='30'
										/>
										<button className='btn' onClick={this.handleQuestion}>Submit</button>
									</form>	
								</div>
								<button className='btn' onClick={this.handleQuestion}></button>
							</div>
						</div>) : null
				)}
			</div>
		)
	}
}

// whats returned are args to Question component
function mapStateToProps({authedUser, users, questions}, {id}) {
	const question = questions[id]
	
	// console.log(`authedUser: ${authedUser}, question: ${question}`)
	
	return {
		authedUser,
		users,
		question: question
			? formatQuestion(question, authedUser)
			: null
	}
}

export default connect(mapStateToProps)(Question)