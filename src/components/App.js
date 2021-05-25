import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
// import { LoadingBar } from 'react-router-loading-bar'
import Dashboard from './Dashboard' 
import NewQuestion from './NewQuestion'
import Login from './Login'
// import Question from './Question'
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
					{this.props.loading === true && this.props.authedUser === ''
						? null
						: <div>
							<Route path='/' component={Dashboard} />
							<Route path='/new' component={NewQuestion} />	
							<Route path='/login' component={Login} />
						</div>
					}
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