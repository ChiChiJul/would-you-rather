import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserScore extends Component {
	
	render() {
		const { user } = this.props
		const answersNum = Object.keys(user.answers).length
		const questionsNum = user.questions.length
		const score = answersNum + questionsNum
		
		return (
			<div className='userScore'>
				<div>
					<div>
						<img 
							src={user.avatarURL}
							alt={`Avatar of ${user.name}`}
							className='avatar'
						/>
					</div>
					<div>
						<h4>{user.name}</h4>
						<div>
							<span>Answered questions</span>
							<span className='num'> {answersNum}</span>
						</div>
						<div>
							<span>Created questions</span>
							<span className='num'> {questionsNum}</span>
						</div>
					</div>
					<div>
						<span>Score</span>
						<span className='num'> {score}</span>	
					</div>	
				</div>
			</div>
		)
	}
}

function mapStateToProps({ questions, users }, { id }) {
	const user = users[id]
	
	return {
		id,
		user
	}
}

export default connect(mapStateToProps)(UserScore)