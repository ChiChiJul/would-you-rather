import { RECEIVE_QUESTIONS, TOGGLE_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
	switch(action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case TOGGLE_QUESTION :
			return {
				...state,
				[action.id]: {
					...state[action.id],
					answers: action.hasAnswered === true
						? state[action.id].answers.filter((uid) => uid !== action.authedUser)
						: state[action.id].answers.concat([action.authedUser])
				}
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