import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import { handleQuestionAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import QuestionResult from './QuestionResult'
import { withRouter } from 'react-router-dom'

class Question extends Component {
	state = {
		option: '',
		submitted: false
	}

	handleOnChange = (e) => {
		this.setState(() => ({
			option: e.target.id
		}))
	}
	
	handleQuestion = (e) => {
		e.preventDefault() 
		
		const { dispatch, question, authedUser } = this.props
		const qid = question.id
		
		dispatch(handleQuestionAnswer({
			qid: question.id,
			authedUser,
			answer: this.state.option
		}))
		
		// redirect
		this.props.history.push(`/question_result/${qid}`)
	}
	
	render() {
		const { authedUser, user, question } = this.props
		const { qid, timestamp, optionOne, optionTwo } = question
		
		if (question === null) {
			return <p>This Question does not exist</p>
		}

		return (
			<div class='question'>
				<div>
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
							<form className='questionForm'>
								<input 
									type='radio' 
									id='optionOne' 
									name='option' 
									value={optionOne.text}
									onChange={this.handleOnChange}
								/>{optionOne.text}
								<input
									type='radio' 
									id='optionTwo' 
									name='option' 
									value={optionTwo.text}
									onChange={this.handleOnChange}
								/>{optionTwo.text}
								<button 
									className='btn' 
									disabled={this.state.option === ''}
									onClick={(e) => 
										this.handleQuestion(e)
									}>
									Submit
								</button>
							</form>	
						</div>
					</div>
				</div>
			</div>
		)
	}
}

// whats returned are args to Question component
function mapStateToProps({ authedUser, users, questions }, props ) {
	const qid = props.location.state.id
	const question = questions[qid]
	const user = users[question.author]

	return {
		authedUser,
		user,
		question: question
			? formatQuestion(question, authedUser)
			: null
	}
}

export default withRouter(connect(mapStateToProps)(Question))