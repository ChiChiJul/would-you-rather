import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import { handleQuestionToggle } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class Question extends Component {
	state = {
		submitted: false
	}
	
	handleQuestion = (e) => {
		e.preventDefault() 
		
		console.log(this.props)
		
		const { dispatch, question, authedUser } = this.props
		
		dispatch(handleQuestionToggle({
			id: question.id,
			authedUser,
			option: question.option
		}))
		
		this.setState(() => ({
			submitted: e ? true : false 
		}))
	}
	
	render() {
		console.log('this.props: ', this.props)
		const { authedUser, users, question } = this.props
		console.log(`this.state.submitted: ${this.state.submitted}`)
		
		if (question === null) {
			return <p>This Question does not exist</p>
		}
		
		console.log('question: ', question)
		
		const { id, timestamp, optionOne, optionTwo } = question
		
		console.log(`optionOne: ${optionOne.text}`)
		

		{/*f (this.state.submitted === true) {
			return <Redirect to='./Result' />
		}*/}
		
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
								<button className='btn' onClick={this.handleQuestion}>Submit</button>
								{this.state.submitted 
									? <Redirect 
										to={{
											pathname: '/question/id',
											state: { id: id}
										}} 
										/> 
									: null}
							</div>
						</div>) : null
				)}
			</div>
		)
	}
}

// whats returned are args to Question component
function mapStateToProps({authedUser, users, questions}, props) {
	console.log('**** props **** ', props)

	const { qid } = props.match.params
	
	const id = 'loxhs1bqm25b708cmbf3g'
	const question = questions[id]
	console.log('id: ', id)
	console.log('question: ', question)
	
	return {
		authedUser,
		users,
		question: question
			? formatQuestion(question, authedUser)
			: null
	}
}

export default connect(mapStateToProps)(Question)