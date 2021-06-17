import React, { Component, Fragment, useEffect } from 'react'
import { 
	BrowserRouter as Router,
	Route,
	/*useHistory,
	useLocation,
	useParams,
	useRouteMatch */
} from 'react-router-dom'
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
//import Routes from './Routes'

class App extends Component {
	state = {
		hasPermission: false
	}
	
	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}
	
	routeChange = () => {
		console.log('in routeChange')
	}
	
	setPathname = (pathname) => {
		const { authedUser } = this.props
		console.log('** pathname: ', pathname)
		this.setState(() => ({
			hasPermission: (pathname !== '/' && authedUser === null) ? false : true
		}))
	}

	render() {
		const { authedUser, loading } = this.props
		const { hasPermission } = this.state
		//console.log('this.setPathname: ', this.setPathname)
		
		console.log('hasPermission: ', hasPermission)
		console.log('loading: ', loading)
		return (

			<Router>
				<Fragment>
					<LoadingBar />
					<div className='container'>
						<Nav />
						{loading === true 
							? (
								<div>
									<Route key='login' component={Login} />
								</div> )
							: (
								<div>
									<Route exact path='/' component={Dashboard} />
									<Route exact path='/question/:id' render={(props) => <Question {...props} />} />
									<Route exact path='/question_result/:id' render={(props) => <QuestionResult {...props} />} />
									<Route exact path='/leaderboard' component={LeaderBoard} />
									<Route exact path='/add' component={NewQuestion} />	
									<Route exact key='login' path='/login' component={Login} />
									<Route render={() => <h1>Page not found</h1>} />
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



/* Todo *********
1. Whenever the user types something in the address bar, 
the user is asked to log in before the requested page is shown
2. show 404
3. newly created/answered question goes on top

*/