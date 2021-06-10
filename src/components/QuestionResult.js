import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionResult extends Component {
	componentDidMount(props) {
		console.log('QuestionResult Component Did Mount')
		console.log('qid: ', this.props.match.params.id)
	}
	
	componentWillUnmount() {
		console.log('QuestionResult Component Will Unmount')
	}
	
	render() {
		const { qid, user, userVote, question, optOneVotes, optTwoVotes, totalVotes, optOneVotePercent, optTwoVotePercent } = this.props
		
		return (
			<div className='question_result'>
			
				<div>Asked by {user.name}</div>
				<div>
				<img 
					src={user.avatarURL}
					alt={'Avatar of ${user.name}'}
					className='avatar'
				/>
				</div>
				<div>
					<div>
						<h3>Results:</h3>
						<div className='result'>
							{userVote === 'optionOne' ? (
								<div className='circle'>Your Vote</div>
							) : null}
							<p>
								Would you rather {question.optionOne.text}?
							</p>
							<p>
								{optOneVotePercent}%
							</p>
							<p>
								{optOneVotes} out of {totalVotes}
							</p>
						</div>
						<div className='result'>
							{userVote === 'optionTwo' ? (
								<div className='circle'>Your Vote</div>
							) : null}
							<p>
								Would you rather {question.optionTwo.text}?
							</p>
							<p>
								{optTwoVotePercent}%
							</p>
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
	console.log('props: ', props)
	
	const qid = props.match.params.id
	const question = questions[qid]
	const user = users[question.author]
	let userVote = null
	
	console.log('questions: ', questions)
	console.log('question: ', question)
	console.log('users: ', users)
	//console.log('name: ', name)
	
	const optOneVotes = question.optionOne.votes.length
	const optTwoVotes = question.optionTwo.votes.length
	const totalVotes = optOneVotes + optTwoVotes
	const optOneVotePercent = (optOneVotes/totalVotes) * 100
	const optTwoVotePercent = (optTwoVotes/totalVotes) * 100 

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