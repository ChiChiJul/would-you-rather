import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UserQuestion extends Component {
	render() {
		const { question } = this.props
		const { id, name, avatarURL, optionOne } = question
		return (
			<div>
				<div>{name}</div>
				<div>
				<img 
					src={avatarURL}
					alt={'Avatar of ${name}'}
					className='avatar'
				/>
					
				<h5>Would you rather</h5>
					<p>{optionOne.text}</p>
					<button>View Poll</button>
				</div>
			</div>
		)
	}
}

function mapStateToProps( question ) {
	return {
		question
	}
}

export default connect(mapStateToProps)(UserQuestion)