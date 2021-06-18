import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class UserQuestion extends Component {
	state = {
		showPoll: false,
		toPath: ''
	}
	
	handleOnClick = (e) => {
		const { answered } = this.props
		e.preventDefault()

		this.setState(() => ({
			showPoll: true,
			toPath: answered ? 'question_result' : 'question'
		}))
	}

	render() {
		const { qid, questions, users } = this.props
		
		return (
			<div className='userQuestion'>			
				<ul>
					{Object.values(questions).map((question) =>
						question.id === qid
						? Object.values(users).map((user) =>
							user.id === question.author 
								? (<li key={user.id}>
									<div>
										<div>
											<img 
												src={user.avatarURL}
												alt={`Avatar of ${user.name}`}
												className='avatar'
											/>
										</div>
										<div>{user.name} asks:</div>
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