import { RECEIVE_QUESTIONS, RECEIVE_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
	switch(action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		
			// when a user answers a question:
			// 1. update user.answer -- qid: 'option'
			// 2. update question.option.votes
		case RECEIVE_QUESTION_ANSWER :
			console.log('[action.authedUser]: ', [action.authedUser])
			console.log('[action.qid]: ', [action.qid])
			console.log('[action.answer]: ', [action.answer])
			console.log('state: ', state) // questions object
			console.log('state[action.qid][action.answer]: ', state[action.qid][action.answer])
			
			return {
				...state, 
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						...state[action.qid][action.answer],
						votes: state[action.qid][action.answer].votes.concat([action.authedUser])
					}
				},
			}
			// it changes to states: Users, and Questions
		case ADD_QUESTION :
			// question to add
			// const { question } = action
			
			// this is done in utils/DATA.js/ _saveQuestion()
			// add new question to questions state, and add question to user's
			// question array in which user is the same as AuthedUser
			
			
			return {
				...state,
				[action.question.id]: action.question,
			}
		default :
			return state
	}
}