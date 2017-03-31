import React from 'react';
import CreateItem from './CreateItem';
import Task from './Task';
import base from '../base';

class App extends React.Component {

	constructor() {
		super();

		this.addTask = this.addTask.bind(this);
		this.completeTask = this.completeTask.bind(this);
		this.logout = this.logout.bind(this);

		// set state!
		this.state = {
			auth: false,
			user: null,
			tasks: {},
			completed: 0
		};
	}

	componentWillMount() {
		// console.log('APP WILL MOUNT')
		// console.log(this.props.params);
		// lets load up the database
		this.ref = base.syncState(`${this.props.params.userName}/tasks`, {
			context: this,
			state: 'tasks'
		});

		// console.log(this.props.params.userName);
		if (localStorage.username === this.props.params.userName) {
			this.setState({ auth: true });
		}

	}

	shouldComponentUpdate(nextProps, nextState) {
		if (localStorage.username !== this.props.params.userName) {
			console.log('wrong user!!');
			return false;
		} else {
			return true;
		}
	}

	componentWillUpdate(nextProps, nextState) {
	}


	addTask(task) {
		const tasks = {...this.state.tasks};
		const timeStamp = Date.now();
		tasks['task-'+timeStamp] = task.task;
		this.setState({ tasks: tasks });
	}

	completeTask(task) {
		const tasks =  {...this.state.tasks};
		tasks[task.props.index] = null
		// delete does not work with firebase
		this.setState({ tasks: tasks, completed: this.state.completed+1 });

		// do again???
		const moreTasks = {...this.state.tasks};
		delete(moreTasks[task.props.index]);
		this.setState({ tasks: moreTasks, completed: this.state.completed });
	}

	logout(e) {
		e.preventDefault();
		// console.log(this);
		localStorage.setItem('username', null);
		this.setState({auth: false});
		this.context.router.transitionTo(`/`);
	}

	render() {
		return(

			<div className="app-wrapper">
				
				{ this.state.auth ? (
						<CreateItem addTask={this.addTask} />
					) : (
						<h1>You do not have permission to alter this list</h1>
				)}
					
				
				{console.log(this.state)}
				<ul className="task__wrapper">
					{
						Object.keys(this.state.tasks).map(key => <Task key={key} index={key} desc={this.state.tasks[key]} completeTask={this.completeTask} />)
					}
				</ul>

				{/* <h2>Completed items: {this.state.completed}</h2> */}

				<button className="login login--logout" onClick={(e) => this.logout(e)}>Logout</button>

			</div>
		);
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
}

App.contextTypes = {
	router: React.PropTypes.object
}

export default App;