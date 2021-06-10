import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserScore from './UserScore'

class LeaderBoard extends Component {
	
	render() {
		const { sortedUsers } = this.props
		
		console.log('sortedUsers: ', sortedUsers)
		
		console.log('in LeaderBoard')
		
		return (
			<div className='leader_board'>
				<ul>
					{Object.values(sortedUsers).map((user) => 
						<li key={user.id}>
							<UserScore id={user.id} />
						</li>
					)}
				</ul>
			</div>
		)
	}
}

function mapStateToProps({ users }) {
	const sortedUsers = Object.values(users).sort((a, b) => {
			//console.log('b.answers: ', b.answers.length)
			//console.log('b.questions: ', b.questions.length)
		//const score = 
			return ((Object.keys(b.answers).length + b.questions.length) 
				- (Object.keys(a.answers).length + a.questions.length))
		}
	)
	
	return {
		sortedUsers
	}
}

export default connect(mapStateToProps)(LeaderBoard)