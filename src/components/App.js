import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { LoadingBar } from 'react-redux-loading-bar'
import Dashboard from './Dashboard' 
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import Login from './Login'
import Question from './Question'
import UserQuestion from './UserQuestion'
import QuestionResult from './QuestionResult'
import Nav from './Nav'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	render() {
		console.log('this.props.loading: ', this.props.loading)
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className='container'>
						<Nav />
						{this.props.loading === true
							? (
								<div>
									<Route key='login' component={Login} />
								</div>
							) : (
							<div>
								<Route exact path='/' component={Dashboard} />
								<Route exact path='/question/:id' render={(props) => <Question {...props} />} />
								<Route exact path='/question_result/:id' render={(props) => <QuestionResult {...props} />} />
								<Route exact path='/leader_board' component={LeaderBoard} />
								<Route exact path='/new' component={NewQuestion} />	
								<Route exact key='login' path='/login' component={Login} />
							</div>
						)}
					</div>
				</Fragment>
			</Router>
		)
	}
}

function mapStateToProps ({ authedUser }) {
	return {
		authedUser,
		loading: authedUser === null
	}
}

export default connect(mapStateToProps)(App)