import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserScore extends Component {
	
	render() {
		const { id, users } = this.props
		
		const user = users[id]
		const answersNum = Object.keys(user.answers).length
		const questionsNum = user.questions.length
		const score = answersNum + questionsNum
		
		console.log('user: ', user)
		
		return (
			<div>
				<div>
					<div>
						<img 
							src={user.avatarURL}
							alt={'Avatar of ${user.name}'}
							className='avatar'
						/>
					</div>
					<div>
						<h4>{user.name}</h4>
						<div>
							<span>Answered questions</span>
							<span>{answersNum}</span>
						</div>
						<div>
							<span>Created questions</span>
							<span>{questionsNum}</span>
						</div>
					</div>
					<div>
						<span>Score</span>
						<span>{score}</span>	
					</div>	
				</div>
			</div>
		)
	}
}

function mapStateToProps({ users }, { id }) {
	return {
		id,
		users
	}
}

export default connect(mapStateToProps)(UserScore)