import { saveQuestionAnswer, saveQuestion } from '../utils/api'
//import { showLoading, hideLoading } from 'react-redux-laoding'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const RECEIVE_QUESTION_ANSWER = 'RECEIVE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

// action creator
function addQuestion (question) {
	return {
		type: ADD_QUESTION,
		question,
	}
}

// asyn action creator
export function handleAddQuestion (question) {
	return (dispatch, getState) => {
		const { authedUser } = getState()
		const { optionOneText, optionTwoText } = question
		
		// saveQuestion take the question and formats it before 
		return saveQuestion({
			optionOneText,
			optionTwoText,
			author: authedUser
		})
			.then((question) => dispatch(addQuestion(question)))
	}
}

export function receiveQuestions (questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	}
}

function receiveQuestionAnswer ({id, authedUser, option}) {
	return {
		type: RECEIVE_QUESTION_ANSWER,	
		id,
		authedUser,
		option
	}
}

// info has qid, authedUser, option/answer
export function handleQuestionAnswer (info) {
	return (dispatch) => {
		dispatch(receiveQuestionAnswer(info))
		
		return saveQuestionAnswer(info)
			.catch((e) => {
				console.warn('Error in handleQuestionToggle: ', e)
				dispatch(receiveQuestionAnswer(info))
				alert('There was an error answing the question. Try again.')
			})
	}
}

