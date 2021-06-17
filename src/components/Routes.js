import React, { useEffect } from 'react'
import { Router, Route, Switch, NavLink, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import Dashboard from './Dashboard' 
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import Login from './Login'
import Question from './Question'
import QuestionResult from './QuestionResult'
import Err404 from './Err404'

function Routes(props) {
	const location = useLocation()
	
	useEffect(() => {
		console.log('location.pathname: ', location.pathname)
		props.setPathname(location.pathname)
	},[location])
	
	return (
		<div>
			<Switch>
				{props.authedUser === null 
					? ( 
					<div>
						<Route path={location.pathname} component={Err404} exact />
					</div> ) 
					: (
						<div>
							<Routes exact path='/' component={Dashboard} />
							<Routes exact path='/question/:id' render={(props) => <Question {...props} />} />
							<Routes exact path='/question_result/:id' render={(props) => <QuestionResult {...props} />} />
							<Routes exact path='/leaderboard' component={LeaderBoard} />
							<Routes exact path='/add' component={NewQuestion} />	
							<Routes exact key='login' path='/login' component={Login} />
						</div> ) 
				}
			</Switch>
		</div>
	)
}

function mapStateToProps({ authedUser }) {
	return { authedUser }
}

export default connect(mapStateToProps)(Routes)