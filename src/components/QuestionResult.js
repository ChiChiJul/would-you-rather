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
		const { qid, user, question, optOneVotes, optTwoVotes, totalVotes, optOneVotePercent, optTwoVotePercent } = this.props
		
		return (
			<div>
			
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
						<div>
							<div>
								{question.optionOne.text}
							</div>
							<div>
								{optOneVotePercent}%
							</div>
							<div>
								{optOneVotes} out of {totalVotes}
							</div>
						</div>
						<div>
							<div>
								{question.optionTwo.text}
							</div>
							<div>
								{optTwoVotePercent}%
							</div>
							<div>
								{optTwoVotes} out of {totalVotes}
							</div>
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
	console.log('questions: ', questions)
	console.log('question: ', question)
	console.log('users: ', users)
	//console.log('name: ', name)
	
	const optOneVotes = question.optionOne.votes.length
	const optTwoVotes = question.optionTwo.votes.length
	const totalVotes = optOneVotes + optTwoVotes
	const optOneVotePercent = (optOneVotes/totalVotes) * 100
	const optTwoVotePercent = (optTwoVotes/totalVotes) * 100 
	
	return {
		users,
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