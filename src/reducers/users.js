import { RECEIVE_USERS } from '../actions/users'

// called in index.js
export default function users (state = {}, action) {
	switch(action.type) {
	case RECEIVE_USERS :
		return {
			...state,
			...action.users
		}
		default :
			return state
	}
}