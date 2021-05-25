export const SET_AUTHED_USER = 'SET_AUTHED_USER'

// called in shared.js
export function setAuthedUser (id) {
	return {
		type: SET_AUTHED_USER,
		id,
	}
}