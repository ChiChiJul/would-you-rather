import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class UserQuestion extends Component {
	state = {
		showPoll: false,
		toPath: ''
	}
	
	handleOnClick = (e) => {
		const { qid, answered } = this.props
		e.preventDefault()

		this.setState(() => ({
			showPoll: true,
			toPath: answered ? 'question_result' : 'question'
		}))
	}
	
	/*toQuestion = (e, id) => {
		e.preventDefault()
		console.log(`id: ${id}`)
		//this.props.question.push(`question/${id}`)
	}*/
	
	render() {
		const { qid, answered, questions, users } = this.props
		const question = questions[qid]
		//console.log('this.state.showPoll: ', this.state.showPoll)
		
		//console.log('this.props: ', this.props)
		
		//console.log('answered: ', answered)
		
		//const { id, name, avatarURL, optionOne } = question
		
		//console.log('id: ', id)
		/*console.log('questions: ', questions)
		console.log('users: ', users)
		console.log('user name: ', users[questions[id].author].name)*/
		
		
		return (
			<div>
			{/*<ul>
			{Object.values(questions).map((question) =>
				question.id === qid
				? Object.values(users).map((user) =>
					user.id === question.author 
						? (<li key={user.id}>
							<div>{user.name} asks:</div>
							<div>
								<span>
									<img 
										src={user.avatarURL}
										alt={'Avatar of ${user.name}'}
										className='avatar'
									/>
								</span>
								<span>
									<p>Would you rather</p>
									<p>{question.optionOne.text}</p>
								</span>
								{qid && (
									<button
										className='btn'
										onClick={(e) => 
											this.handleOnClick(e) 
										}>
										View Poll
									</button>
								)}
								<div>
									{(this.state.showPoll && answered === 'unanswered')
										? (
											<div>
												<Redirect
													to={{
														pathname: 'question/:qid',
														state: { id: qid }
													}}
												/> 
											</div>
										) 
										: (
											<div>
												<Redirect
													to={{
														pathname: 'question_result/:qid',
														state: { id: qid }
													}}
												/>
											</div>
										) 
									}
								</div>
							</div>
						</li>) : null
				) : null
			)}
		</ul>*/}
			
			
			
			
				<ul>
					{Object.values(questions).map((question) =>
						question.id === qid
						? Object.values(users).map((user) =>
							user.id === question.author 
								? (<li key={user.id}>
									<div>{user.name} asks:</div>
									<div>
										<span>
											<img 
												src={user.avatarURL}
												alt={'Avatar of ${user.name}'}
												className='avatar'
											/>
										</span>
										<span>
											<p>Would you rather</p>
											<p>{question.optionOne.text}</p>
										</span>
										{qid && (
											<button
												className='btn'
												onClick={(e) => 
													this.handleOnClick(e) 
												}>
												View Poll
											</button>
										)}
										<div>
											{this.state.showPoll
												? (
													<div>
														<Redirect
															to={{
																pathname: `${this.state.toPath}/${qid}`,
																state: { id: qid }
															}}
														/> 
													</div>
												) 
												: null
											}
										</div>
									</div>
								</li>) : null
						) : null
					)}
				</ul>
			</div>
		)
	}
}

function mapStateToProps( {questions, users}, {qid, answered} ) {
	return {
		qid,
		answered,
		users,
		questions
	}
}

export default connect(mapStateToProps)(UserQuestion)