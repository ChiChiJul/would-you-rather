import { RECEIVE_USERS } from '../actions/users'
import { RECEIVE_USER_QUESTION_ANSWER } from '../actions/users'

// {authedUser, qid, answer}
/*...users,
[action.authedUser]: {
	...users[action.authedUser],
	[answers[action.qid]]: [action.answer]
}*/

// called in index.js
export default function users (state = {}, action) {
	switch(action.type) {
	case RECEIVE_USERS :
		return {
			...state,
			...action.users
		}
	case RECEIVE_USER_QUESTION_ANSWER :
		console.log('[action.authedUser].answers[action.qid]: ', [action.authedUser].answers[action.qid])
		console.log('[action.answer]: ', [action.answer])
		return {
			...state,
			/*[action.authedUser]: {
				...state[action.authedUser],
				answers[action.qid] : [action.answer]
			}*/
		}
	default :
		return state
	}

}