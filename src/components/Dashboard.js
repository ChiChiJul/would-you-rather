import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import UserQuestion from './UserQuestion'

class Dashboard extends Component {
	state = {
		haveNotAnswered: false,
		haveAnswered: true,
		showUnansweredQuestions: true,
		showAnsweredQuestions: false
	}
	
	handleOnClick = (e) => {
		e.preventDefault()
		if (e.target.id === 'answered' && this.state.showUnansweredQuestions === true) {
			this.setState(() => ({
				showAnsweredQuestions: true,
				showUnansweredQuestions: false
			}))
		}
		if (e.target.id === 'unanswered' && this.state.showAnsweredQuestions === true) {
			this.setState(() => ({
				showUnansweredQuestions: true,
				showAnsweredQuestions: false
			}))
		}
	}
	
	render() {
		console.log(this.props)
		const { questions, answeredQuestionIds, unansweredQuestionIds } = this.props
		const { haveNotAnswered, haveAnswered, showUnansweredQuestions, 
			showAnsweredQuestions } = this.state
		console.log('state: ', this.state)
		console.log(`showUnansweredQuestions: ${showUnansweredQuestions},
			showAnsweredQuestions: ${showAnsweredQuestions}`)
		
		return (
			<div className='container'>
				<div className='dashboard'>
					<button id='unanswered' className='btn' onClick={this.handleOnClick}>Unanswered Questions</button>
					<button id='answered' className='btn' onClick={this.handleOnClick}>Answered Questions</button>
					<div className='unanswered'>
						{showUnansweredQuestions && (
							<ul className='dashboard-list'>
							{Object.values(questions).map((question) => {
								return unansweredQuestionIds.map((qid) =>  
									question.id === qid 
										? (<li key={qid}><UserQuestion qid={qid} answered={haveNotAnswered} /></li>) 
										: console.log('false') )
							})}
						</ul>
						)}
					</div>
					<div className="answered">
						{showAnsweredQuestions && (
							<ul className='dashboard-list'>
								{Object.values(questions).map((question) => 
									answeredQuestionIds.map((qid) =>
										question.id === qid
											? (<li key={qid}><UserQuestion qid={qid} answered={haveAnswered} /></li>)
											: console.log('no match'))
								)}
							</ul>
						)}
					</div> 
				</div>
				<div>
				</div>
			</div>
		)
	}
}

// 1. get a list of questions the authedUser has answered and unanswered
// go through the questions object, check to see if authedUser id is contained
// in the optionOne.votes or optionTwo.votes array, if yes, not it's an answered
// question, otherwise an unanswered question
function mapStateToProps({ authedUser, questions, users }) {
	let answeredQuestionIds = [], unansweredQuestionIds = [];
	console.log(`number of questions: ${Object.keys(questions).length}`)
	console.log(`authedUser: ${authedUser}`)
	Object.values(questions).map((value => {
		if (value.optionOne.votes.includes(authedUser)
			|| value.optionTwo.votes.includes(authedUser)) {
				answeredQuestionIds.push(value.id)
			}
		else {
			unansweredQuestionIds.push(value.id)
		}
		return {
			answeredQuestionIds,
			unansweredQuestionIds
		}
	}))
	
	console.log(`answered questions length: ${answeredQuestionIds.length}`)
	console.log(`unanswered questions length: ${unansweredQuestionIds.length}`)
	
	return {
		questions,
		answeredQuestionIds,
		unansweredQuestionIds
	}
	
	/*Object.values(questions).map((value) => {
		Object.keys(users).forEach((key) => {
			let id, name, avatar, optionOneText, optionTwoText; 
			if (value.author === users[key].id) {
				
					id = users[key].id
					name = users[key].name
					avatar = users[key].avatarURL
					optionOneText = users[key].optionOne.text
					optionTwoText = users[key].optionTwo.text
				
			}
			
		})
	})
									
	return {
		questionValues: Object.values(questions),
		users
	}*/
}

export default connect(mapStateToProps)(Dashboard)