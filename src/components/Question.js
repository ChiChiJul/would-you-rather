import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import { handleQuestionAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class Question extends Component {
	state = {
		option: '',
		submitted: false
	}
	
	componentDidMount() {
		console.log('Question Component did mount')
		console.log('this.props.user.name: ', this.props.user.name)
	}
	
	componentWillUnmount() {
		console.log('Will unmount Question Component')
		console.log('this.props.user.name: ', this.props.user.name)
	}

	
	handleOnChange = (e) => {
		console.log('e.target.value: ', e.target.value)
		
		this.setState(() => ({
			option: e.target.id
		}))
	}
	
	handleQuestion = (e) => {
		e.preventDefault() 
		
		console.log(this.props)
		console.log('e.target.value: ', e.target.value)
		console.log('e: ', e)
		const { dispatch, question, authedUser } = this.props
		const { id } = question.id
		
		//console.log('authedUser: ', authedUser)
		console.log('question: ', question)
		
		dispatch(handleQuestionAnswer({
			id: question.id,
			authedUser,
			option: this.state.option
		}))
		
		this.props.history.push(`result/${id}`)
	}
	
	render() {
		const { authedUser, user, question } = this.props
		const { id, timestamp, optionOne, optionTwo } = question

		console.log(`this.state.submitted: ${this.state.submitted}`)		
		console.log('this.props: ', this.props)
		
		if (question === null) {
			return <p>This Question does not exist</p>
		}
		
		console.log('question: ', question)
		
		return (
			<div>
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
							<form>
								<input 
									type='radio' 
									id='optionOne' 
									name='optionOne' 
									value={optionOne.text}
									onChange={this.handleOnChange}
								/>{optionOne.text}
								<input
									type='radio' 
									id='optionTwo' 
									name='optionTwo' 
									value={optionTwo.text}
									onChange={this.handleOnChange}
								/>{optionTwo.text}
								{id && (
								<button 
									className='btn' 
									disabled={this.state.option === ''}
									onClick={(e) => 
										this.handleQuestion(e)
									}>
									Submit
								</button>
								)}
							</form>	
						</div>
						<div>
								{this.state.submitted 
									? console.log(`this.state.submitted is true: ${this.state.submitted === true}`)
									: console.log('not true')}
						</div>
						<div>
							{this.state.submitted 
								? (
									<div>
										<Redirect 
											to={{
												pathname: 'result/:id',
												state: { id: id}
											}} 
										/>
									</div>
								) : null}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

// whats returned are args to Question component
function mapStateToProps({ authedUser, users, questions }, props ) {
	
	console.log('props: ', props)
	
	const qid = props.location.state.id
	const question = questions[qid]
	const user = users[question.author]
	
	console.log('question: ', question)
	console.log('user: ', user)

	return {
		authedUser,
		user,
		question: question
			? formatQuestion(question, authedUser)
			: null
	}
}

export default connect(mapStateToProps)(Question)