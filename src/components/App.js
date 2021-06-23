import React, { Component, Fragment } from 'react'
import { 
	BrowserRouter as Router, 
	Route,
	Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { LoadingBar } from 'react-redux-loading-bar'
import Dashboard from './Dashboard' 
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import Login from './Login'
import Question from './Question'
import QuestionResult from './QuestionResult'
import Nav from './Nav'
import NotFound from './NotFound'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	render() {
		const { loading } = this.props
		
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className='container'>
						<Nav />
						{loading === true 
							? (
								<div>
									<Switch>
										<Route key='login' component={Login} />
									</Switch>
								</div> )
							: (
								<div>
									<Switch>
										<Route exact path='/' component={Dashboard} />
										<Route exact path='/question/:id' render={(props) => <Question {...props} />} />
										<Route exact path='/question_result/:id' render={(props) => <QuestionResult {...props} />} />
										<Route exact path='/leaderboard' component={LeaderBoard} />
										<Route exact path='/add' component={NewQuestion} />	
										<Route exact key='login' path='/login' component={Login} />
										<Route path='*' component={NotFound} />
									</Switch>
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
		loading: authedUser === null
	}
}

export default connect(mapStateToProps)(App)