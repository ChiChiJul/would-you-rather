// for Tweet Component for UI
export function formatQuestion (question, author) {
	const { id, optionOne, optionTwo } = question
	const { name, avatarURL } = author
	
	return {
		id,
		name,
		avatarURL,
		optionOne,
		optionTwo,
	}
}