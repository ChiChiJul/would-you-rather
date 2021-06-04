import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// import { LoadingBar } from 'react-redux-loading-bar'
import Dashboard from './Dashboard' 
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import Login from './Login'
import Question from './Question'
import UserQuestion from './UserQuestion'
import Result from './Result'
import Nav from './Nav'

class App extends Component {
	
	
	componentDidMount() {
		console.log('Inside componentDidMount')
		this.props.dispatch(handleInitialData())
		console.log(this.props.authedUser)
	}

	render() {
		console.log(this.props)
		return (
			<Router>
				<Fragment>
					{/*<LoadingBar />*/}
					<Nav />
					{this.props.authedUser === null ? (
						<div>
							<Route key='login' path='/login' component={Login} />
						</div>
					) : (
						<div>
							<Route exact path='/' component={Dashboard} />
							<Route exact path='/question/:id' render={(props) => <Question {...props} />} />
							<Route exact path='/result/:id' render={(props) => <Result {...props} />} />
							<Route exact path='/leader_board' component={LeaderBoard} />
							<Route exact path='/new' component={NewQuestion} />	
							<Route key='login' exact path='/login' component={Login} />
						</div>
					)}
				</Fragment>
			</Router>
			/*<Router>
				<Fragment>
					<LoadingBar />
					<div className='container'>
						
						<div>
							<NewQuestion />
						</div>
					</div>
				</Fragment>
			</Router>*/
		)
	}
}

function mapStateToProps ({ authedUser }) {
	return {
		authedUser
		//loadling: authedUser === null
	}
}

export default connect(mapStateToProps)(App)