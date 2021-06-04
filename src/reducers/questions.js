import { RECEIVE_QUESTIONS, RECEIVE_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
	switch(action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case RECEIVE_QUESTION_ANSWER :
			console.log('action: ', action) // action type: toggle_question, id: qid, authedUser, option
			console.log('action.authedUser: ', action.authedUser)
			console.log('action.option: ', action.option)
			console.log('action.id: ', action.id)
			/*console.log('state: ', state) // questions
			console.log('[action.authedUser]: ', [action.authedUser])
			console.log('action.authedUser: ', action.authedUser)
			console.log('[action.id]: ', [action.id])
			console.log('[action.option]: ', [action.option])
			*/
			
			return {
				...state, 
				[action.authedUser]: action.authedUser,
				[action.id]: action.id,
				[action.option]: action.option
				/*...state,
				[action.id]: {
					...state[action.id],
					answers: action.option !== ''
						? state[action.id].answers.filter((uid) => uid !== action.authedUser)
						: state[action.id].answers.concat([action.authedUser])
				}*/
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