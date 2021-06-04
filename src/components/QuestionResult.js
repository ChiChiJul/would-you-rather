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
		//const { qid, name, question, optOneVotes, optTwoVotes, totalVotes, optOneVotePercent, optTwoVotePercent } = this.props
		
		return (
			<div>
				
				{/*<div>Asked by {name}</div>
				<div>
					
				</div>
				<div>
					<div>
						<h3>Results:</h3>
						<div>
						<span>
							{question.optionOne.text}
						</span>
						<span>
							{optOneVotePercent}
						</span>
						<span>
							{optOneVotes} out of {totalVotes}
						</span>
						</div>
					</div>
				</div>*/}
			</div>
		)
	}
}

function mapStateToProps({ users, questions }, props) {
	console.log('props: ', props)
	
	const qid = this.props.match.params.id
	
	/*const question = questions[id]
	const name = users[questions[id].author].name*/
	
	/*const optOneVotes = question.optionOne.votes.length
	const optTwoVotes = question.optionTwo.votes.length
	const totalVotes = optOneVotes + optTwoVotes
	const optOneVotePercent = optOneVotes/totalVotes
	const optTwoVotePercent = optTwoVotes/totalVotes*/
	
	return {
		users,
		questions
		/*id,
		name,
		optOneVotes,
		optTwoVotes,
		totalVotes,
		question,
		optOneVotePercent,
		optTwoVotePercent*/
	}
}

export default connect(mapStateToProps)(QuestionResult)