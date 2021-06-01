import { saveQuestionAnswer, saveQuestion } from '../utils/api'
//import { showLoading, hideLoading } from 'react-redux-laoding'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION'
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

function toggleQuestion ({id, authedUser, option}) {
	return {
		type: TOGGLE_QUESTION,	
		id,
		authedUser,
		option
	}
}

// info has qid, authedUser, option/answer
export function handleQuestionToggle (info) {
	return (dispatch) => {
		dispatch(toggleQuestion(info))
		
		return saveQuestionAnswer(info)
			.catch((e) => {
				console.warn('Error in handleQuestionToggle: ', e)
				dispatch(toggleQuestion(info))
				alert('There was an error answing the question. Try again.')
			})
	}
}

