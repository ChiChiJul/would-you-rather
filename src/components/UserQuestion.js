import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class UserQuestion extends Component {
	state = {
		showPoll: false,
	}
	
	handleOnClick = (e) => {
		e.preventDefault()

		this.setState(() => ({
			showPoll: true
		}))
	}
	
	toQuestion = (e, id) => {
		e.preventDefault()
		console.log(`id: ${id}`)
		//this.props.question.push(`question/${id}`)
	}
	
	render() {
		const { id, questions, users } = this.props
		const question = questions[id]
		//console.log('this.state.showPoll: ', this.state.showPoll)
		
		//console.log('this.props: ', this.props)
		
		//const { id, name, avatarURL, optionOne } = question
		
		//console.log('id: ', id)
		/*console.log('questions: ', questions)
		console.log('users: ', users)
		console.log('user name: ', users[questions[id].author].name)*/
		
		
		return (
			<div>
				<ul>
					{Object.values(questions).map((question) =>
						question.id === id
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
										{id && (
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
															pathname: 'question/:id',
															state: { id: id }
														}}
													/> 
													</div>
												) : null}
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

function mapStateToProps( {questions, users}, {id} ) {
	return {
		id,
		users,
		questions
	}
}

export default connect(mapStateToProps)(UserQuestion)