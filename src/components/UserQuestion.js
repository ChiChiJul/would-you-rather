import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Question from './Question'

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
	
	render() {
		const { id, questions, users } = this.props
		//const { id, name, avatarURL, optionOne } = question
		
		/*console.log(id)
		console.log('questions: ', questions)
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
										<button onClick={this.handleOnClick}>View Poll</button>
												{this.state.showPoll && <Question id={id} />}
									</div>
								</li>) : null
						) : null
					)}
				</ul>
			
			
			
				{/*<div>{name}</div>
				<div>
				<img 
					src={avatarURL}
					alt={'Avatar of ${name}'}
					className='avatar'
				/>
					
				<h5>Would you rather</h5>
					<p>{optionOne.text}</p>
					<button>View Poll</button>
				</div> */}
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