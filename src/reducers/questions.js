import { RECEIVE_QUESTIONS, RECEIVE_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
	switch(action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case RECEIVE_QUESTION_ANSWER :
			return {
				...state, 
				[action.authedUser]: action.authedUser,
				[action.qid]: action.qid,
				[action.answer]: action.answer
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