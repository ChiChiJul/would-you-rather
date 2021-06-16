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
			return {
				...state, 
				[action.qid]: {
					...state[action.qid],
					[action.answer]: {
						...state[action.qid][action.answer],
						votes: state[action.qid][action.answer].votes.concat([action.authedUser])
					}
				}
			}
			// it changes to states: Users, and Questions
		case ADD_QUESTION :
			return {
				...state,
				[action.question.id]: action.question,
			}
		default :
			return state
	}
}