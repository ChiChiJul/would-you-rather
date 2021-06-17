import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProgressBar, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class QuestionResult extends Component {
	render() {
		const { qid, user, userVote, question, optOneVotes, optTwoVotes, totalVotes, optOneVotePercent, optTwoVotePercent } = this.props
		
		return (
			<div className='questionResult'>
				<div>
					<img 
						src={user.avatarURL}
						alt={'Avatar of ${user.name}'}
						className='avatar'
					/>
				</div>
				<div>Asked by {user.name}</div>
				<div>
					<div>
						<h3>Results:</h3>
						<div 
							className='result'
							style={{
								backgroundColor: userVote === 'optionOne' ? '#D3D3D3' : '#ffffff'
							}}>
							{userVote === 'optionOne' ? (
								<div className='circle'>
									Your Vote
								</div>
							) : null}
							<p>
								Would you rather {question.optionOne.text}?
							</p>
							<div className='progressBar'>
								<ProgressBar now={optOneVotePercent} label={`${optOneVotePercent}%`} />
							</div>
							<p>
								{optOneVotes} out of {totalVotes}
							</p>
						</div>
						<div 
							className='result'
							style={{
								backgroundColor: userVote === 'optionTwo' ? '#D3D3D3' : '#ffffff'
							}}>
							{userVote === 'optionTwo' ? (
								<div className='circle'>Your Vote</div>
							) : null}
							<p>
								Would you rather {question.optionTwo.text}?
							</p>
							<div className='progressBar'>
								<ProgressBar now={optTwoVotePercent} label={`${optTwoVotePercent}%`} />
							</div>
							<p>
								{optTwoVotes} out of {totalVotes}
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ users, questions }, props) {
	const qid = props.match.params.id
	const question = questions[qid]
	const user = users[question.author]
	let userVote = null
	const optOneVotes = question.optionOne.votes.length
	const optTwoVotes = question.optionTwo.votes.length
	const totalVotes = optOneVotes + optTwoVotes
	const optOneVotePercent = Math.round((optOneVotes/totalVotes) * 100)
	const optTwoVotePercent = Math.round((optTwoVotes/totalVotes) * 100 )
	
	console.log('users: ', users)

	Object.values(users).map((user) => {
		return Object.entries(user.answers).forEach(([key, value]) => {
			return key === question.id ? userVote = value : null
		})
	})
	
	return {
		users,
		userVote,
		questions,
		qid,
		question,
		user,
		optOneVotes,
		optTwoVotes,
		totalVotes,
		optOneVotePercent,
		optTwoVotePercent
	}
}

export default connect(mapStateToProps)(QuestionResult)