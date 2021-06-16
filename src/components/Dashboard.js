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
		const { questions, answeredQuestionIds, unansweredQuestionIds } = this.props
		const { haveNotAnswered, haveAnswered, showUnansweredQuestions, 
			showAnsweredQuestions } = this.state
		
		return (
			<div className='container'>
				<div className='dashboard'>
					<div className='dashboardBtn'>
						<button 
							id='unanswered'
							className='btn' 
							style={{
								fontWeight: showUnansweredQuestions ? 'bold' : 'normal',
								backgroundColor: showUnansweredQuestions ? '#D3D3D3' : 'white'
							}}
							onClick={this.handleOnClick}>Unanswered Questions
						</button>
						<button 
							id='answered' 
							className='btn' 
							style={{
								fontWeight: showAnsweredQuestions ? 'bold' : 'normal',
								backgroundColor: showAnsweredQuestions ? '#D3D3D3' : 'white'
							}} 
							onClick={this.handleOnClick}>Answered Questions
						</button>
					</div>
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
	
	return {
		questions,
		answeredQuestionIds,
		unansweredQuestionIds
	}
}

export default connect(mapStateToProps)(Dashboard)